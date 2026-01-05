# MANUAL DESKTOP CLEANUP - STEP BY STEP

Since automated cleanup is hitting permission issues, here's how to manually clean everything:

---

## STEP 1: DELETE PROJECT FOLDERS FROM DESKTOP

**Open Finder, go to Desktop, and delete these folders:**

1. **WWYD2** (if exists)
2. **WWYD2_broken_backup** (if exists)
3. **BibleVRGame** (if exists)
4. **Desktop_Cleanup_Backup** (if you don't need old backups)

**How to delete:**
- Click the folder
- Press **Command + Delete** (moves to Trash)
- Or right-click → Move to Trash

---

## STEP 2: DELETE OLD PROJECTS FROM DOCUMENTS

**In Finder, go to Documents → Unreal Projects**

Delete these:
1. **WWYD2** folder
2. **WWYD2 5.6** folder
3. **WWYD2 5.7** folder
4. **BibleVRGame** folder (if exists)

---

## STEP 3: EMPTY TRASH

1. **Right-click Trash icon** in Dock
2. **Empty Trash**
3. Confirm deletion
4. Wait for it to finish (may take 2-5 minutes for large projects)

---

## STEP 4: CLEAR UNREAL ENGINE CACHES

**Option A: Use the cleanup script I created**

1. Open **Terminal** app
2. Type: `bash ~/Desktop/CLEANUP_ALL_WWYD_FILES.sh`
3. Press Enter
4. Wait for it to finish

**Option B: Manual cache clearing**

In Finder:
1. Press **Command + Shift + G** (Go to Folder)
2. Paste this path: `~/Library/Application Support/Epic/UnrealEngine/`
3. Delete these folders:
   - **5.6/Intermediate**
   - **5.6/Saved**
   - **Common/Zen/Data**

Then:
1. Press **Command + Shift + G** again
2. Paste: `~/Library/Logs/`
3. Delete folder: **Unreal Engine**

---

## STEP 5: VERIFY CLEAN DESKTOP

Your Desktop should now only have:
- ✅ **CLEANUP_ALL_WWYD_FILES.sh** (the script I created)
- ✅ **MANUAL_CLEANUP_GUIDE.md** (this file)
- ✅ **WWYD2_FRESH_START_PLAN.md** (the project plan)
- ✅ Any of your other personal files (not game related)

**Everything else should be gone!**

---

## WHAT IF FOLDERS WON'T DELETE?

If a folder says "in use" or won't delete:

1. **Close Unreal Engine** completely
2. **Close Epic Games Launcher** completely
3. **Restart your Mac** (this releases all file locks)
4. **Try deleting again** after restart

---

## AFTER CLEANUP - NEXT STEPS

Once your Desktop is clean:

1. **Open Epic Games Launcher**
2. **Go to Unreal Engine → Library**
3. **Launch version 5.6**
4. **Click "New Project"**
5. **Choose template: Third Person**
6. **Name it: WWYD2_Game**
7. **Location: Desktop**
8. **Click Create**

Then tell me "project created" and I'll guide you through:
- Setting up multiplayer (14 players)
- Downloading the free Paragon character assets
- Building your Faith/Power/Leaderboard systems
- Creating Level 1 with disciples and checkpoints

---

## SUMMARY - WHAT TO DELETE:

**FROM DESKTOP:**
- ❌ WWYD2
- ❌ WWYD2_broken_backup
- ❌ BibleVRGame
- ❌ Desktop_Cleanup_Backup (optional)
- ❌ WWYD2_ASSETS_TO_KEEP (if you don't need the old marketplace assets)

**FROM DOCUMENTS → UNREAL PROJECTS:**
- ❌ WWYD2
- ❌ WWYD2 5.6
- ❌ WWYD2 5.7
- ❌ BibleVRGame

**THEN:**
- 🗑️ Empty Trash
- 🧹 Clear Unreal caches (using script or manually)
- ✅ You're ready for a fresh start!

---

## CAN'T FIND A FOLDER?

That's okay! If a folder listed above doesn't exist, it means it's already been deleted or never existed. Just skip it and move to the next one.

---

**After you've cleaned everything, tell me "Desktop is clean" and I'll help you create the new project! 🎮**
