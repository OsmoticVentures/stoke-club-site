#!/usr/bin/env python3
"""Compress one raw photo or clip into a named media slot, ready to publish.

Every slot has a fixed aspect ratio and fixed output widths, so the pages never
need a layout change when real media arrives. Images are center-cropped to the
slot's ratio, resized, stripped of all metadata (no GPS, no camera data), and
written as JPEG + WebP. Videos are cropped, scaled, encoded to H.264 MP4 with
faststart, silent by default, plus a JPEG + WebP poster frame.

Usage:
  python3 scripts/media.py <slot> <input-file> [--audio] [--start SECONDS] [--length SECONDS]
  python3 scripts/media.py --list

Raw originals belong in originals/ (gitignored). Only the outputs in public/ are committed.
"""
import argparse
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / "public" / "img"
VID = ROOT / "public" / "video"

# slot -> kind, aspect (w, h) or None to keep the source ratio, output widths
SLOTS = {
    "band":               {"kind": "image", "aspect": None,     "widths": [960, 1600, 2400]},
    "polaroid-thumb":     {"kind": "image", "aspect": (16, 9),  "widths": [640, 1280]},
    "your-friends-cover": {"kind": "image", "aspect": (1, 1),   "widths": [600, 1200]},
    "show-photo-1":       {"kind": "image", "aspect": (4, 5),   "widths": [600, 1200]},
    "show-photo-2":       {"kind": "image", "aspect": (4, 5),   "widths": [600, 1200]},
    "show-photo-3":       {"kind": "image", "aspect": (4, 5),   "widths": [600, 1200]},
    "hero":               {"kind": "video", "aspect": (16, 9),  "size": (1920, 1080), "crf": 27},
    "show-video-1":       {"kind": "video", "aspect": (9, 16),  "size": (1080, 1920), "crf": 28},
    "show-video-2":       {"kind": "video", "aspect": (9, 16),  "size": (1080, 1920), "crf": 28},
    "show-video-3":       {"kind": "video", "aspect": (9, 16),  "size": (1080, 1920), "crf": 28},
}

JPEG_Q = 78
WEBP_Q = 74


def crop_to(im, aspect):
    if aspect is None:
        return im
    aw, ah = aspect
    w, h = im.size
    target = aw / ah
    if w / h > target:
        nw = round(h * target)
        left = (w - nw) // 2
        return im.crop((left, 0, left + nw, h))
    nh = round(w / target)
    top = (h - nh) // 2
    return im.crop((0, top, w, top + nh))


def write_image(im, name, widths):
    IMG.mkdir(parents=True, exist_ok=True)
    out = []
    for w in widths:
        if w > im.width:
            print(f"note: source is {im.width}px wide, upscaling to {w}px to keep the slot's file names", file=sys.stderr)
        h = round(im.height * w / im.width)
        r = im.resize((w, h), Image.LANCZOS)
        jpg = IMG / f"{name}-{w}.jpg"
        webp = IMG / f"{name}-{w}.webp"
        # A fresh image with no info dict carries no EXIF, XMP, or ICC extras.
        clean = Image.new("RGB", r.size)
        clean.paste(r)
        clean.save(jpg, "JPEG", quality=JPEG_Q, optimize=True, progressive=True)
        clean.save(webp, "WEBP", quality=WEBP_Q, method=6)
        out += [jpg, webp]
    return out


def do_image(slot, spec, src):
    im = Image.open(src)
    im = ImageOps.exif_transpose(im).convert("RGB")
    im = crop_to(im, spec["aspect"])
    return write_image(im, slot, spec["widths"])


def probe(src):
    r = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
         "stream=width,height:stream_side_data=rotation", "-of", "json", str(src)],
        capture_output=True, text=True, check=True)
    s = json.loads(r.stdout)["streams"][0]
    w, h = s["width"], s["height"]
    rot = 0
    for sd in s.get("side_data_list", []) or []:
        rot = int(sd.get("rotation", 0) or 0)
    if abs(rot) in (90, 270):
        w, h = h, w
    return w, h


def do_video(slot, spec, src, audio, start, length):
    if not shutil.which("ffmpeg"):
        sys.exit("ffmpeg not found")
    VID.mkdir(parents=True, exist_ok=True)
    aw, ah = spec["aspect"]
    tw, th = spec["size"]
    w, h = probe(src)
    if w / h > aw / ah:
        cw, ch = round(h * aw / ah) // 2 * 2, h // 2 * 2
    else:
        cw, ch = w // 2 * 2, round(w * ah / aw) // 2 * 2
    if cw < tw:
        tw, th = cw, ch
    vf = f"crop={cw}:{ch},scale={tw}:{th}:flags=lanczos,fps=30"
    out = VID / f"{slot}.mp4"
    cmd = ["ffmpeg", "-y", "-v", "error"]
    if start:
        cmd += ["-ss", str(start)]
    cmd += ["-i", str(src)]
    if length:
        cmd += ["-t", str(length)]
    cmd += ["-vf", vf, "-c:v", "libx264", "-preset", "slow", "-crf", str(spec["crf"]),
            "-profile:v", "high", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
            "-map_metadata", "-1"]
    cmd += ["-c:a", "aac", "-b:a", "128k"] if audio else ["-an"]
    cmd += [str(out)]
    subprocess.run(cmd, check=True)
    with tempfile.TemporaryDirectory() as tmp:
        frame = Path(tmp) / "poster.png"
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", str(out), "-frames:v", "1", str(frame)],
                       check=True)
        poster = write_image(Image.open(frame).convert("RGB"), f"{slot}-poster", [spec["size"][0]])
    return [out] + poster


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("slot", nargs="?")
    ap.add_argument("src", nargs="?")
    ap.add_argument("--audio", action="store_true", help="keep the clip's sound (default is silent)")
    ap.add_argument("--start", type=float, help="video: start at this second")
    ap.add_argument("--length", type=float, help="video: keep this many seconds")
    ap.add_argument("--list", action="store_true", help="print the slots and exit")
    a = ap.parse_args()
    if a.list or not a.slot:
        for k, v in SLOTS.items():
            ratio = "source" if v["aspect"] is None else f"{v['aspect'][0]}:{v['aspect'][1]}"
            size = v.get("size") or v.get("widths")
            print(f"{k:20} {v['kind']:6} {ratio:7} {size}")
        return
    if a.slot not in SLOTS:
        sys.exit(f"unknown slot {a.slot}; run with --list")
    src = Path(a.src or "")
    if not src.is_file():
        sys.exit(f"no such file: {src}")
    spec = SLOTS[a.slot]
    if spec["kind"] == "image":
        files = do_image(a.slot, spec, src)
    else:
        files = do_video(a.slot, spec, src, a.audio, a.start, a.length)
    for f in files:
        print(f"{f.relative_to(ROOT)}  {f.stat().st_size / 1024:.0f} KB")


if __name__ == "__main__":
    main()
