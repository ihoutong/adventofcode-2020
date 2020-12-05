import { readLineToArray } from "../utils/inputReader";

const inputToArray = async () => {
  return await readLineToArray(`${__dirname}/input`);
}

const getNumTreesWithSlope = async (x: number, y: number) => {
  const input = await inputToArray();
  const position = {
    x: 0,
    y: 0
  };

  let numOfTrees = 0;
  for (let i = 0; i < input.length; i++) {
    position.x += x;
    position.y += y;

    if (!input[position.y]) {
      break;
    }

    if (position.x >= input[position.y].length) {
      position.x -= input[position.y].length;
    }

    const isTree = input[position.y][position.x] === '#';
    if (isTree) {
      numOfTrees++;
    }
  }

  return numOfTrees;
}

const part1 = async () => {
  return await getNumTreesWithSlope(3, 1);
}

const part2 = async() => {
  const oneOne = await getNumTreesWithSlope(1, 1);
  const threeOne = await getNumTreesWithSlope(3, 1);
  const fiveOne = await getNumTreesWithSlope(5, 1);
  const sevenOne = await getNumTreesWithSlope(7, 1);
  const oneTwo = await getNumTreesWithSlope(1, 2);
  
  return oneOne * threeOne * fiveOne * sevenOne * oneTwo;
}

export {
  part1,
  part2
}

