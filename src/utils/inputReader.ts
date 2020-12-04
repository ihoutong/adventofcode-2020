import * as readline from 'readline';
import { createReadStream } from 'fs';

const readLineToArray = async (file: string): Promise<string[]> => {
  const readInterface = readline.createInterface({
    input: createReadStream(file),
    output: process.stdout,
    terminal: false,
    crlfDelay: Infinity
  });
  
  let inputArray: string[] = [];
  
  for await (const line of readInterface) {
    inputArray.push(line);
  }

  return inputArray;
}

export {
  readLineToArray
}