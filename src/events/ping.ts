import { Client } from "minecraft-protocol";
import { Info } from "../utils/logger";

export default function (c: Client) {
  Info('Got a ping from %s', c.socket.remoteAddress)
  // console.log(c)
}