/**
 * Program that asks for user input and displays it
 */
console.log('Welcome to Holberton School, what is your name?');
process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
  const userName = process.stdin.read();
  if (userName !== null) {
    console.log('Your name is:', userName.trim());
  }
});

process.on('exit', () => console.log('This important software is now closing'));
