import nc from "next-connect";
import onError from "../../../server/middlewares/errors";
import {
  allRooms,
  createRoom,
} from "../../../server/controllers/roomController";
import connectDb from "../../../server/config/config";
const handler = nc({ onError });
connectDb();
handler.get(allRooms);

//Method: POST -- creating new room
handler.post(createRoom);
export default handler;
