#!/usr/bin/env python3
"""Build web images for the First Furniture site.

Reads data/items.json, takes each photo from ../photos/<category>/<name>.jpeg
and writes optimised WebP copies to img/<category>/<name>-<width>.webp.
Already-built images are skipped, so it is safe to run again after adding items.
It also refreshes sitemap.xml's date.

Usage:  python3 scripts/build.py          (needs ImageMagick: brew install imagemagick)
"""
import json, os, subprocess, sys, datetime, re

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
                errors.append(f"{it['id']}: photo not found: photos/{name}.*")
                continue
            used.add(os.path.relpath(src, PHOTOS))
            for w in WIDTHS:
                out = os.path.join(SITE, "img", f"{name}-{w}.webp")
                if os.path.exists(out) and os.path.getmtime(out) >= os.path.getmtime(src):
                    continue
                os.makedirs(os.path.dirname(out), exist_ok=True)
                subprocess.run(["magick", src, "-auto-orient", "-strip",
                                "-resize", f"{w}x{w}>", "-quality", "80" if w > 480 else "74",
                                out], check=True)
                print("built", os.path.relpath(out, SITE))

    if errors:
        print("\nProblems found:\n  " + "\n  ".join(errors)); sys.exit(1)

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
