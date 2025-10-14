#!/bin/bash

cd projects

for project in */ ; do
  # Only process directories
  [ -d "$project" ] || continue

  for subdir in "$project"*/ ; do
    [ -d "$subdir" ] || continue

    cd "$subdir"
    count=1
    for img in *.{jpg,jpeg,png,gif,webp,bmp}; do
      [ -e "$img" ] || continue
      ext="${img##*.}"
      # Find next available number
      while [ -e "$count.$ext" ]; do
        count=$((count + 1))
      done
      mv "$img" "$count.$ext"
      count=$((count + 1))
    done
    cd - > /dev/null
  done
done