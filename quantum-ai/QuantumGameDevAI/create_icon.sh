#!/bin/bash
# Create a simple app icon

# Create a 512x512 PNG icon with the Quantum Game Dev AI logo
# This requires ImageMagick to be installed

if command -v convert >/dev/null 2>&1; then
    echo "Creating app icon..."

    # Create a simple icon with text
    convert -size 512x512 xc:'#2b2b2b' \
        -pointsize 72 -fill white -gravity center \
        -annotate +0-50 '🎮' \
        -pointsize 24 -fill '#cccccc' -gravity center \
        -annotate +0+20 'Quantum' \
        -pointsize 24 -fill '#cccccc' -gravity center \
        -annotate +0+50 'Game Dev' \
        -pointsize 24 -fill '#cccccc' -gravity center \
        -annotate +0+80 'AI' \
        QuantumGameDevAI.app/Contents/Resources/AppIcon.png

    # Convert to ICNS format for macOS
    if command -v iconutil >/dev/null 2>&1; then
        mkdir -p icon.iconset
        convert QuantumGameDevAI.app/Contents/Resources/AppIcon.png -resize 512x512 icon.iconset/icon_512x512.png
        convert QuantumGameDevAI.app/Contents/Resources/AppIcon.png -resize 256x256 icon.iconset/icon_256x256.png
        convert QuantumGameDevAI.app/Contents/Resources/AppIcon.png -resize 128x128 icon.iconset/icon_128x128.png
        convert QuantumGameDevAI.app/Contents/Resources/AppIcon.png -resize 64x64 icon.iconset/icon_64x64.png
        convert QuantumGameDevAI.app/Contents/Resources/AppIcon.png -resize 32x32 icon.iconset/icon_32x32.png
        convert QuantumGameDevAI.app/Contents/Resources/AppIcon.png -resize 16x16 icon.iconset/icon_16x16.png

        iconutil -c icns icon.iconset -o QuantumGameDevAI.app/Contents/Resources/AppIcon.icns
        rm -rf icon.iconset
        echo "✅ App icon created successfully!"
    else
        echo "⚠️  Icon created as PNG (install iconutil for ICNS format)"
    fi
else
    echo "⚠️  ImageMagick not found. Creating placeholder icon..."
    echo "🎮 Quantum Game Dev AI" > QuantumGameDevAI.app/Contents/Resources/AppIcon.txt
    echo "To create a proper icon, install ImageMagick:"
    echo "brew install imagemagick"
fi