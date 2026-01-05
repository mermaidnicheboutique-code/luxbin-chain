# 🚀 Deploy LUXBIN to Base - Final Steps

## Step 1: Open Terminal

Open a new terminal window.

## Step 2: Go to Project Directory

```bash
cd ~/Desktop/LUXBIN_PROJECT_COMPLETE
```

## Step 3: Set Your Private Key (SECURE!)

```bash
export PRIVATE_KEY='your_private_key_here'
```

**Replace `your_private_key_here` with your actual private key!**

**⚠️ IMPORTANT:** 
- This command only sets it for THIS terminal session
- It won't be saved anywhere
- Close the terminal when done for security

## Step 4: Deploy!

```bash
./deploy_to_base.sh
```

## What Will Happen:

1. Script compiles your contract ✅
2. Deploys to Base mainnet ✅  
3. Costs ~$0.01 in gas ✅
4. Shows you the contract address ✅

## After Deployment:

You'll see something like:

```
Deployed to: 0x1234567890abcdef...
```

**COPY THAT ADDRESS!** You'll need it to stake.

---

## Step 5: Stake Your USDC

After deployment succeeds, tell me the contract address and I'll help you:
1. Approve USDC spending
2. Stake your $14 USDC
3. Start earning rewards!

---

## Troubleshooting:

**If you get "PRIVATE_KEY not set":**
- Make sure you ran the `export PRIVATE_KEY=...` command
- Make sure you're in the same terminal window

**If compilation fails:**
- Run: `cd ~/Desktop/LUXBIN_PROJECT_COMPLETE`
- Run: `forge build` to see detailed errors

**If deployment fails:**
- Check you have enough ETH (you have $1.17, should be plenty!)
- Check your private key is correct

---

**Ready? Follow the steps above and let me know when you've deployed!** 🚀
