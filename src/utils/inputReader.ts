import * as readline from 'readline';
import { createReadStream, mkdir, readFile } from 'fs';

const readLineToArray = async (): Promise<string[]> => {
  const readInterface = readline.createInterface({
    input: createReadStream(__dirname+'/input'),
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