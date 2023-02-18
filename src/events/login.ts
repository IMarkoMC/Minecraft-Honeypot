import { Client } from "minecraft-protocol";
import { Info, Error } from "../utils/logger";

import MCData from 'minecraft-data'

const mcData = MCData('1.18.2')

export default function (c: Client) {
  c.on('error', (err: Error) => {
    Error("Client error %s", err)
  })

  c.on('chat', (msg: any) => {
    Info('%s: %s', c.username, msg.message)
  })

  c.on('end', () => {
    Info('%s disconnected', c.username)
  })

  Info('%s (%s) connected from %s!', c.username, c.uuid, c.socket.remoteAddress)

  c.write('login', {
    "entityId": 727,
    "gameMode": 1,
    "isHardcore": false,
    "previousGameMode": -1,
    "worldNames": [
      "minecraft:overworld",
      "minecraft:the_nether",
      "minecraft:the_end"
    ],
    "dimensionCodec": mcData.loginPacket.dimensionCodec,
    "dimension": mcData.loginPacket.dimension,
    "worldName": 'minecraft:overworld',
    "hashedSeed": 1756286002130175704,
    "maxPlayers": 20,
    "viewDistance": 12,
    "simulationDistance": 8,
    "reducedDebugInfo": true,
    "enableRespawnScreen": true,
    "isDebug": false,
    "isFlat": false
  })

  let msg = {
    color: 'gray',
    translate: 'multiplayer.player.joined',
    with: [
      { insertion: c.username, text: c.username },
    ]
  }

  c.write('chat', { message: JSON.stringify(msg), position: 0, sender: '0' });

  //* Spawh a block in 0 0

  c.write('block_change', {
    "location": {
      "x": 0,
      "z": 0,
      "y": 1
    },
    "type": 1
  })
}
