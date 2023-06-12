const { MongoClient } = require("mongodb");
const config = require("../config/config");

const client = new MongoClient(config.mongodbUri);
const database = client.db("documents");
const articles = database.collection("articles");

class ArticlesColletion {
  
  async getAllArticles() {
    const article = articles.find();
    if ((await articles.countDocuments()) === 0) {
      console.log("No documents found!");
    }
    for await (const doc of article) {
      return doc;
    }
  }

  async insertArticle(newData) {
    try {
      const doc = {
        title: newData.title,
        content: newData.content,
      };
      const result = await articles.insertOne(doc);
    } finally {
      await client.close();
    }
  }

  async updateArticle(id, changes) {
    const filter = { id: id };
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        title: changes.title,
        content: changes.content,
      },
    };
    const result = await articles.updateOne(filter, updateDoc, options);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
  }

  async deleteArticle(id) {
    try {
      const query = { id: id };
      const result = await articles.deleteOne(query);
      if (result.deletedCount === 1) {
        console.log("Successfully deleted one document.");
      } else {
        console.log("No documents matched the query. Deleted 0 documents.");
      }
    } finally {
      await client.close();
    }
  }
}

module.exports = ArticlesColletion;
