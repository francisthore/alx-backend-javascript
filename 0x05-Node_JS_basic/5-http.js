/**
 * Sets up basic http server
 */
const http = require('http');
const fs = require('fs');

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

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    countStudents(FILE_PATH)
      .then((data) => {
        res.write('This is the list of our students\n');
        data.forEach((sentence) => {
          res.write(`${sentence}\n`);
        });
        res.end();
      })
      .catch((err) => {
        res.statusCode = 500;
        res.end(err.message);
      });
  }
});

app.listen(1245);

module.exports = app;
