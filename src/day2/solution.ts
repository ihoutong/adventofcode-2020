import { readLineToArray } from "../utils/inputReader";

const inputToArray = async () => {
  const inputArr = await readLineToArray(`${__dirname}/input`);
  return inputArr.map(value => {
    const found = value.match(/(\d+)-(\d+) (\w)[^\w]+(\w+)/)!
    return {
      min: parseInt(found[1]),
      max: parseInt(found[2]),
      letter: found[3],
      string: found[4]
    }
  });
}

const part1 = async () => {
  const input = await inputToArray();
  return input.map(obj => {
    const {min, max, letter, string} = obj;

    const regExp = new RegExp(`[${letter}]+`, 'g');
    const matches = string.match(regExp)
    if (matches === null) {
      return false;
    }

    const lettersFound = matches.join('').length
    return lettersFound >= min && lettersFound <= max;
  }).filter(Boolean).length;
}

const part2 = async() => {
  const input = await inputToArray();

  return input.map(obj => {
    const {min, max, letter, string} = obj;

    const firstLetter = string[min - 1];
    const secondLetter = string[max - 1];
    
    return (firstLetter === letter || secondLetter === letter) && firstLetter !== secondLetter;
  }).filter(Boolean).length;
}

export {
  part1,
  part2
}

