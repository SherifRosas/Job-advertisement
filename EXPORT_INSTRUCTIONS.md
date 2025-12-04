# How to Export Component Tree as Image

## Method 1: Using Browser (Easiest)

1. **Open the HTML file:**
   - Double-click `campaign-tree-vertical.html` to open it in your browser

2. **Take a Screenshot:**
   - **Chrome/Edge:** Press `F12` → Click the device toolbar icon → Set custom dimensions (e.g., 1920x1080) → Right-click page → "Capture screenshot"
   - **Firefox:** Press `F12` → Click the responsive design icon → Set dimensions → Use browser screenshot tool
   - **Safari:** Press `Cmd+Shift+4` for screenshot tool

3. **Or Print to PDF then convert:**
   - Press `Ctrl+P` (or `Cmd+P` on Mac)
   - Choose "Save as PDF"
   - Use an online PDF to image converter (like ilovepdf.com or smallpdf.com)

## Method 2: Using Command Line Tools

### Using Puppeteer (Node.js)
```bash
npm install -g puppeteer
node -e "const puppeteer = require('puppeteer'); (async () => { const browser = await puppeteer.launch(); const page = await browser.newPage(); await page.goto('file://' + __dirname + '/campaign-tree-vertical.html'); await page.screenshot({ path: 'campaign-tree.png', fullPage: true }); await browser.close(); })();"
```

### Using wkhtmltopdf (if installed)
```bash
wkhtmltoimage --width 1920 campaign-tree-vertical.html campaign-tree.png
```

## Method 3: Online Tools

1. Open `campaign-tree-vertical.html` in browser
2. Use online screenshot tools:
   - **htmlcsstoimage.com** - Upload HTML or paste URL
   - **screenshot.guru** - Enter local file path
   - **html2canvas** - Browser-based tool

## Method 4: Browser Extensions

Install a screenshot extension:
- **Full Page Screen Capture** (Chrome)
- **FireShot** (Chrome/Firefox)
- **Awesome Screenshot** (Chrome/Firefox)

Then:
1. Open `campaign-tree-vertical.html` in browser
2. Click the extension icon
3. Choose "Capture entire page"
4. Save as PNG/JPG

## Recommended Dimensions

For best quality:
- **Width:** 1920px or 2560px
- **Height:** Auto (full page)
- **Format:** PNG (for best quality) or JPG (for smaller file size)

## Quick Steps (Simplest)

1. Open `campaign-tree-vertical.html` in Chrome
2. Press `F12` to open DevTools
3. Press `Ctrl+Shift+P` (Command Palette)
4. Type "screenshot" and select "Capture full size screenshot"
5. Image will be saved automatically!

