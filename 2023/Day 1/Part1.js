//The newly-improved calibration document consists of lines of text;
//each line originally contained a specific calibration value that the Elves now need to recover.
//On each line, the calibration value can be found by combining the first digit and the last digit (in that order)
// to form a single two-digit number.

//3six7 => 37 should remove all letters in between

//only first and last digit - pop and shift each index until a number is reached

const fs = require('fs');
const filePath = './input.txt';
const inputValues = [];

const validEntries = {
  0: true,
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true,
};

// Read the content of the file asynchronously
fs.readFile(filePath, 'utf-8', async (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  //Fetch data but only the numbers within each line
  let word = '';
  for (let i = 0; i < data.length; i++) {
    //Edge Case: Last line doesn't have a newline
    if (data[i] === `\n` || i === data.length - 1) {
      inputValues.push(word);
      word = '';
    } else if (validEntries[data[i]]) {
      word += data[i];
    }
  }

  //   Reduce function that adds up the two or single digit number in each line
  const summedConfigs = inputValues.reduce((sum, current) => {
    if (current.length === 1) {
      //Edge Case: If a single digit, treat it as first and last digit
      sum += Number(current.concat(current));
    } else {
      let numberAsAString = current[0].concat(current[current.length - 1]);
      sum += Number(numberAsAString);
    }
    return sum;
  }, 0);
  console.log(summedConfigs);
});

//Answer was 54952
