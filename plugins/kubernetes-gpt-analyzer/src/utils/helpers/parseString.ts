export function parseString(value: string) : string[] {
    const tempString = value.replace(/\\n/g, '').trim();
    const lines = tempString
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line !== '');
    return lines;
  }