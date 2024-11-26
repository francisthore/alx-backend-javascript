import { readDatabase } from '../utils';

class StudentsController {
  /**
   * static method to get all students
   * @param {Object} req - The HTTP request object
   * @param {Object} res - The HTTP response object
   */
  static getAllStudents(req, res) {
    readDatabase(req.app.get('DB_FILE'))
      .then((data) => {
        const output = ['This is the list of our students'];
        Object.keys(data)
          .sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'}))
          .forEach((field) => {
            output.push(`Number of students in ${field}: ${data[field].length}. List: ${data[field].join(', ')}`);
          });
        res.status(200).send(output.join('\n'));
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }

  /**
   * static method to get all students by field
   * @param {Object} req - The HTTP request object
   * @param {Object} res - The HTTP response object
   */
  static getAllStudentsByMajor(req, res) {
    const { major } = req.params;
    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }
    readDatabase(req.app.get('DB_FILE'))
      .then((data) => {
        if (data[major]) {
          res.status(200).send(`List: ${data[major].join(', ')}`);
        } else {
          res.status(200).send('List: ');
        }
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }
}

export default StudentsController;
