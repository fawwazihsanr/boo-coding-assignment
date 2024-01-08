const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server-core");

let mongo = null;
 
const connectDB = async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
 
  await mongoose.connect(uri, {
  });
};

const dropDB = async () => {
    if (mongo) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      await mongo.stop();
    }
  };


  module.exports = { connectDB, dropDB}