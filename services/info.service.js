const fs = require("fs");
const util = require("util");
const path = require("path");
const boom = require("@hapi/boom");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const info = path.join(__dirname, "../public/info.json");
const news = path.join(__dirname, "../public/news.json");

class InfoService {
  constructor() {
    (this.info = info), (this.news = news);
  }

  async getInfo() {
    const info = await readFile(this.info, "utf8");
    return JSON.parse(info);
  }

  async getNews() {
    const data = await readFile(this.news, "utf8");
    const news = JSON.parse(data);
    return news;
  }

  async getNewsById(id) {
    const data = await readFile(this.news, "utf8");
    const news = JSON.parse(data);
    return news[id];
  }

  async createNews(newData) {
    const data = await readFile(this.news, "utf8");
    const news = JSON.parse(data);
    const newNewsId = news.length + 1;
    newData.id = newNewsId;
    news.push(newData);
    const newNews = JSON.stringify(news, null, 2);
    await writeFile(this.news, newNews, (error) => {
      if (error) {
        throw new Error(
          boom.notFound("Ha ocurrido un error al escribir el archivo")
        );
      }
    });
    return newData;
  }

  async updateNews(id, changes) {
    const data = await readFile(this.news, "utf8");
    const news = JSON.parse(data);
    news.forEach((item) => {
      if (item.id == id) {
        if (changes.noticia != undefined) {
          item.noticia = changes.noticia;
        }
        if (changes.images != undefined) {
          item.images = changes.images;
        }
        const newNews = JSON.stringify(news, null, 2);
        writeFile(this.news, newNews, (error) => {
          if (error) {
            throw new Error(
              boom.notFound("Ha ocurrido un error al escribir el archivo")
            );
          }
        });
      }
    });
    return changes;
  }

  async deleteNews(id) {
    const data = await readFile(this.news, "utf8");
    const news = JSON.parse(data);
    news.forEach((item) => {
      if (item.id == id) {
        news.splice(news.indexOf(item), 1);
      }
      const deletedNews = JSON.stringify(news, null, 2);
        writeFile(this.news, deletedNews, (error) => {
          if (error) {
            throw new Error(
              boom.notFound("Ha ocurrido un error al escribir el archivo")
            );
          }
        })
    });
    return 'erased';
  }

}

module.exports = InfoService;
