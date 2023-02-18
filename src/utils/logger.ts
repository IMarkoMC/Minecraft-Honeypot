// code is shit

import chalk from 'chalk'
import moment from 'moment'

import { appendFile, renameSync, existsSync, mkdirSync } from 'fs'
import { removeColors } from './utils'

if (!existsSync(process.cwd() + '/Logs')) {
  mkdirSync(process.cwd() + '/Logs')
}

function isError (val: any): boolean {
  return (typeof val === 'object') && ((Object.prototype.toString.call(val) === '[object Error]') || (typeof val.message === 'string' && typeof val.name === 'string'))
}

function parseLogString (string: string, args: any): string {
  if (string.split(/%s/g).length !== 0) {
    string.split(/%s/g).forEach((_, i) => {
      if (isError(args[i])) {
        string = string.replace(/%s/g, `${args[i].message as string}\n${args[i].stack as string}`)
      } else if (typeof args[i] === 'object') {
        string = string.replace('%s', chalk.cyan(JSON.stringify(args[i])))
      } else string = string.replace('%s', args[i])
    })
  }
  return string
}

/** Returs the current date in  DD/MM/YY hh:mm:ss A format */
function getDateFromatted (): string {
  return moment(Date.now()).format('DD/MM/YY hh:mm:ss A')
}

function write (data: string): void {
  if (data != null) {
    //! Fuck the colors lol
    data = removeColors(data)

    appendFile(process.cwd() + '/Logs/Latest.log', data + '\n', (err) => {
      if (err !== null) {
        console.log(err)
      }
    })
  }
}

export function writeStack (err: Error): void {
  if (err.stack != null) {
    appendFile(process.cwd() + '/Logs/Latest.log', err.stack + '\n', (err) => {
      if (err !== null) {
        console.log(err)
      }
    })
  }
}

export function Info (str: string, ...args: any): void {
  const string = `[${chalk.cyan(getDateFromatted())} ${chalk.green('INFO')}]  ${parseLogString(str, args)}`
  console.log(string)

  write(string)
}

export function Debug (str: string, ...args: any): void {
  if (!process.env.DEBUG) {
    return
  }

  const string = `[${chalk.cyan(getDateFromatted())} ${chalk.magenta('DEBUG')}]  ${parseLogString(str, args)}`
  console.log(string)

  write(string)
}

export function Warn (str: string, ...args: any): void {
  const string = `[${chalk.cyan(getDateFromatted())} ${chalk.yellow('WARN')}]  ${parseLogString(str, args)}`
  console.log(string)

  write(string)
}

export function Error (str: string, ...args: any): void {
  const string = `[${chalk.cyan(getDateFromatted())} ${chalk.red('ERROR')}]  ${parseLogString(str, args)}`
  console.log(string)

  write(string)
}

export function renameAndExit (): void {
  try {
    renameSync(process.cwd() + '/Logs/Latest.log', process.cwd() + `/Logs/Log-${Date.now()}.log`)
    process.exit(0)
  } catch (ex) {
    //* On error print the error and exit
    console.log(ex)
    process.exit(0)
  }
}
