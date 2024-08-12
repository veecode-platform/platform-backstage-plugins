#!/bin/bash
plugins_dir="./plugins"

for dir in "$plugins_dir"/*; do
  if [ -d "$dir" ]; then
    package_json="$dir/package.json"
    if [ -f "$package_json" ]; then
      echo "--------------------------------------------------------------------------------------------------------------------------"
      echo "Checking dependencies for $(basename "$dir")..."
      output=$(npx --yes depcheck ./plugins/kong-service-manager)
      output=$(echo "$output" | sed 's/^/   /')
      echo "$output"
    else
      echo "No package.json found in $(basename "$dir"), skipping..."
    fi
  fi
done