/**
 * LUXBIN Temporal Cryptography
 * Time-based key generation and validation
 * Keys expire and must be renewed periodically
 */

class LuxbinTemporalCrypto {
    constructor() {
        this.keyLifetime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        this.currentKey = null;
        this.keyExpiry = null;
        this.keyHistory = [];
    }

    /**
     * Generate a new temporal key based on current time
     */
    generateTemporalKey() {
        const now = Date.now();
        const timeWindow = Math.floor(now / (60 * 1000)) * (60 * 1000); // Round to minute

        // Create key from time-based seed
        const seed = `luxbin-temporal-${timeWindow}`;
        const key = this.hashToKey(seed);

        this.currentKey = key;
        this.keyExpiry = now + this.keyLifetime;

        // Store in history
        this.keyHistory.push({
            key: key,
            generated: now,
            expiry: this.keyExpiry
        });

        // Keep only last 10 keys
        if (this.keyHistory.length > 10) {
            this.keyHistory.shift();
        }

        return key;
    }

    /**
     * Simple hash function for key generation
     */
    hashToKey(seed) {
        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
            const char = seed.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }

        // Convert to hex string
        return Math.abs(hash).toString(16).padStart(8, '0');
    }

    /**
     * Validate if a key is still temporal (not expired)
     */
    isKeyValid(key) {
        if (!this.currentKey || key !== this.currentKey) {
            return false;
        }

        return Date.now() < this.keyExpiry;
    }

    /**
     * Get time remaining for current key
     */
    getTimeRemaining() {
        if (!this.keyExpiry) return 0;
        return Math.max(0, this.keyExpiry - Date.now());
    }

    /**
     * Encrypt data with temporal key
     */
    encrypt(data, key = null) {
        if (!key) key = this.currentKey;
        if (!this.isKeyValid(key)) {
            throw new Error('Temporal key expired or invalid');
        }

        // Simple XOR encryption with key
        const keyBytes = this.hexToBytes(key);
        const dataBytes = new TextEncoder().encode(data);
        const encrypted = new Uint8Array(dataBytes.length);

        for (let i = 0; i < dataBytes.length; i++) {
            encrypted[i] = dataBytes[i] ^ keyBytes[i % keyBytes.length];
        }

        return this.bytesToHex(encrypted);
    }

    /**
     * Decrypt data with temporal key
     */
    decrypt(encryptedHex, key = null) {
        if (!key) key = this.currentKey;
        if (!this.isKeyValid(key)) {
            throw new Error('Temporal key expired or invalid');
        }

        const keyBytes = this.hexToBytes(key);
        const encryptedBytes = this.hexToBytes(encryptedHex);
        const decrypted = new Uint8Array(encryptedBytes.length);

        for (let i = 0; i < encryptedBytes.length; i++) {
            decrypted[i] = encryptedBytes[i] ^ keyBytes[i % keyBytes.length];
        }

        return new TextDecoder().decode(decrypted);
    }

    /**
     * Convert hex string to byte array
     */
    hexToBytes(hex) {
        const bytes = [];
        for (let i = 0; i < hex.length; i += 2) {
            bytes.push(parseInt(hex.substr(i, 2), 16));
        }
        return bytes;
    }

    /**
     * Convert byte array to hex string
     */
    bytesToHex(bytes) {
        return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
    }

    /**
     * Get key status information
     */
    getKeyStatus() {
        return {
            currentKey: this.currentKey ? this.currentKey.substring(0, 8) + '...' : null,
            expiry: this.keyExpiry,
            timeRemaining: this.getTimeRemaining(),
            isValid: this.currentKey && this.isKeyValid(this.currentKey),
            historyLength: this.keyHistory.length
        };
    }

    /**
     * Renew key manually
     */
    renewKey() {
        return this.generateTemporalKey();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LuxbinTemporalCrypto;
}

// Global instance for browser use
if (typeof window !== 'undefined') {
    window.LuxbinTemporalCrypto = LuxbinTemporalCrypto;
}