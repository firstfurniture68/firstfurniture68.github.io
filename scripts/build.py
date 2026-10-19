#!/usr/bin/env python3
"""Build web images for the First Furniture site.

Reads data/items.json, takes each photo from ../photos/<category>/<name>.jpeg
and writes optimised WebP + AVIF copies to img/<category>/<name>-<width>.(webp|avif),
plus tiny blurred previews in data/thumbs.json.
Already-built images are skipped, so it is safe to run again after adding items.
It also refreshes sitemap.xml's date.

Usage:  python3 scripts/build.py          (needs ImageMagick: brew install imagemagick)
"""
import json, os, subprocess, sys, datetime, re, base64

SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PHOTOS = os.path.join(os.path.dirname(SITE), "photos")
WIDTHS = (480, 960, 1600)
EXTS = (".jpeg", ".jpg", ".png", ".webp", ".heic")


def find_source(name):
    for ext in EXTS:
        p = os.path.join(PHOTOS, name + ext)
        if os.path.exists(p):
            return p
    return None


def main():
    data = json.load(open(os.path.join(SITE, "data", "items.json"), encoding="utf-8"))
    cats = {c["id"] for c in data["categories"]}
    errors, used, refs, ids = [], set(), set(), set()
    thumbs_path = os.path.join(SITE, "data", "thumbs.json")
    thumbs = json.load(open(thumbs_path)) if os.path.exists(thumbs_path) else {}
    thumbs_stale = "--thumbs" in sys.argv
    keep = set()

    for it in data["items"]:
        for key in ("id", "ref", "category", "images", "en", "ar"):
            if key not in it:
                errors.append(f"{it.get('id', '?')}: missing '{key}'")
        if it.get("category") not in cats:
            errors.append(f"{it['id']}: unknown category {it.get('category')}")
        if it["id"] in ids: errors.append(f"duplicate id {it['id']}")
        if it["ref"] in refs: errors.append(f"duplicate ref {it['ref']}")
        ids.add(it["id"]); refs.add(it["ref"])
        for name in it["images"]:
            src = find_source(name)
            if not src:
                # Original not on this computer (kept in the backup): fine if the web copies already exist.
                built = all(os.path.exists(os.path.join(SITE, "img", f"{name}-{w}.{e}")) for w in WIDTHS for e in ("webp", "avif"))
                if built and name in thumbs:
                    keep.add(name); continue
                errors.append(f"{it['id']}: photo not found: photos/{name}.*")
                continue
            used.add(os.path.relpath(src, PHOTOS))
            for w in WIDTHS:
                # WebP for every browser, AVIF (about half the size) for browsers that support it.
                for ext, q in (("webp", "80" if w > 480 else "74"), ("avif", "52" if w > 480 else "48")):
                    out = os.path.join(SITE, "img", f"{name}-{w}.{ext}")
                    if os.path.exists(out) and os.path.getmtime(out) >= os.path.getmtime(src):
                        continue
                    os.makedirs(os.path.dirname(out), exist_ok=True)
                    subprocess.run(["magick", src, "-auto-orient", "-strip",
                                    "-resize", f"{w}x{w}>", "-quality", q, out], check=True)
                    print("built", os.path.relpath(out, SITE))
            # Tiny blurred preview shown instantly while the real image loads.
            if name not in thumbs or thumbs_stale:
                tiny = subprocess.run(["magick", src, "-auto-orient", "-strip", "-resize", "20x20",
                                       "-quality", "40", "webp:-"], check=True, capture_output=True).stdout
                thumbs[name] = "data:image/webp;base64," + base64.b64encode(tiny).decode()
            keep.add(name)

    if errors:
        print("\nProblems found:\n  " + "\n  ".join(errors)); sys.exit(1)

    json.dump({k: thumbs[k] for k in sorted(keep)}, open(thumbs_path, "w"), separators=(",", ":"))

    unused = []
    for root, _, files in os.walk(PHOTOS):
        if os.path.basename(root).startswith("_"):
            continue
        for f in files:
            rel = os.path.relpath(os.path.join(root, f), PHOTOS)
            if f.lower().endswith(EXTS) and rel not in used:
                unused.append(rel)
    if unused:
        print("\nPhotos not used by any item yet:\n  " + "\n  ".join(sorted(unused)))

    sm = os.path.join(SITE, "sitemap.xml")
    if os.path.exists(sm):
        txt = open(sm, encoding="utf-8").read()
        txt = re.sub(r"<lastmod>.*?</lastmod>", f"<lastmod>{datetime.date.today()}</lastmod>", txt)
        open(sm, "w", encoding="utf-8").write(txt)

    print(f"\nOK - {len(data['items'])} items, {len(used)} photos.")


if __name__ == "__main__":
    main()
