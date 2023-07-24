const mongoose = require("mongoose");
const { UserModel } = require("./connection");
const boom = require("@hapi/boom");

class UsersCollection {
  async findUserByEmail(email) {
      const user = await UserModel.findOne({ email: email });
      return user;
  }

  async findUserByEmail(email) {
    const user = await UserModel.findOne({ email: email });
    return user;
}

  async findUserByRefreshToken(refreshToken) {
    const users = await UserModel.findOne({ refreshToken });
    return users;
  }

  async createUser(newData) {
    try {
      await UserModel.create(newData);
      return 'User created successfully';
    } catch (error) {
      throw boom.conflict(error);
    }
  }

  async updatePassword(id, password) {
    const valid = mongoose.isValidObjectId(id)
    if (valid) {
      await UserModel.findOneAndUpdate({
        id, 
        password
      });
      return 'password updated'
    }
  }

  async refreshToken(email, refreshToken) {
    await UserModel.findOneAndUpdate({
      email, 
      refreshToken, 
    });
  }

  async recoveryToken(id, recoveryToken) {
    await UserModel.findOneAndUpdate({
      id, 
      recoveryToken, 
    });
  }
}

module.exports = UsersCollection;
