/**
 * Sets up basic http server
 */
const http = require('http');

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.end('Hey students');
  }
});

app.listen(1245);

module.exports = app;
