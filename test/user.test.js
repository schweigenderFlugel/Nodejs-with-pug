var assert = require('assert');
const UserModel = require('../src/database/models/users.model');

let user;

describe('Reading Details of User', () => {

    beforeEach(() => {
        // Creating a new Instance of User Model
        user = new UserModel({  username: 'facarlilalal' });
        user.save()
            .then(() => done());
    });

    it('Finds user with the username', (done) => {
        UserModel.findOne({ username: 'facarlilalal' })
            .then((user) => {
                assert(user.username === 'facarlilalal');
                done();
            });
    })
})