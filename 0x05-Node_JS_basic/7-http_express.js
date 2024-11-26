/**
 * A slightly advanced express app with precise output formatting
 */
const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 1245;
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
      printData.push(`Number of students: ${rows.length}`);

      Object.keys(fieldInfo).forEach((field) => {
        const { count, names } = fieldInfo[field];
        printData.push(`Number of students in ${field}: ${count}. List: ${names.join(', ')}`);
      });

      resolve(printData.join('\n'));
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
      const output = `This is the list of our students\n${data}`;
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', Buffer.byteLength(output));
      res.statusCode = 200;
      res.write(output);
      res.end();
    })
    .catch((error) => {
      const output = `This is the list of our students\n${error.message}`;
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', Buffer.byteLength(output));
      res.statusCode = 200;
      res.write(output);
      res.end();
    });
});

app.listen(PORT, () => {
  console.log(`Server running on localhost listening on port: ${PORT}`);
});

module.exports = app;
