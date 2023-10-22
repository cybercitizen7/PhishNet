const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');
const manifestPath = path.join(buildDir, 'manifest.json');
const jsDir = path.join(buildDir, 'static', 'js');
fs.readdir(jsDir, (err, files) => {
  // ... rest of your code
  if (err) {
    console.error("Error reading the build directory:", err.message);
    return;
  }
  console.log("Files in build directory:", files);  // Add this line
  // ... rest of your code

    // Filter out content.*.js file
    const contentScriptFile = files.find(file => file.startsWith('content.') && file.endsWith('.js'));

    if (!contentScriptFile) {
    console.error("Couldn't find content script in build directory.");
    return;
    }

    // Read manifest.json
    fs.readFile(manifestPath, 'utf-8', (err, data) => {
    if (err) throw err;

    const manifest = JSON.parse(data);
    manifest.content_scripts[0].js = [`static/js/${contentScriptFile}`];

    // Write updated manifest.json
    fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), err => {
        if (err) throw err;
        console.log('manifest.json updated with content script path.');
    });
    });
  
});