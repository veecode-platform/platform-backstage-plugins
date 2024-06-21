export function parseString(value: string) : string[] {   
       
    if(value.includes('\n')){
      const tempString = value.replace(/\\n/g, '').trim();
      const lines = tempString
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line !== '');
      return lines;
    }
    return value.match(/(?:\d+\.\s.*?)(?=\d+\.|$)/g)!;
  }