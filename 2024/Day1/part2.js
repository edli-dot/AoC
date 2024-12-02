const fs = require('fs').promises; // Import the File System module

async function readInputFile() {
  const filePath = './input'; // Path to your file
  try {
    let data = await fs.readFile(filePath, 'utf-8');
    const [leftColumn, rightColumn] = data
      .trim() // Remove leading/trailing whitespace
      .split('\n') // Split into rows by line breaks
      .reduce(
        (columns, row) => {
          const [left, right] = row.trim().split(/\s+/); // Split row and destructure into left and right
          columns[0].push(Number(left)); // Add left value to the leftColumn
          columns[1].push(Number(right)); // Add right value to the rightColumn
          return columns;
        },
        [[], []] // Initialize leftColumn and rightColumn arrays
      );
    let total = 0;
    let cache = {};
    for (let i = 0; i < rightColumn.length; i++) {
      cache[rightColumn[i]] = (cache[rightColumn[i]] || 0) + 1;
    }
    for (let i = 0; i < leftColumn.length; i++) {
      if (cache[leftColumn[i]]) {
        total += leftColumn[i] * cache[leftColumn[i]];
      }
    }
    console.log(total);
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
  }
}

readInputFile();
