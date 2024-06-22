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
  let cardCount = Array(parsedData.length).fill(1);
  for (let i = 0; i < parsedData.length; i++) {
    const wins = parsedData[i][1][0].trim().split(' ');
    const numbersPos = parsedData[i][1][1]
      .trim()
      .split(' ')
      .filter((x) => x !== '');
    let winners = new Set(wins);
    let count = 0;
    for (let j = 0; j < numbersPos.length; j++) {
      //for each matching number, you get a copy of cards
      if (winners.has(numbersPos[j])) count++;
    }
    //for each copy of this card, you get additional copies of the subsequent cards
    while (count > 0) {
      if (i + count < parsedData.length) cardCount[i + count] += cardCount[i];
      count--;
    }
  }
  const totalCard = cardCount.reduce((x, y) => x + y, 0);
  console.log(totalCard);
});
