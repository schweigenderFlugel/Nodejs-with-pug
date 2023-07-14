var assert = require('assert');
const ArticleModel = require('../src/database/models/articles.model');

describe('Reading Details of Articles', () => {
    it('Finds blocked Articles', (done) => {
        ArticleModel.find().where({ isBlocked: true })
            .then((article) => {
                assert(article.isBlocked === true);
                done();
            });
    })

    it('Create an article', () => {
        const newArticle = new ArticleModel({title: 'new Article'})
        newArticle
            .save()
            .then(() => {
                assert(!sam.isNew)
            })
            .catch(() => {
                console.log("error");
            })
    })
})