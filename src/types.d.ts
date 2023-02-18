export const a  = {}

interface Skid {
  UUID: string
  Username: string

  IPAddress: string
}

declare global {
  //* Defining env variables
  namespace NodeJS {
    interface ProcessEnv {
      DEBUG: boolean

      PORT: number
    }
  }
}
