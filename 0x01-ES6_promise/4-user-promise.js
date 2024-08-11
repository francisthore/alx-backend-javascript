export default function signUpUser(firstName, lastName) {
  return new Promise((resolve) => {
    const resolveObject = {
      firstName,
      lastName,
    };
    resolve(resolveObject);
  });
}
