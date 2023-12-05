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
  let gameStatus = false;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i][1].length; j++) {
      for (let k = 0; k < data[i][1][j].length; k++) {
        const color = Object.keys(data[i][1][j][k]);
        if (validChecks[color[0]] < data[i][1][j][k][color[0]]) {
          gameIDSum += i;
          gameStatus = true;
          //Break out of the innermost loop (k loop)
          break;
        }
      }
      if (gameStatus) {
        //Break out of j loop
        gameStatus = false;
        break;
      }
    }

    // Continue processing if the condition is not met
  }

  //   for (let i = 0; i < 1; i++) {
  //     for (let j = 0; j < 1; j++) {
  //       for (let k = 0; k < 1; k++) {
  //         const color = Object.keys(data[i][1][j][k]);
  //         console.log(color);
  //         console.log('53,', validChecks[color[0]]);
  //         console.log('54', data[i][1][j][k][color[0]]);
  //         // console.log(data[i][1][j]);
  //         // console.log(validChecks.color);
  //         // console.log(data[i][1][j][k].color);
  //         if (validChecks.color < data[i][1][j][k].color) {
  //           gameIDSum += i;
  //           break;
  //         }
  //       }
  //     }
  //   }
  console.log(gameIDSum);
});

//3413 is too high
//1637 is too low
//1972 is too low
