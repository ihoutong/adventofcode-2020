import * as readline from 'readline';
import { createReadStream, mkdir, readFile } from 'fs';

const sum = 2020;

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

  while(true) {
    const currentSum = min.value + max.value;
    if (currentSum == sum) {
      break;
    }

    if (currentSum < sum) {
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
    index: 1,
    value: numbers[1]
  };


  while(true) {
    const currentSum = min.value + max.value + mid.value;
    if (currentSum == sum) {
      break;
    }

    if (currentSum < sum) {
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

export {
  part1,
  part2
}