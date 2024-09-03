import fs from 'fs/promises';
import path from 'path';

const targetLine = '<link rel="icon" href="../../../img/icons/logo colorida.png">';
const pagesFolder = path.resolve('pages'); // Adjust the path if necessary

async function updateHead(filePath) {
  try {
    let data = await fs.readFile(filePath, 'utf8');

    // Find the position of the closing head tag
    const headCloseTagIndex = data.indexOf('</head>');
    if (headCloseTagIndex === -1) {
      console.log(`No </head> tag found in ${filePath}`);
      return;
    }

    // Insert the new line before the closing head tag
    const updatedData = data.slice(0, headCloseTagIndex) + targetLine + '\n' + data.slice(headCloseTagIndex);

    await fs.writeFile(filePath, updatedData, 'utf8');
    console.log(`Updated ${filePath}`);
  } catch (err) {
    console.error(`Error processing file ${filePath}:`, err);
  }
}

async function walkDir(dir) {
  try {
    const files = await fs.readdir(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = await fs.stat(filePath);

      if (stats.isDirectory()) {
        await walkDir(filePath);
      } else if (stats.isFile() && path.basename(filePath) === 'index.html') {
        await updateHead(filePath);
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err);
  }
}

walkDir(pagesFolder);
