import { readLineToArray } from "../utils/inputReader";
import * as util from 'util';

const inputToArray = async () => {
  const input = await readLineToArray(`${__dirname}/input`);
  
  const sanitizedInput: string[] = [];
  let temporaryInput: string = '';

  for (let i = 0; i < input.length; i++) {
    if (input[i].length === 0) {
      sanitizedInput.push(temporaryInput.trim());
      temporaryInput = '';
      continue;
    }

    temporaryInput = temporaryInput.concat(" ", input[i]);
  }
  sanitizedInput.push(temporaryInput.trim());
  return sanitizedInput;
}

const getValidPassports = async() => {
  const input = await inputToArray();
  const keys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

  return input.filter(passport => {
    const passportData = passport.split(' ');
    const passportDataKeys = passportData.map(data => {
      const key = data.split(':')[0];
      return key === 'cid' ? '' : key;
    }).filter(Boolean);

    const uniquePassportDataKeys = new Set(passportDataKeys);

    return keys.length == uniquePassportDataKeys.size;
  })
}


const part1 = async () => {
  const validPassports = await getValidPassports();
  return validPassports.length;
}

const part2 = async() => {
  const input = await getValidPassports();
  const eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

  return input.filter(passport => {
    const passportData = passport.split(' ');
    const validationResults = passportData.filter(data => {
      const [key, value] = data.split(':');
      switch (key) {
        case 'byr': {
          const valueNumber = parseInt(value);
          return value.length === 4 && valueNumber >= 1920 && valueNumber <= 2002;
        }
        case 'iyr': {
          const valueNumber = parseInt(value);
          return value.length === 4 && valueNumber >= 2010 && valueNumber <= 2020;
        }
        case 'eyr': {
          const valueNumber = parseInt(value);
          return value.length === 4 && valueNumber >= 2020 && valueNumber <= 2030;
        }
        case 'hgt':
          const matches = value.match(/(\d+)(cm|in)+/)
          if (!matches) {
            return false;
          }

          const measurement = parseInt(matches[1]);
          const unit = matches[2];

          return (unit === 'cm' && measurement >= 150 && measurement <= 193) ||
            (unit === 'in' && measurement >= 59 && measurement <= 76);
        case 'hcl':
          return value.search(/#+[\d|a-f]{6}/g) !== -1
        case 'ecl':
          return eyeColors.includes(value);
        case 'pid':
          return value.length === 9 && value.search(/\d{9,9}/g) !== -1;
        case 'cid':
          return true;
      }
    });

    return passportData.length === validationResults.length;
  }).length;
};

export {
  part1,
  part2
}

