import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Room Name is required"],
    maxlength: [100, "Room name must be 100 charcter long"],
  },
  pricePerNight: {
    type: Number,
    required: [true, "Room Price is required"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Room Desc is required"],
  },
  address: {
    type: String,
    required: [true, "Room Address is required"],
  },
  guestCapacity: {
    type: Number,
    required: [true, "Room guest number is required"],
  },
  numOfBeds: {
    type: Number,
    required: [true, "Room Bed number is required"],
  },
  internet: {
    type: Boolean,
    default: false,
  },
  breakfast: {
    type: Boolean,
    default: false,
  },
  ac: {
    type: Boolean,
    default: false,
  },

  petAllowed: {
    type: Boolean,
    default: false,
  },
  roomCleaning: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  images: [{ public_id: { type: String }, url: { type: String } }],
  category: {
    type: String,
    required: [true, "Room Cat is require"],
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        //   required:true
      },
      name: {
        type: String,
        //   required:true
      },
      rating: {
        type: Number,
        //   required:true
      },
      comment: {
        type: String,
        //   required:true
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    //   required:true
  },
  createdAt: {
    type: Date,
    deafult: Date.now,
  },
});

export default mongoose.models.Room || mongoose.model("Room", roomSchema);
