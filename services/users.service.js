const fs = require("fs");
const util = require("util");
const path = require("path");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");

const UsersCollection = require('./../database/store/users.store')

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const users = path.join(__dirname, "../public/json/users.json");
const collection = new UsersCollection()

class UsersService {
  constructor() {
    this.datafile = users;
  }

  async createUser(newData) {
    const data = await readFile(this.datafile, "utf8");
    const users = JSON.parse(data);
    const newUserId = users.length + 1;
    newData.password = await bcrypt.hash(newData.password, 10);
    newData.id = newUserId;
    users.push(newData);
    const newUser = JSON.stringify(users, null, 2);
    await writeFile(this.datafile, newUser, (error) => {
      if (error) {
        throw boom.notAcceptable("Faltan datos");
      } else {
        console.log(newData);
      }
    });
    return newData;
  }

  async getUserByEmail(email) {
    const user = await collection.findUserByEmail(email);
    if (!user) {
      throw boom.notFound("User Not Found!");
    }
    return user;
  }

  async updatePassword(id, changes) {
    changes.password = await bcrypt.hash(changes.password, 10);
    const updatedPassword = await collection.updatePassword(id, changes);
    if (!updatedPassword) {
      throw boom.unauthorized('An error just happened!');
    }
    return updatedPassword;
  }

  async createUsersInMongodb(newData) {
    newData.password = await bcrypt.hash(newData.password, 10);
    const newUser = await collection.createUser(newData);
    return newUser;
  }
}

module.exports = UsersService;
