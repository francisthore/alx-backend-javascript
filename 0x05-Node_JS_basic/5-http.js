/**
 * Sets up a basic HTTP server with improved modularity and error handling.
 */
const http = require('http');
const fs = require('fs');

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
          fieldInfo[field] = { count: 0, names: [] };
        }

        fieldInfo[field].count += 1;
        fieldInfo[field].names.push(firstName);
      });

      const report = [];
      report.push(`Number of students: ${rows.length}`);

      Object.keys(fieldInfo).forEach((field) => {
        const { count, names } = fieldInfo[field];
        report.push(`Number of students in ${field}: ${count}. List: ${names.join(', ')}`);
      });

      resolve(report.join('\n'));
    } catch (processingError) {
      reject(new Error('Cannot load the database'));
    }
  });
});

const app = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  try {
    if (req.url === '/') {
      res.statusCode = 200;
      res.end('Hello Holberton School!');
    } else if (req.url === '/students') {
      const studentData = await countStudents(FILE_PATH);
      const output = `This is the list of our students\n${studentData}`;
      res.statusCode = 200;
      res.end(output);
    } else {
      res.statusCode = 404;
      res.end('Not Found');
    }
  } catch (error) {
    res.statusCode = 500;
    res.end(`Error: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
