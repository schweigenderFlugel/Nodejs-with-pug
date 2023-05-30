const fs = require('fs');
const util = require('util');
const path = require('path');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const info = path.join(__dirname, '../public/info.json');

class InfoService {
  constructor(){ this.datafile = info }

  async getInfo() {
    const info = await readFile(this.datafile, 'utf8');
    return JSON.parse(info);
  }

  async updateInfo(id, body) {
    const info = await readFile(this.datafile, 'utf8');
    const data = JSON.parse(info);
    if (data.id === id) {
      const newInfo = JSON.stringify(body); 
      // fs.writeFile( file, data, options, callback )
      await writeFile(this.datafile, newInfo);
      return newInfo;
    }
}
}

module.exports = InfoService;