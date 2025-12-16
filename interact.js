#!/usr/bin/env node

// Simple LUXBIN Blockchain Interactive Tool

const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let api, alice;

async function connect() {
  console.log('🔗 Connecting to LUXBIN blockchain...\n');
  const wsProvider = new WsProvider('ws://127.0.0.1:9944');
  api = await ApiPromise.create({ provider: wsProvider });

  const keyring = new Keyring({ type: 'sr25519' });
  alice = keyring.addFromUri('//Alice');

  console.log('✅ Connected!');
  console.log('📦 Latest block:', (await api.rpc.chain.getHeader()).number.toNumber());
  console.log('👤 Using account:', alice.address);
  console.log('💰 Balance:', (await api.query.system.account(alice.address)).data.free.toString(), '\n');
}

async function generateTemporalKey() {
  return new Promise((resolve) => {
    rl.question('Enter phrase for temporal key: ', async (phrase) => {
      const phraseBytes = Array.from(Buffer.from(phrase));
      console.log('\n🔑 Generating temporal key...');

      const unsub = await api.tx.temporalCrypto
        .generateTemporalKey(phraseBytes)
        .signAndSend(alice, ({ status, events }) => {
          if (status.isInBlock) {
            console.log('✅ Included in block:', status.asInBlock.toString());
            events.forEach(({ event }) => {
              if (event.method === 'TemporalKeyGenerated') {
                console.log('🎉 Event:', event.method);
              }
            });
            unsub();
            resolve();
          }
        });
    });
  });
}

async function encodePhotonic() {
  return new Promise((resolve) => {
    rl.question('Enter text to encode as color: ', async (text) => {
      const textBytes = Array.from(Buffer.from(text));
      console.log('\n🌈 Creating photonic encoding...');

      const unsub = await api.tx.temporalCrypto
        .encodePhotonic(textBytes)
        .signAndSend(alice, ({ status, events }) => {
          if (status.isInBlock) {
            console.log('✅ Included in block:', status.asInBlock.toString());
            events.forEach(({ event }) => {
              if (event.method === 'PhotonicEncoded') {
                console.log('🎉 Event:', event.method);
              }
            });
            unsub();
            resolve();
          }
        });
    });
  });
}

async function showMenu() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🌟 LUXBIN BLOCKCHAIN MENU');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('1. Generate Temporal Key');
  console.log('2. Encode Photonic Color');
  console.log('3. Check Latest Block');
  console.log('4. Check Balance');
  console.log('5. Exit');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  rl.question('Choose option (1-5): ', async (choice) => {
    switch(choice.trim()) {
      case '1':
        await generateTemporalKey();
        showMenu();
        break;
      case '2':
        await encodePhotonic();
        showMenu();
        break;
      case '3':
        const header = await api.rpc.chain.getHeader();
        console.log('\n📦 Latest block:', header.number.toNumber());
        showMenu();
        break;
      case '4':
        const account = await api.query.system.account(alice.address);
        console.log('\n💰 Balance:', account.data.free.toString());
        showMenu();
        break;
      case '5':
        console.log('\n👋 Goodbye!');
        await api.disconnect();
        process.exit(0);
        break;
      default:
        console.log('\n❌ Invalid option');
        showMenu();
    }
  });
}

connect().then(() => {
  showMenu();
}).catch(console.error);
