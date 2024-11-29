const fs = require('fs');
const path = require('path');

// Path to the file you want to modify
const filePath = path.resolve(__dirname, 'node_modules/react-native-keyboard-spacer/KeyboardSpacer.js');

// Backup the original file
const backupPath = `${filePath}.backup`;

// Read the file and modify it
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Check if the problematic code is already commented out
    if (data.includes('// style: ViewPropTypes.style')) {
        console.log('File is already patched.');
        return;
    }

    // Replace the problematic lines
    const patchedData = data.replace(
        /style: ViewPropTypes.style,/,
        '// style: ViewPropTypes.style,'
    );

    // Backup the original file
    fs.writeFile(backupPath, data, (backupErr) => {
        if (backupErr) {
            console.error('Error creating backup:', backupErr);
            return;
        }

        // Write the patched file
        fs.writeFile(filePath, patchedData, (writeErr) => {
            if (writeErr) {
                console.error('Error writing patched file:', writeErr);
            } else {
                console.log('File patched successfully!');
            }
        });
    });
});
