const fs = require('fs');
const path = require('path');

// Path to the file you want to modify
const filePath = path.resolve(__dirname, '../node_modules/expo-activity-feed/src/index.js');

// Backup the original file
const backupPath = `${filePath}.backup`;

// The updated code (we'll modify specific lines rather than replacing the entire file)
const updatedCode = `
import { registerNativeHandlers } from 'react-native-activity-feed-core';
import * as ImagePicker from 'expo-image-picker';
// import * as Permissions from 'expo-permissions'; // Commented out
import * as MediaLibrary from 'expo-media-library'; // Replaced with expo-media-library for permissions

registerNativeHandlers({
  pickImage: async ({ compressImageQuality = 0.2 }) => {
    try {
      // const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL); // Commented out
      const { status } = await MediaLibrary.requestPermissionsAsync(); // Replaced with new permission request

      if (status !== 'granted') {
        return {
          cancelled: true,
        };
      }

      const { cancelled, ...rest } = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        aspect: [4, 3],
        quality: compressImageQuality,
      });

      if (cancelled) {
        return {
          cancelled,
        };
      }
      return {
        cancelled: false,
        uri: rest.uri,
      };
    } catch (err) {
      return {
        cancelled: true,
      };
    }
  },
});

export * from 'react-native-activity-feed-core';
`;

// Read the file and modify it
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Check if the problematic code is already commented out
  if (data.includes('// import * as Permissions from \'expo-permissions\';') && data.includes('import * as MediaLibrary from \'expo-media-library\';')) {
    console.log('"expo-activity-feed" file is already patched.');
    return;
  }

  // Backup the original file
  fs.writeFile(backupPath, data, (backupErr) => {
    if (backupErr) {
      console.error('Error creating backup:', backupErr);
      return;
    }

    // Write the patched file
    fs.writeFile(filePath, updatedCode, (writeErr) => {
      if (writeErr) {
        console.error('Error writing patched file:', writeErr);
      } else {
        console.log('File patched successfully!');
      }
    });
  });
});
