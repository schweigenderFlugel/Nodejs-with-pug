const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");

const UsersCollection = require('./../database/store/users.store')

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
    const hash = await bcrypt.hash(changes, 10);
    const updatedPassword = await collection.updatePassword(id, hash);
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

  async saveRecoveryToken(id, recoveryToken) {
    await collection.recoveryToken(id, recoveryToken)
  }
}

module.exports = UsersService;
