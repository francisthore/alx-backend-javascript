import fs from 'fs';

/**
 * Utility function to read and parse a CSV file
 * @param {string} filePath - Path to the CSV file
 * @returns {Promise<Object>} - A promise that resolves with an object of
 * arrays of first names per field
 */
const readDatabase = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    try {
      const rows = data.split('\n').filter((row) => row.trim() !== '');
      if (rows.length <= 1) {
        reject(new Error('Cannot load the database'));
        return;
      }

      rows.shift();

      const fieldInfo = {};

      rows.forEach((row) => {
        const columns = row.split(',');
        if (columns.length < 4 || !columns[0] || !columns[3]) {
          return;
        }

        const [firstName, , , field] = columns;

        if (!fieldInfo[field]) {
          fieldInfo[field] = [];
        }

        fieldInfo[field].push(firstName);
      });

      resolve(fieldInfo);
    } catch (parsingError) {
      reject(new Error('Cannot load the database'));
    }
  });
});

export default readDatabase;
