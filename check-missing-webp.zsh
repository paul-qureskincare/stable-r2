#!/bin/zsh

set -e

echo "🔍 Checking .webp image paths in .hbs files..."
echo ""

find . -type f -name "*.hbs" | while read -r hbs_file; do
  grep -oE '"[^"]+\.webp[^"]*"' "$hbs_file" | while read -r match; do
    value="${match:1:-1}"
    image_path=$(echo "$value" | awk '{print $1}')

    if [[ "$image_path" == http://\* || "$image_path" == https://\* || "$image_path" == //* ]]; then
      continue
    fi

    image_path="${image_path%%\?*}"
    image_path="${image_path%%#*}"

    if [[ ! -f "$image_path" ]]; then
      echo "❌ Missing image:"
      echo "   file: $hbs_file"
      echo "   path: $image_path"
      echo ""
    fi
  done
done

echo "🎉 Done"
