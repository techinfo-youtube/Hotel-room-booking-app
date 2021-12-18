const mongoose = require("mongoose");
const rooms = require("../data/rooms");
const roomModel = require("../models/roomModel");
const connectDB = require("../config/config");

connectDB();

const seedRooms = async () => {
  try {
    await roomModel.deleteMany();
    console.log("ALl Rooms Deleted");
    await roomModel.insertMany(rooms);
    console.log("ALl ROoms Added");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedRooms();
