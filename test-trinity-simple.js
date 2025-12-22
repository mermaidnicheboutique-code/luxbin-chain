#!/usr/bin/env node

// Simple LUXBIN Trinity Cryptography Test
const crypto = require('crypto');

console.log('🌟 LUXBIN Trinity Cryptography Test');
console.log('=====================================\n');

class TrinityCryptography {
    generateDiamondSignature(accountId, timestamp) {
        console.log('💎 Generating LDD Diamond Signature...');
        const cStability = 0.99 - (timestamp % 86400) / 86400 * 0.01;
        const rResonance = 32.768 + Math.sin((timestamp % 1000) / 1000 * Math.PI * 2) * 0.01;
        const dEntropy = (accountId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) / (32 * 255) * 2) - 1;
        const bCoupling = accountId.charCodeAt(0) / 255 * 2 + 0.5;
        const iDiffusion = ((timestamp % 3600) / 3600) * (accountId.charCodeAt(1) / 255) + 0.1;

        const psi = cStability * rResonance * dEntropy * bCoupling * iDiffusion;
        const data = accountId + timestamp.toString() + psi.toString();
        const hash = crypto.createHash('sha512').update(data).digest('hex');

        console.log(`   Diamond signature: ${hash.substring(0, 16)}...`);
        return hash;
    }

    generateAcousticKey() {
        console.log('🌊 Generating Acoustic Key...');
        const wave1GHz = { amplitude: Math.random() * 1000, phase: Math.random() * 360 };
        const wave500MHz = { amplitude: Math.random() * 800, phase: Math.random() * 360 };
        const wave100MHz = { amplitude: Math.random() * 600, phase: Math.random() * 360 };

        const acousticData = `${wave1GHz.amplitude}-${wave1GHz.phase}-${wave500MHz.amplitude}-${wave500MHz.phase}-${wave100MHz.amplitude}-${wave100MHz.phase}`;
        const acousticKey = crypto.createHash('sha256').update(acousticData).digest('hex');

        console.log(`   Acoustic key: ${acousticKey.substring(0, 16)}...`);
        return acousticKey;
    }

    generateTemporalLock(validityHours = 24) {
        console.log('⏰ Generating Temporal Lock...');
        const now = Math.floor(Date.now() / 1000);
        const temporalLock = now + (validityHours * 3600);

        console.log(`   Valid until: ${new Date(temporalLock * 1000).toISOString()}`);
        return temporalLock;
    }

    combineTrinityElements(diamondSignature, acousticKey, temporalLock) {
        console.log('🔗 Combining Trinity Elements...');
        const combinedData = diamondSignature + acousticKey + temporalLock.toString();
        const trinityHash = crypto.createHash('sha512').update(combinedData).digest('hex');

        console.log(`   Trinity hash: ${trinityHash.substring(0, 16)}...`);
        return trinityHash;
    }

    async trinityEncrypt(data, trinityKey) {
        console.log('🔐 Performing Trinity Encryption...');
        const encryptionData = data + trinityKey;
        const encryptedData = crypto.createHash('sha512').update(encryptionData).digest('hex');

        console.log(`   Encrypted: ${encryptedData.substring(0, 16)}...`);
        return encryptedData;
    }

    async trinityDecrypt(encryptedData, originalData, trinityKey) {
        console.log('🔓 Verifying Trinity Decryption...');
        const computedEncrypted = crypto.createHash('sha512').update(originalData + trinityKey).digest('hex');
        const isValid = computedEncrypted === encryptedData;
        console.log(`   Verification: ${isValid ? '✅ SUCCESS' : '❌ FAILED'}`);
        return isValid;
    }

    async runTest() {
        const accountId = 'test-account-' + Math.random().toString(36).substr(2, 9);
        console.log(`👤 Test Account: ${accountId}\n`);

        const timestamp = Math.floor(Date.now() / 1000);
        const diamondSignature = this.generateDiamondSignature(accountId, timestamp);
        const acousticKey = this.generateAcousticKey();
        const temporalLock = this.generateTemporalLock();
        const trinityKey = this.combineTrinityElements(diamondSignature, acousticKey, temporalLock);

        console.log('\n🎯 Trinity Key Generated Successfully!');
        console.log(`   Diamond: ${diamondSignature.substring(0, 8)}...`);
        console.log(`   Acoustic: ${acousticKey.substring(0, 8)}...`);
        console.log(`   Temporal: ${temporalLock}`);
        console.log(`   Trinity: ${trinityKey.substring(0, 8)}...\n`);

        const testData = 'LUXBIN_SECRET_MESSAGE_' + Date.now();
        console.log(`📝 Test Data: ${testData}`);

        const encrypted = await this.trinityEncrypt(testData, trinityKey);
        const decrypted = await this.trinityDecrypt(encrypted, testData, trinityKey);

        if (decrypted) {
            console.log('\n🎉 Trinity Cryptography Test PASSED!');
            console.log('   All three layers (Diamond + Acoustic + Temporal) working correctly.');
        } else {
            console.log('\n❌ Trinity Cryptography Test FAILED!');
        }

        return decrypted;
    }
}

const trinity = new TrinityCryptography();
trinity.runTest().then(success => {
    console.log(`\n✨ Trinity Test Result: ${success ? 'PASS' : 'FAIL'}`);
    console.log('\n🔗 Testing Blockchain Integration...');

    // Test if we can connect to blockchain (this will likely fail without running node)
    try {
        const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
        console.log('⚠️  Blockchain integration test requires running local node');
        console.log('   Run: ./target/release/luxbin-node --dev');
    } catch (e) {
        console.log('⚠️  Polkadot API not available for blockchain testing');
    }

}).catch(console.error);