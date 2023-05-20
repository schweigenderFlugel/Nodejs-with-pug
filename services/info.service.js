const fs = require('fs');
const util = require('util');
const path = require('path');

const readFile = util.promisify(fs.readFile);
const info = path.join(__dirname, '../data/data.json');

class InfoService {
  constructor(){
    this.datafile = info;
  }

  async getInfo() {
    const info = await readFile(this.datafile, 'utf8');
    return JSON.parse(info).info;
  }
}

module.exports = InfoService;