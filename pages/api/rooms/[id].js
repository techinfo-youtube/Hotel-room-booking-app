import nc from "next-connect";
import onError from "../../../server/middlewares/errors";
import {
  getSingleRoom,
  updateRoom,
  deleteRoom,
} from "../../../server/controllers/roomController";
import connectDb from "../../../server/config/config";
const handler = nc({ onError });
connectDb();

//GET - single room
handler.get(getSingleRoom);
//PUT - update room
handler.put(updateRoom);
//DELETE - delete Room
handler.delete(deleteRoom);

export default handler;
