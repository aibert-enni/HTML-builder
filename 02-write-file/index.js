/* eslint-disable prettier/prettier */
const fs = require('node:fs');
const readline = require('node:readline');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

let rl = readline.Interface(process.stdin, process.stdout);


fs.open(filePath, 'a', (err, fd) => {
  if(err) {
    return err;
  };
  rl.prompt();
  rl.on('line', (message) => {
    if(message == 'exit') rl.close('Game over');
    fs.write(fd, new Buffer.from(message), (err) => {
      if(err) {
        console.log('Cant write to file');
      }
    });
  });
});