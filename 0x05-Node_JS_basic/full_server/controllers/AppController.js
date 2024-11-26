class AppController {
  /**
   * Static method to handle the homepage route
   * @param {Object} req - The HTTP request object
   * @param {Object} res - The HTTP response object
   */
  static getHomepage(req, res) {
    res.status(200).send('Hello Holberton School!');
  }
}

export default AppController;
module.exports = AppController;
