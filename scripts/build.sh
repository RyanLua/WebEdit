#!/bin/bash
set -e

echo "Building extension..."

VERSION=$(grep -oP '"version":\s*"\K[0-9.]+(?=")' src/manifest.json)
BUILD_DIR="builds"
CHROMIUM_FOLDER="web-edit-$VERSION-chromium"
FIREFOX_FOLDER="web-edit-$VERSION-firefox"

# Setup build directory
echo "Cleaning up build directory..."
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"
cd "$BUILD_DIR"

# Build Chromium extension
mkdir -p "$CHROMIUM_FOLDER"
cp -r ../src/* "$CHROMIUM_FOLDER"
rm "$CHROMIUM_FOLDER/manifest.firefox.json"
cd "$CHROMIUM_FOLDER"
zip -rq "../$CHROMIUM_FOLDER.zip" *
cd ..
echo "Chromium extension built successfully"

# Build Firefox extension
mkdir -p "$FIREFOX_FOLDER"
cp -r ../src/* "$FIREFOX_FOLDER"
cp "$FIREFOX_FOLDER/manifest.firefox.json" "$FIREFOX_FOLDER/manifest.json"
rm "$FIREFOX_FOLDER/manifest.firefox.json"
cd "$FIREFOX_FOLDER"
zip -rq "../$FIREFOX_FOLDER.zip" *
cd ..
echo "Firefox extension built successfully"

echo "Build completed successfully!"