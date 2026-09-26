# Stoke Club site

The band's public site: Home, About, Shows. Next.js, no login.

## Preview locally

```
pnpm install
pnpm dev
```

## Links

Every outbound link lives in `src/lib/links.ts`. A link set to `null` renders as an inert button.
Paste the real URL there and it goes live everywhere it appears.

## Media slots

Every photo and video on the site has a fixed slot with a fixed shape, so real media drops in without
a layout change. Put the raw file in `originals/` (gitignored), then:

```
python3 scripts/media.py <slot> originals/<file>
python3 scripts/media.py --list
```

The script crops to the slot's shape, resizes, strips all metadata, and writes the web files the
pages already point at (served from `/img/` and `/video/`). Videos come out silent unless `--audio` is passed.

| Slot | Kind | Shape | Output |
|---|---|---|---|
| `hero` | video | 16:9 | `public/video/hero.mp4`, poster `public/img/hero-poster-1920.*` |
| `band` | photo | 3:2 (as shot) | `public/img/band-{960,1600,2400}.{jpg,webp}` |
| `polaroid-thumb` | photo | 16:9 | `public/img/polaroid-thumb-{640,1280}.*` |
| `your-friends-cover` | photo | 1:1 | `public/img/your-friends-cover-{600,1200}.*` |
| `show-video-1` to `3` | video | 9:16 | `public/video/show-video-N.mp4`, poster `public/img/show-video-N-poster-1080.*` |
| `show-photo-1` to `3` | photo | 4:5 | `public/img/show-photo-N-{600,1200}.*` |

Until a slot has its file, the page shows the band photo (hero) or an empty frame of the same shape.

## Band audio

No band audio is committed here. A show clip keeps its sound only with Juan's yes (`--audio`).

## Hosting

Not hosted yet. `vercel.json` is ready for a Vercel project; the domain and DNS come from Juan.
