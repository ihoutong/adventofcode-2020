import {part1, part2} from './solution';


const solution = async () => {
  const part1Answer = await part1();
  const part2Answer = await part2();
  console.log(`Answer for part 1: ${part1Answer}`);
  console.log(`Answer for part 2: ${part2Answer}`);
}

solution();