import readDatabase from '../utils';

const VALID_MAJORS = ['CS', 'SWE'];

class StudentsController {
  static getAllStudents(req, res) {
    const filePath = process.argv.length > 2 ? process.argv[2] : '';
    readDatabase(filePath)
      .then((data) => {
        const output = ['This is the list of our students'];
        Object.keys(data)
          .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
          .forEach((field) => {
            output.push(`Number of students in ${field}: ${data[field].length}. List: ${data[field].join(', ')}`);
          });
        res.status(200).send(output.join('\n'));
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(req, res) {
    const { major } = req.params;
    const filePath = process.argv.length > 2 ? process.argv[2] : '';
    if (!VALID_MAJORS.includes(major)) {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }
    readDatabase(filePath)
      .then((data) => {
        const students = data[major] || [];
        res.status(200).send(`List: ${students.join(', ')}`);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Cannot load the database');
      });
  }
}

export default StudentsController;
module.exports = StudentsController;
