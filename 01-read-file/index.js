/* eslint-disable prettier/prettier */
const fs = require('node:fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

fs.readFile(filePath, 'utf-8', (err, data) => {
  if(err) {
    return console.log(err);
  }
  console.log(data);
});