# 🔧 Fix: ChunkLoadError in Next.js

## ❌ Error

```
ChunkLoadError: Loading chunk app/layout failed.
(timeout: http://localhost:3000/_next/static/chunks/app/layout.js)
```

## 🔍 Cause

This is a **Next.js build cache issue**. It happens when:
- Build cache gets corrupted
- Hot reload fails
- Build files are out of sync
- Development server has issues

## ✅ Solution

### Step 1: Stop Dev Server

Press `Ctrl+C` in the terminal where `npm run dev` is running.

### Step 2: Clear Next.js Cache

**Delete the `.next` folder:**
```bash
# Windows PowerShell
Remove-Item -Recurse -Force .next

# Or manually delete the .next folder
```

### Step 3: Clear Node Cache (Optional)

**Delete `node_modules/.cache` if it exists:**
```bash
# Windows PowerShell
Remove-Item -Recurse -Force node_modules\.cache
```

### Step 4: Restart Dev Server

```bash
npm run dev
```

### Step 5: Wait for Rebuild

Wait for Next.js to rebuild. You should see:
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
- Ready in X.XXs
```

### Step 6: Try Again

Go to `http://localhost:3000` and the error should be gone.

---

## 🔄 Quick Fix Command

**All-in-one (Windows PowerShell):**
```powershell
# Stop server first (Ctrl+C), then:
Remove-Item -Recurse -Force .next
npm run dev
```

---

## 🆘 If Still Failing

### Option 1: Full Clean Rebuild

```bash
# Stop server (Ctrl+C)
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules\.cache
npm run dev
```

### Option 2: Reinstall Dependencies

```bash
# Stop server (Ctrl+C)
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules
npm install
npm run dev
```

### Option 3: Check for Port Conflicts

```bash
# Make sure port 3000 is free
# If not, kill the process using port 3000
```

---

## 💡 Prevention

- **Don't stop server abruptly**: Use Ctrl+C properly
- **Clear cache regularly**: If you see build issues
- **Keep Next.js updated**: Run `npm update next`

---

## ✅ Expected Result

After clearing cache and restarting:
- ✅ No ChunkLoadError
- ✅ App loads normally
- ✅ All pages work
- ✅ Hot reload works

---

## 📋 Summary

1. Stop dev server (Ctrl+C)
2. Delete `.next` folder
3. Restart: `npm run dev`
4. Wait for rebuild
5. Try again

This should fix the ChunkLoadError! 🚀


