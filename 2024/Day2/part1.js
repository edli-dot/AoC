// one report per line
//levels separate3d by spaces

//safe if all increasing or all decreasing
//if first is less than second. toggle will be forincreasing only

//number of safe reprts
const fs = require('fs').promises; // Import the File System module

async function readInputFile() {
  const filePath = './Day2/input.txt'; // Path to your file
  try {
    let data = await fs.readFile(filePath, 'utf-8');
    const splitByRow = data
      .trim()
      .split('\n')
      .map((line) => line.trim().split(/\s+/).map(Number));
    let total = 0;
    for (let i = 0; i < splitByRow.length; i++) {
      let toggle = splitByRow[i][0] < splitByRow[i][1];
      let status = true;
      for (let j = 0; j < splitByRow[i].length - 1; j++) {
        if (Math.abs(splitByRow[i][j] - splitByRow[i][j + 1]) > 3) {
          status = false;
          break;
        }
        if (toggle == false) {
          if (splitByRow[i][j] <= splitByRow[i][j + 1]) {
            status = false;
            break;
          }
        } else if (toggle == true) {
          if (splitByRow[i][j] >= splitByRow[i][j + 1]) {
            status = false;
            break;
          }
        }
      }
      status == false ? total : (total += 1);
    }
    console.log(total);
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
  }
}

readInputFile();
