const mongoose = require("mongoose");
const { UserModel } = require("./connection");
const boom = require("@hapi/boom");

class UsersCollection {
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

  async updatePassword(id, changes) {
    const valid = mongoose.isValidObjectId(id)
    if (valid) {
      await UserModel.findOneAndUpdate({
        id, 
        password: changes.password 
      });
      return 'password updated'
    }
  }

  async refreshToken(email, refreshToken) {
    await UserModel.findOneAndUpdate({
      email, 
      refreshToken: refreshToken, 
    });
  }

}

module.exports = UsersCollection;
