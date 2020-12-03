import * as readline from 'readline';
import { createReadStream, mkdir, readFile } from 'fs';


const getArrayFromInput = async (): Promise<number[]> => {
  const readInterface = readline.createInterface({
    input: createReadStream(__dirname+'/input'),
    output: process.stdout,
    terminal: false,
    crlfDelay: Infinity
  });
  
  let inputArray: number[] = [];
  
  for await (const line of readInterface) {
    inputArray.push(parseInt(line));
  }

  return inputArray;
}

const part1 = async() => {
  const numbers = await getArrayFromInput();
  numbers.sort((a, b) => a - b);

  const min = {
    index: 0,
    value: numbers[0]
  };
  const max = {
    index: numbers.length - 1,
    value: numbers[numbers.length - 1]
  };

  const sum = 2020;
  while(true) {
    const currentSum = min.value + max.value;
    if (currentSum == sum) {
      break;
    }

    if (currentSum < 2020) {
      min.index++;
      min.value = numbers[min.index];
    } else {
      max.index--;
      max.value  = numbers[max.index];
    }
  }

  return min.value * max.value;
}

const part2 = async() => {
  const numbers = await getArrayFromInput();
  numbers.sort((a, b) => a - b);

  const min = {
    index: 0,
    value: numbers[0]
  };
  const max = {
    index: numbers.length - 1,
    value: numbers[numbers.length - 1]
  };

  const mid = {
    index: numbers.length / 2,
    value: numbers[numbers.length / 2]
  };


  const sum = 2020;
  while(true) {
    const currentSum = min.value + max.value + mid.value;
    if (currentSum == sum) {
      break;
    }

    if (currentSum < 2020) {
      min.index++;
      min.value = numbers[min.index];
    } else {
      max.index--;
      max.value  = numbers[max.index];
    }

    if (mid.index == max.index) {
      mid.index--;
      mid.value = numbers[mid.index];
    } else if (mid.index == min.index) {
      mid.index++;
      mid.value = numbers[mid.index];
    }
  }

  return mid.value * max.value * min.value;
}





export default async() => {
  console.log(await part2());
}