/* eslint-disable prettier/prettier */
const fs = require('node:fs');

const path = require('path');

const stylesPath = path.join(__dirname, 'styles');

let styles = [];

const files = fs.readdirSync(stylesPath, (err) => {
  if(err) console.log(err);
});

files.forEach(file => {
  const filePath = path.join(stylesPath, file);
  if(path.extname(filePath) == '.css') {
    const data = fs.readFileSync(filePath);
    styles.push(data.toString());
  }});

fs.writeFileSync(path.join(__dirname, 'project-dist', 'bundle.css'), styles.join(''));