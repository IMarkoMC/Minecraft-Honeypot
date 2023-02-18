// code is shit

/** Removes all the colors from the string using a cursed regex */
export function removeColors (string: string): string {
  // eslint-disable-next-line no-control-regex
  return string.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '')
}

export function isNullOrEmpty (value: any): boolean {
  if (value == null) {
    return true
  }

  if (typeof value !== 'string' || value.length === 0) {
    return true
  }
  return false
}
