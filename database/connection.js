var { MongoClient } = require("mongodb");
const config = require("../config/config");

const client = new MongoClient(config.mongodbUri);

class ArticlesColletion {
  async insertArticle(newData) {
    try {
      const database = client.db("documents");
      const haiku = database.collection("articles");
      const doc = {
        title: newData.title,
        content: newData.content,
      };
      const result = await haiku.insertOne(doc);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
      await client.close();
    }
  }

  async updateArticle() {
    try {
      const database = client.db("documents");
      const movies = database.collection("articles");
      const filter = { title: "Random Harvest" };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          plot: `A harvest of random numbers, such as: ${Math.random()}`
        },
      };
      const result = await movies.updateOne(filter, updateDoc, options);
      console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
      );
    } finally {
      await client.close();
    }
  }
}

module.exports = ArticlesColletion;
