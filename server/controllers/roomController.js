import roomModel from "../models/roomModel";
import ErrorHandler from "../utils/ErrorHandler";
import CatchAsyncErrors from "../middlewares/CatchAsyncErrors";
import APIFeatures from "../utils/apiFeatures";

const allRooms = CatchAsyncErrors(async (req, res) => {
  const resPerPage = 4;
  const roomsCount = await roomModel.countDocuments();
  const apiFeatures = new APIFeatures(roomModel.find(), req.query)
    .search()
    .filter();

  let allrooms = await apiFeatures.query;
  // const allRooms = await roomModel.find();
  const filteredRoomsCount = allrooms.length;

  apiFeatures.pagination(resPerPage);
  allrooms = await apiFeatures.query.clone();

  res.status(200).json({
    success: true,
    roomsCount,
    resPerPage,
    filteredRoomsCount,
    allrooms,
  });
});

const createRoom = CatchAsyncErrors(async (req, res) => {
  const room = await roomModel.create(req.body);
  res.status(201).json({
    success: true,
    room,
  });
});

const getSingleRoom = CatchAsyncErrors(async (req, res, next) => {
  const room = await roomModel.findById(req.query.id);
  if (!room) {
    // res.status(404).json({
    //   success: false,
    //   message: "Room Not Found",
    // });
    next(new ErrorHandler("Room Not Found", 404));
  }
  res.status(200).json({
    succes: true,
    room,
  });
});

const updateRoom = CatchAsyncErrors(async (req, res, next) => {
  let room = await roomModel.findById(req.query.id);
  if (!room) {
    // res.status(404).json({
    //   success: false,
    //   message: "Room Not Found",
    // });
    next(new ErrorHandler("Room Not Found", 404));
  }
  room = await roomModel.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    succes: true,
    msg: "Room Updated",
    room,
  });
});

const deleteRoom = CatchAsyncErrors(async (req, res, next) => {
  const room = await roomModel.findById(req.query.id);
  if (!room) {
    // res.status(404).json({
    //   success: false,
    //   message: "Room Not Found",
    // });
    next(new ErrorHandler("Room Not Found", 404));
  }
  await room.remove();

  res.status(200).json({
    succes: true,
    message: "Room Deleted",
  });
});
export { allRooms, createRoom, getSingleRoom, updateRoom, deleteRoom };
