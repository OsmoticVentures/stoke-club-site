# Stoke Club site

The band's public site: Home, About, Shows. Plain static HTML, CSS, and a little JS. No build step,
no login, no framework. Any static host serves it as is.

## Preview locally

```
python3 -m http.server 4321
```
Then open http://localhost:4321.

## Links

Every outbound link lives in `assets/js/links.js`. A link set to `null` renders as an inert button.
Paste the real URL there and it goes live everywhere it appears.

## Media slots

Every photo and video on the site has a fixed slot with a fixed shape, so real media drops in without
a layout change. Put the raw file in `originals/` (gitignored), then:

```
python3 scripts/media.py <slot> originals/<file>
python3 scripts/media.py --list
```

The script crops to the slot's shape, resizes, strips all metadata, and writes the web files the
pages already point at. Videos come out silent unless `--audio` is passed.

| Slot | Kind | Shape | Output |
|---|---|---|---|
| `hero` | video | 16:9 | `assets/video/hero.mp4`, poster `assets/img/hero-poster-1920.*` |
| `band` | photo | 3:2 (as shot) | `assets/img/band-{960,1600,2400}.{jpg,webp}` |
| `polaroid-thumb` | photo | 16:9 | `assets/img/polaroid-thumb-{640,1280}.*` |
| `your-friends-cover` | photo | 1:1 | `assets/img/your-friends-cover-{600,1200}.*` |
| `show-video-1` to `3` | video | 9:16 | `assets/video/show-video-N.mp4`, poster `assets/img/show-video-N-poster-1080.*` |
| `show-photo-1` to `3` | photo | 4:5 | `assets/img/show-photo-N-{600,1200}.*` |

Until a slot has its file, the page shows the band photo (hero) or an empty frame of the same shape.

## Band audio

No band audio is committed here. A show clip keeps its sound only with Juan's yes (`--audio`).

## Hosting

Not hosted yet. `vercel.json` is ready for a Vercel project; the domain and DNS come from Juan.
