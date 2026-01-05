#!/bin/bash
BACKUP_DIR="$HOME/Backups/Luxbin"
SOURCE_DIR="$HOME/Desktop/luxbin_chain"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "Starting Luxbin backup..."

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Create compressed backup
echo "Creating compressed backup..."
tar -czf "$BACKUP_DIR/luxbin_chain_$TIMESTAMP.tar.gz" -C "$HOME/Desktop" luxbin_chain/

echo "Backup completed: luxbin_chain_$TIMESTAMP.tar.gz"
echo "Size: $(du -sh "$BACKUP_DIR/luxbin_chain_$TIMESTAMP.tar.gz" | cut -f1)"
