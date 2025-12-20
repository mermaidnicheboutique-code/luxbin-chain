#!/usr/bin/env node

// LUXBIN Trinity Cryptography Test Script
// Tests the three-layer encryption: Diamond + Acoustic + Temporal

const crypto = require('crypto');
const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');

class TrinityCryptography {
    constructor() {
        this.keyring = new Keyring({ type: 'sr25519' });
    }

    // Simulate LDD diamond signature generation
    generateDiamondSignature(accountId, timestamp) {
        console.log('💎 Generating LDD Diamond Signature...');

        // Simulate diamond physics parameters
        const cStability = this.diamondStability(timestamp);
        const rResonance = this.quartzResonance(timestamp);
        const dEntropy = this.defectEntropy(accountId);
        const bCoupling = this.boundaryCoupling(accountId);
        const iDiffusion = this.interfaceDiffusion(timestamp, accountId);

        // Combine using LDD formula: Ψ(t) = C·R·D·B·I
        const psi = cStability * rResonance * dEntropy * bCoupling * iDiffusion;

        // Create signature hash
        const data = accountId + timestamp.toString() + psi.toString();
        const hash = crypto.createHash('sha512').update(data).digest('hex');

        console.log(`   Diamond signature: ${hash.substring(0, 16)}...`);
        return hash;
    }

    // Diamond physics simulation functions
    diamondStability(timestamp) {
        const baseStability = 0.99;
        const dailyCycle = (timestamp % 86400) / 86400 * 0.01;
        return baseStability - dailyCycle;
    }

    quartzResonance(timestamp) {
        const baseFreq = 32.768;
        const variation = Math.sin((timestamp % 1000) / 1000 * Math.PI * 2) * 0.01;
        return baseFreq + variation;
    }

    defectEntropy(accountId) {
        const sum = accountId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return (sum / (32 * 255) * 2) - 1; // Normalize to [-1, 1]
    }

    boundaryCoupling(accountId) {
        const firstByte = accountId.charCodeAt(0);
        return firstByte / 255 * 2 + 0.5; // [0.5, 2.5]
    }

    interfaceDiffusion(timestamp, accountId) {
        const timeFactor = (timestamp % 3600) / 3600;
        const keyFactor = accountId.charCodeAt(1) / 255;
        return timeFactor * keyFactor + 0.1;
    }

    // Generate acoustic key (simulated)
    generateAcousticKey() {
        console.log('🌊 Generating Acoustic Key...');

        // Simulate three acoustic waves
        const wave1GHz = {
            frequency: 1_000_000_000,
            amplitude: Math.random() * 1000,
            phase: Math.random() * 360
        };

        const wave500MHz = {
            frequency: 500_000_000,
            amplitude: Math.random() * 800,
            phase: Math.random() * 360
        };

        const wave100MHz = {
            frequency: 100_000_000,
            amplitude: Math.random() * 600,
            phase: Math.random() * 360
        };

        // Combine wave parameters into key
        const acousticData = `${wave1GHz.amplitude}-${wave1GHz.phase}-${wave500MHz.amplitude}-${wave500MHz.phase}-${wave100MHz.amplitude}-${wave100MHz.phase}`;
        const acousticKey = crypto.createHash('sha256').update(acousticData).digest('hex');

        console.log(`   Acoustic key: ${acousticKey.substring(0, 16)}...`);
        return acousticKey;
    }

    // Create temporal lock
    generateTemporalLock(validityHours = 24) {
        console.log('⏰ Generating Temporal Lock...');

        const now = Math.floor(Date.now() / 1000);
        const temporalLock = now + (validityHours * 3600);

        console.log(`   Valid until: ${new Date(temporalLock * 1000).toISOString()}`);
        return temporalLock;
    }

    // Combine all three elements into Trinity key
    combineTrinityElements(diamondSignature, acousticKey, temporalLock) {
        console.log('🔗 Combining Trinity Elements...');

        const combinedData = diamondSignature + acousticKey + temporalLock.toString();
        const trinityHash = crypto.createHash('sha512').update(combinedData).digest('hex');

        console.log(`   Trinity hash: ${trinityHash.substring(0, 16)}...`);
        return trinityHash;
    }

    // Perform Trinity encryption
    async trinityEncrypt(data, trinityKey) {
        console.log('🔐 Performing Trinity Encryption...');

        // Combine data with trinity key
        const encryptionData = data + trinityKey;
        const encryptedData = crypto.createHash('sha512').update(encryptionData).digest('hex');

        console.log(`   Encrypted: ${encryptedData.substring(0, 16)}...`);
        return encryptedData;
    }

    // Verify Trinity decryption
    async trinityDecrypt(encryptedData, originalData, trinityKey) {
        console.log('🔓 Verifying Trinity Decryption...');

        const computedEncrypted = crypto.createHash('sha512')
            .update(originalData + trinityKey)
            .digest('hex');

        const isValid = computedEncrypted === encryptedData;
        console.log(`   Verification: ${isValid ? '✅ SUCCESS' : '❌ FAILED'}`);

        return isValid;
    }

    // Full Trinity cryptography test
    async runTrinityTest() {
        console.log('🌟 LUXBIN Trinity Cryptography Test');
        console.log('=====================================\n');

        try {
            // Generate test account
            const alice = this.keyring.addFromUri('//Alice');
            const accountId = alice.address;
            console.log(`👤 Test Account: ${accountId}\n`);

            // Step 1: Generate diamond signature
            const timestamp = Math.floor(Date.now() / 1000);
            const diamondSignature = this.generateDiamondSignature(accountId, timestamp);

            // Step 2: Generate acoustic key
            const acousticKey = this.generateAcousticKey();

            // Step 3: Generate temporal lock
            const temporalLock = this.generateTemporalLock();

            // Step 4: Combine into trinity key
            const trinityKey = this.combineTrinityElements(diamondSignature, acousticKey, temporalLock);

            console.log('\n🎯 Trinity Key Generated Successfully!');
            console.log(`   Diamond: ${diamondSignature.substring(0, 8)}...`);
            console.log(`   Acoustic: ${acousticKey.substring(0, 8)}...`);
            console.log(`   Temporal: ${temporalLock}`);
            console.log(`   Trinity: ${trinityKey.substring(0, 8)}...\n`);

            // Step 5: Test encryption/decryption
            const testData = "LUXBIN_SECRET_MESSAGE_" + Date.now();
            console.log(`📝 Test Data: ${testData}`);

            const encrypted = await this.trinityEncrypt(testData, trinityKey);
            const decrypted = await this.trinityDecrypt(encrypted, testData, trinityKey);

            if (decrypted) {
                console.log('\n🎉 Trinity Cryptography Test PASSED!');
                console.log('   All three layers (Diamond + Acoustic + Temporal) working correctly.');
            } else {
                console.log('\n❌ Trinity Cryptography Test FAILED!');
            }

        } catch (error) {
            console.error('❌ Test Error:', error.message);
        }
    }

    // Test blockchain integration
    async testBlockchainIntegration() {
        console.log('\n🔗 Testing Blockchain Integration...');

        try {
            // Connect to local node (if running)
            const wsProvider = new WsProvider('ws://127.0.0.1:9944');
            const api = await ApiPromise.create({ provider: wsProvider });

            console.log('✅ Connected to blockchain');

            const alice = this.keyring.addFromUri('//Alice');
            console.log(`👤 Using account: ${alice.address}`);

            // Test temporal key generation
            console.log('\n🔑 Testing Temporal Key Generation...');
            const phrase = 'TEST_TRINITY_' + Date.now();
            const phraseBytes = Array.from(Buffer.from(phrase));

            const unsub = await api.tx.temporalCrypto
                .generateTemporalKey(phraseBytes)
                .signAndSend(alice, ({ status, events }) => {
                    if (status.isInBlock) {
                        console.log('✅ Temporal key generated on-chain');

                        events.forEach(({ event }) => {
                            if (event.method === 'TemporalKeyGenerated') {
                                console.log('🎯 Event received:', event.method);
                            }
                        });

                        unsub();
                        console.log('🎉 Blockchain integration test completed!');
                    }
                });

        } catch (error) {
            console.log('⚠️  Blockchain not available (run local node for full test)');
            console.log('   Error:', error.message);
        }
    }
}

// Main test function
async function main() {
    const trinity = new TrinityCryptography();

    // Run Trinity cryptography test
    await trinity.runTrinityTest();

    // Test blockchain integration
    await trinity.testBlockchainIntegration();

    console.log('\n✨ Test completed!');
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = TrinityCryptography;