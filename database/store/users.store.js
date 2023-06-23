const mongoose = require("mongoose");
const { UserModel } = require("./connection");
const boom = require("@hapi/boom");

class UsersCollection {
  async findUserByEmail(email) {
    const valid = mongoose.isValidObjectId(email);
    if (valid) {
      const user = await UserModel.find();
      return user;
    }
  }

  async createUser(newData) {
    try {
      const newUser = await UserModel.create(newData);
      return newUser;
    } catch (error) {
      throw boom.unauthorized(error);
    }
  }
}

module.exports = UsersCollection;
