const mongoose = require("mongoose");
const { UserModel } = require("./connection");
const boom = require("@hapi/boom");

class UsersCollection {
  async findUserByEmail(email) {
      const user = await UserModel.findOne({ email: email });
      return user;
  }

  async createUser(newData) {
    try {
      const newUser = await UserModel.create(newData);
      return 'User created successfully';
    } catch (error) {
      throw boom.unauthorized(error);
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

}

module.exports = UsersCollection;
