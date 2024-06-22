const fs = require('fs');
const filePath = './input.txt';

fs.readFile(filePath, 'utf-8', async (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  const lines = data.split('\n');

  const parsedData = lines.map((line) => {
    //refers to each card parsedData[x]
    const pairs = line.split(': '); // Split by ': '
    //separates winning numbers : numbers you have parsedData[x][x]
    return pairs.map((pair) => pair.split('| ')); // Split each pair by '| '
  });

  let points = 0;
  for (let i = 0; i < parsedData.length; i++) {
    const wins = parsedData[i][1][0].trim().split(' ');
    const numbersPos = parsedData[i][1][1]
      .trim()
      .split(' ')
      .filter((x) => x !== '');
    let winners = new Set(wins);
    let count = 0;
    for (let j = 0; j < numbersPos.length; j++) {
      if (winners.has(numbersPos[j])) count++;
    }
    if (count == 1) points += 1;
    else if (count > 1) points += 2 ** (count - 1);
  }
  console.log(points);
});

//1429 too low
