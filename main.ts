import * as dotenv from 'dotenv'

import * as mc from 'minecraft-protocol'

import { Info } from './src/utils/logger'
import ping from './src/events/ping'
import { existsSync } from 'fs'
import login from './src/events/login'

if (existsSync('.env')) {
  Info('Found a .env file, loading it')
  dotenv.config()
}

const server = mc.createServer({
  "online-mode": false,
  host: '0.0.0.0',
  port: 25565,
  version: '1.18.2',
  // motd: "lol"
})

// let versData = mcData('1.19.2')

server.on('listening', () => {
  Info('Honeypot listening in port %s', process.env.PORT)

  server.on('connection', ping)
  server.on('login', login)
})