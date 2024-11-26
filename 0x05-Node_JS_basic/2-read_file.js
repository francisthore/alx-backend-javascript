/**
 * Opens a csv and reads
 */
const fs = require('fs');

const countStudents = (filePath) => {
  if (!fs.existsSync(filePath)) {
    throw new Error('Cannot load the database');
  }
  if (!fs.statSync(filePath).isFile()) {
    throw new Error('Cannot load the database');
  }
  try {
    const fieldInfo = {};
    const data = fs.readFileSync(filePath, { encoding: 'utf8' });
    const rows = data.split('\n').filter((row) => row.trim() !== '');
    rows.shift();
    const totalStudents = rows.length;
    console.log('Number of students:', totalStudents);
    rows.forEach((row) => {
      const [firstName, , , field] = row.split(',');

      if (!fieldInfo[field]) {
        fieldInfo[field] = {
          count: 0,
          names: [],
        };
      }
      fieldInfo[field].count += 1;
      fieldInfo[field].names.push(firstName);
    });

    Object.keys(fieldInfo).forEach((field) => {
      const { count, names } = fieldInfo[field];
      console.log(`Number of students in ${field}: ${count}. List: ${names.join(', ')}`);
    });
  } catch (err) {
    throw new Error('Cannot load the database');
  }
};

module.exports = countStudents;
