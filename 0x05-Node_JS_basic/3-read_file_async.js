const fs = require('fs');

const countStudents = (filePath) => {
  return new Promise((resolve, reject) => {
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
        console.log(`Number of students: ${rows.length}`);

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

        Object.keys(fieldInfo).forEach((field) => {
          const { count, names } = fieldInfo[field];
          console.log(`Number of students in ${field}: ${count}. List: ${names.join(', ')}`);
        });

        resolve(true);
      } catch (processingError) {
        reject(new Error('Cannot load the database'));
      }
    });
  });
};

module.exports = countStudents;
