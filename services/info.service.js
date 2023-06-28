const fs = require('fs');
const util = require('util');
const path = require('path');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const info = path.join(__dirname, '../public/info.json');
const news = path.join(__dirname, '../public/news.json');

class InfoService {
  constructor(){ this.info = info, this.news = news }

  async getInfo() {
    const info = await readFile(this.info, 'utf8');
    return JSON.parse(info);
  }

  async getNews() {
    const data = await readFile(this.news, 'utf8');
    const news = JSON.parse(data);
    return news;
  }

  async createNews(newData) {
    const data = await readFile(this.news, 'utf8');
    const news = JSON.parse(data); 
    const newNewsId = news.length + 1;
    newData.id = newNewsId;
    news.push(newData)
    const newNews = JSON.stringify(news, null, 2);
    await writeFile(this.news, newNews, (error) => {
        if (error) {
            throw boom.notAcceptable('Faltan datos');
        } else {
            console.log(newData);
        }
    })
    return newData;
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