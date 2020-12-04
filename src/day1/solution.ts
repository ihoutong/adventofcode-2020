import { readLineToArray } from "../utils/inputReader";


const inputToNumArray = async () => {
  const numArray = await readLineToArray(`${__dirname}/input`);
  return numArray.map(value => parseInt(value));
}

const sum = 2020;

const part1 = async() => {
  const numbers = await inputToNumArray();
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
  const numbers = await inputToNumArray();
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