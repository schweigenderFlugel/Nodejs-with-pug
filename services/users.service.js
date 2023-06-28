const fs = require('fs');
const util = require('util');
const path = require('path');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const users = path.join(__dirname, '../public/users.json');

class UsersService {
    constructor(){ this.datafile = users }

    async getUsers() {
        const data = await readFile(this.datafile, 'utf8');
        const users = JSON.parse(data);
        return users;
    }

    async createUser(newData) {
        const data = await readFile(this.datafile, 'utf8');
        const users = JSON.parse(data); 
        const newUserId = users.length + 1;
        newData.password = await bcrypt.hash(newData.password, 10);
        newData.id = newUserId;
        users.push(newData)
        const newUser = JSON.stringify(users, null, 2);
        await writeFile(this.datafile, newUser, (error) => {
            if (error) {
                throw boom.notAcceptable('Faltan datos');
            } else {
                console.log(newData);
            }
        })
        return newData;
    }

}

module.exports = UsersService