# First Furniture

Website for First Furniture, by Mahmoud Metwally. https://firstfurniture68.github.io/

Static site, no framework. The catalogue lives in `data/items.json` (English and Arabic).

## Adding a piece
1. Put the photo in `../photos/<category>/<name>.jpeg`.
2. Add an entry to `data/items.json` with the next free `ref` (FF-110, FF-111, …).
3. Run `python3 scripts/build.py` to create the web images (needs ImageMagick).
4. Commit and push; GitHub Pages updates in about a minute.
