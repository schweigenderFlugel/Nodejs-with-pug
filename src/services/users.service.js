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
  async findUserByRefreshToken(refreshToken) {
    const users = await collection.findUserByRefreshToken(refreshToken);
    if (!users) {
      throw boom.notFound("User Not Found!");
    }
    return users;
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

  async createUser(newData) {
    newData.password = await bcrypt.hash(newData.password, 10);
    const newUser = await collection.createUser(newData);
    return newUser;
  }

  async saveRefreshToken(email, refreshToken) {
    await collection.refreshToken(email, refreshToken)
  }
}

module.exports = UsersService;
