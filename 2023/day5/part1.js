const fs = require('fs');
const filePath = './input.txt';

fs.readFile(filePath, 'utf-8', async (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  //this splits up the categories
  data = data.split('\n\n');
  //contains just the numerical values of the seeds
  let numSeeds = data[0].split(' ').splice(1); //length of 20
  const mappings = data
    .splice(1)
    .map((x) => x.split('\n'))
    //removes the label for the maps
    .map((array) => array.splice(1))
    //breaks each line into their respective numbers mappings[x][x] == destination range, source range start, range length
    .map((array) => array.map((x) => x.split(' ')))
    .map((array) => array.sort((a, b) => a[1] - b[1]));
  //Store convert values in each time, could overide the intiial but keeping values just in case

  //go through each seed
  for (let i = 0; i < numSeeds.length; i++) {
    //iterate through each mapping conversation per seed
    for (let h = 0; h < mappings.length; h++) {
      //check the boundary of each mapping, sorted from least to greatest
      for (let j = 0; j < mappings[h].length; j++) {
        const upperLimit = Number(
          Number(mappings[h][j][2]) + Number(mappings[h][j][1] - 1)
        );
        const lowerLimit = Number(mappings[h][j][1]);
        if (numSeeds[i] >= lowerLimit && numSeeds[i] <= upperLimit) {
          const val =
            Number(mappings[h][j][0]) +
            Number(numSeeds[i]) -
            Number(lowerLimit);
          numSeeds[i] = val;
          break;
        }
      }
    }
  }
  console.log(numSeeds);
  console.log(Math.min(...numSeeds));
});

//mapping
// destination range, source range start, range length
// destination match to source . both have a length of range length

// seed => soil => fertilizer => water => light => temperature => humidity => location
// mappings[0] => mappings[1] => mappings [2] => mappings[3] => mappings[4] => mappings[5] => mappings[6] => mappings[7]

// find min of all locations
