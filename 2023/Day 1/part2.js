const fs = require('fs');
const filePath = './input.txt';
const inputValues = [];

const validEntries = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
};

//in ES6 order of properties of an object are guarenteed in the order
//have to prioritize words that would cause an overlap
//nineight => 9 as long as nine listed before eight
const validStrings = {
  seven: 7,
  nine: 9,
  five: 5,
  four: 4,
  six: 6,
  one: 1,
  eight: 8,
  three: 3,
  two: 2,
};

// Read the content of the file asynchronously
fs.readFile(filePath, 'utf-8', async (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  //Edit data so that if there is a matching key, replace it with the value
  Object.keys(validStrings).forEach((key) => {
    data = data.split(key).join(validStrings[key]);
  });

  //Took same logic of only taking valid numbers in the string
  let word = '';
  for (let i = 0; i < data.length; i++) {
    if (data[i] === `\n` || i === data.length - 1) {
      inputValues.push(word);
      word = '';
    } else if (validEntries[data[i]]) {
      word += data[i];
    }
  }
  console.log(inputValues);

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

//Answer is 53409 ... is incorrect
//too low

//53465 is wrong as well
//53829 is wrong as well

//54385 is too high
//All lines in
//Accurate length
