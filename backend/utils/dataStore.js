const fs = require('fs').promises;
const path = require('path');
const dataDir = path.join(__dirname, '..', 'Data');

async function readJSON(filename) {
  const file = path.join(dataDir, filename);
  try {
    const txt = await fs.readFile(file, 'utf8');
    return JSON.parse(txt || '[]');
  } catch (err) {
    if (err.code === 'ENOENT') {
      await writeJSON(filename, []);
      return [];
    }
    throw err;
  }
}

async function writeJSON(filename, data) {
  const file = path.join(dataDir, filename);
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = { readJSON, writeJSON };