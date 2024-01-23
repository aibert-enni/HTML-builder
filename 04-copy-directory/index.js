/* eslint-disable prettier/prettier */
const fs = require('node:fs');

const path = require('path');

const filePath = path.join(__dirname, 'files-copy');

fs.mkdir(filePath, {recursive: true}, (err) => {
  if(err) console.log(err);
});



fs.readdir(path.join(__dirname, 'files'), (err, files) => {
  if(err) {
    console.log(err);
  } else {
    files.forEach(file => {
      fs.copyFile(path.join(__dirname, 'files', file), path.join(filePath, file), (err) => {
        if(err) console.log(err);
      });
    });
  }
});