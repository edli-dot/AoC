const fs = require('fs');
const filePath = './input.txt';

fs.readFile(filePath, 'utf-8', async (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  data = data.split('\n').map((pair) => pair.split(': '));
  for (let i = 0; i < data.length; i++) {
    data[i][1] = data[i][1].split(';');
    for (let j = 0; j < data[i][1].length; j++) {
      data[i][1][j] = data[i][1][j].split(',').map((pair) => {
        const [color, number] = pair.trim().split(' ').reverse();
        return { [color]: parseInt(number, 10) };
      });
    }
  }
  //   console.log(data[1]);

  const validChecks = {
    red: 12,
    green: 13,
    blue: 14,
  };
  let gameIDSum = 0;
  //data [line] => [game 11], [[blue: 1 , red: 1 , green: 1], [blue;1 , red: 1, green: 1]]
  for (let i = 0; i < data.length; i++) {
    //goes through each line
    let gameStatus = false;
    for (let j = 0; j < data[i][1].length; j++) {
      //iterate through each wdra
      let blueB = 0;
      let redB = 0;
      let greenB = 0;
      for (let k = 0; k < data[i][1][j].length; k++) {
        //iterate through each color of the draw
        let color = Object.keys(data[i][1][j][k])[0];
        // console.log(color, color[0], data[i][1][j].length);
        switch (color) {
          case 'blue':
            blueB += data[i][1][j][k][color];
            break;
          case 'red':
            redB += data[i][1][j][k][color];
            break;
          default:
            greenB += data[i][1][j][k][color];
            break;
        }
      }
      if (
        blueB > validChecks['blue'] ||
        redB > validChecks['red'] ||
        greenB > validChecks['green']
      ) {
        //gameIDSum += i;
        gameStatus = true;
        //Break out of the innermost loop (k loop)
        break;
      }
    }
    if (gameStatus == false) gameIDSum += i + 1;
  }

  console.log(gameIDSum);
});

//3413 is too high
//1637 is too low
//1972 is too low
