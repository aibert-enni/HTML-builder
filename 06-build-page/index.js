/* eslint-disable prettier/prettier */
const fs = require('node:fs').promises;
const { cp } = require('node:fs');
const path = require('path');

const readTemplate = async () => {
  return (await fs.readFile(path.join(__dirname, 'template.html'))).toString();
};

const readComponents = async () => {
  const files = await fs.readdir(path.join(__dirname, 'components'), (err) => {
    console.log(err);
  });

  const components = {};

  for(let i = 0; i < files.length; i++) {
    const fileContent = (await fs.readFile(path.join(__dirname, 'components', files[i]))).toString();
    components[files[i].replace('.html', '')] = fileContent;
  }
  return components;
};

const readStyles = async () => {
  const files = await fs.readdir(path.join(__dirname, 'styles'), (err) => {
    if(err) console.log(err);
  });

  const styles = [];

  for(let i = 0; i < files.length; i++) {
    const fileContent = (await fs.readFile(path.join(__dirname, 'styles', files[i]))).toString();
    styles.push(fileContent);
  }

  return styles;
};

async function run() {
  const projectPath = path.join(__dirname, 'project-dist');

  // create project folder
  fs.mkdir(projectPath, {recursive: true}, (err) => {
    console.log(err);
  });

  // copy assets

  cp(path.join(__dirname, 'assets'), path.join(projectPath, 'assets'), {recursive: true}, (err) => {
    if(err) console.log(err);
  });

  // create index.html
  let templateContent = await readTemplate();

  const componentsContent = await readComponents();

  const components = ['header', 'articles', 'footer'];

  for(let i = 0; i < components.length; i++) {
    templateContent = templateContent.replace(`{{${components[i]}}}`, componentsContent[components[i]]);
  }

  fs.writeFile(path.join(projectPath, 'index.html'), templateContent);

  // create styles
  const styles = await readStyles();

  fs.writeFile(path.join(projectPath, 'style.css'), styles.join(''));
}

run();