#!/usr/bin/env nix-shell
#!nix-shell -i bash -p python3Packages.html2text

# Convert HTML posts to Markdown
# Skips posts that already have markdown sources

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
HTML_DIR="$SCRIPT_DIR/posts"
MD_DIR="$SCRIPT_DIR/data/posts"

mkdir -p "$MD_DIR"

for html_file in "$HTML_DIR"/*.html; do
    basename="$(basename "$html_file" .html)"

    # Skip index
    [ "$basename" = "index" ] && continue

    # Skip if markdown already exists
    md_file="$MD_DIR/$basename.md"
    if [ -f "$md_file" ]; then
        echo "Skip: $basename.md (already exists)"
        continue
    fi

    echo "Converting: $basename.html → $basename.md"

    # Extract body content and convert to markdown
    python3 << EOF
import html2text
import re

with open("$html_file", "r", encoding="utf-8") as f:
    html = f.read()

# Try to extract just the body/article content
body_match = re.search(r'<body[^>]*>(.*?)</body>', html, re.DOTALL | re.IGNORECASE)
if body_match:
    content = body_match.group(1)
else:
    content = html

# Remove script tags
content = re.sub(r'<script[^>]*>.*?</script>', '', content, flags=re.DOTALL | re.IGNORECASE)

# Remove style tags
content = re.sub(r'<style[^>]*>.*?</style>', '', content, flags=re.DOTALL | re.IGNORECASE)

# Convert to markdown
h = html2text.HTML2Text()
h.ignore_links = False
h.ignore_images = False
h.body_width = 0  # No wrapping

md = h.handle(content)

# Clean up excessive blank lines
md = re.sub(r'\n{3,}', '\n\n', md)

with open("$md_file", "w", encoding="utf-8") as f:
    f.write(md.strip() + "\n")
EOF

done

echo "Done. Now run ./build.sh to rebuild all posts."
