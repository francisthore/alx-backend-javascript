const fs = require('fs/promises');

const countStudents = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, { encoding: 'utf8' });
    const rows = data.split('\n').filter((row) => row.trim() !== '');

    if (rows.length === 0) {
      throw new Error('Cannot load the database');
    }

    rows.shift();

    const fieldInfo = {};
    console.log(`Number of students: ${rows.length}`);

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
  } catch (err) {
    throw new Error('Cannot load the database');
  }
};

module.exports = countStudents;
