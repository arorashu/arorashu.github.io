#!/usr/bin/env nix-shell
#!nix-shell -i bash -p cmark-gfm

# Build script for blog posts
# Converts data/posts/*.md -> posts/*.html

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SRC_DIR="$SCRIPT_DIR/data/posts"
OUT_DIR="$SCRIPT_DIR/posts"

# Create output directory if needed
mkdir -p "$OUT_DIR"

# Convert a single markdown file to HTML
build_post() {
    local md_file="$1"
    local basename="$(basename "$md_file" .md)"
    local html_file="$OUT_DIR/$basename.html"

    # Extract title: try H1 first, then pagetitle from frontmatter, then filename
    local title=""
    title=$(grep -m1 '^# ' "$md_file" | sed 's/^# //')
    if [ -z "$title" ]; then
        title=$(grep -m1 '^pagetitle:' "$md_file" | sed 's/^pagetitle: *//')
    fi
    if [ -z "$title" ]; then
        # Convert filename to title: deploy-aws-day1 -> Deploy Aws Day1
        title=$(echo "$basename" | sed 's/-/ /g' | sed 's/\b\w/\u&/g')
    fi

    # Convert markdown to HTML body
    local body=$(cmark-gfm -e table -e strikethrough -e autolink "$md_file")

    # Write complete HTML file
    cat > "$html_file" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$title - Shubham Arora</title>
    <link rel="stylesheet" href="../style.css">
</head>
<body>
<div class="post">
    <p><a href="../index.html">&larr; Home</a> · <a href="index.html">Posts</a></p>
$body
</div>
</body>
</html>
EOF

    echo "Built: $basename.html"
}

# Build all posts
echo "Building posts..."
count=0
for md_file in "$SRC_DIR"/*.md; do
    [ -f "$md_file" ] || continue
    build_post "$md_file"
    count=$((count + 1))
done

echo "Done. Built $count posts."
