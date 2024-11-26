/**
 * A lit bit advance express app
 */
const express = require('express');
const fs = require('fs');

const app = express();
const port = 1245;
const FILE_PATH = process.argv.length > 2 ? process.argv[2] : '';

const countStudents = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    try {
      const rows = data.split('\n').filter((row) => row.trim() !== '');
      if (rows.length === 0) {
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
          fieldInfo[field] = { count: 0, names: [] };
        }

        fieldInfo[field].count += 1;
        fieldInfo[field].names.push(firstName);
      });

      const printData = [];
      printData.push((`Number of students: ${rows.length}`));

      Object.keys(fieldInfo).forEach((field) => {
        const { count, names } = fieldInfo[field];
        printData.push((`Number of students in ${field}: ${count}. List: ${names.join(', ')}`));
      });

      resolve(printData);
    } catch (processingError) {
      reject(new Error('Cannot load the database'));
    }
  });
});

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  countStudents(FILE_PATH)
    .then((data) => {
      const output = ['This is the list of our students', ...data].join('\n');
      res.send(output);
    })
    .catch((error) => {
      res.send(error.message);
    });
});

app.listen(port, () => {
  console.log('Server running on localhost listening on port: ', port);
});

module.exports = app;
