#!/usr/bin/env node

// LUXBIN Blockchain Test Script
// Tests temporal-crypto and ai-compute pallets

const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
const { hexToU8a } = require('@polkadot/util');

async function main() {
  console.log('🔗 Connecting to LUXBIN blockchain...');

  // Connect to local node
  const wsProvider = new WsProvider('ws://127.0.0.1:9944');
  const api = await ApiPromise.create({ provider: wsProvider });

  console.log('✅ Connected to chain:', (await api.rpc.system.chain()).toString());
  console.log('📦 Latest block:', (await api.rpc.chain.getHeader()).number.toNumber());

  // Create Alice account (pre-funded in dev chain)
  const keyring = new Keyring({ type: 'sr25519' });
  const alice = keyring.addFromUri('//Alice');

  console.log('\n👤 Testing with Alice:', alice.address);
  console.log('💰 Balance:', (await api.query.system.account(alice.address)).data.free.toString());

  // Test 1: Generate Temporal Key
  console.log('\n🔑 TEST 1: Generating temporal key...');
  const phrase = 'SECURE PAYMENT';
  const phraseBytes = Array.from(Buffer.from(phrase));

  try {
    const txHash = await api.tx.temporalCrypto
      .generateTemporalKey(phraseBytes)
      .signAndSend(alice);

    console.log('✅ Temporal key generated! Tx hash:', txHash.toString());
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  // Wait for block
  await new Promise(resolve => setTimeout(resolve, 6000));

  // Test 2: Photonic Encoding
  console.log('\n🌈 TEST 2: Encoding text as photonic color...');
  const text = 'HELLO LUXBIN';
  const textBytes = Array.from(Buffer.from(text));

  try {
    const txHash = await api.tx.temporalCrypto
      .encodePhotonic(textBytes)
      .signAndSend(alice);

    console.log('✅ Photonic encoding created! Tx hash:', txHash.toString());

    // Query the result
    await new Promise(resolve => setTimeout(resolve, 6000));
    const photonicData = await api.query.temporalCrypto.photonicData(alice.address);

    if (photonicData.isSome) {
      const data = photonicData.unwrap();
      console.log('🎨 Color - Hue:', data.color.hue.toString(),
                  'Saturation:', data.color.saturation.toString(),
                  'Lightness:', data.color.lightness.toString());
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  // Test 3: Register AI Node
  console.log('\n🤖 TEST 3: Registering as AI compute node...');

  try {
    // Register with GPT4 and Claude models
    const models = ['GPT4', 'Claude3Opus'];
    const txHash = await api.tx.aICompute
      .registerAiNode(models)
      .signAndSend(alice);

    console.log('✅ AI node registered! Tx hash:', txHash.toString());

    // Check registration
    await new Promise(resolve => setTimeout(resolve, 6000));
    const nodeInfo = await api.query.aICompute.aINodes(alice.address);

    if (nodeInfo.isSome) {
      const info = nodeInfo.unwrap();
      console.log('📊 Node Info:');
      console.log('   - Active:', info.active.toString());
      console.log('   - Models:', info.supported_models.length);
      console.log('   - Requests completed:', info.total_requests_completed.toString());
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  console.log('\n✅ All tests completed!');
  console.log('\n📊 Chain Stats:');
  console.log('   - Latest block:', (await api.rpc.chain.getHeader()).number.toNumber());
  console.log('   - Node version:', (await api.rpc.system.version()).toString());

  await api.disconnect();
  process.exit(0);
}

main().catch(console.error);
