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
    /**
     * Using /\s+/ ensures that the string is split by any amount of whitespace
     * , whether it's a single space, multiple spaces, tabs, or a mix of these.
     * Spaces ( )
Tabs (\t)
Newlines (\n)
     */
    leftColumn.sort((x, y) => x - y);
    rightColumn.sort((x, y) => x - y);
    let total = 0;
    for (let i = 0; i < leftColumn.length; i++) {
      const diff = Math.abs(leftColumn[i] - rightColumn[i]);
      total += diff;
    }
    console.log(total);
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
  }
}

readInputFile();
