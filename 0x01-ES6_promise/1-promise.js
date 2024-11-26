// Resolves or rejects a promise
export default function getFullResponseFromAPI(success) {
  return new Promise((resolve, reject) => {
    if (success) {
      const responseObject = {
        status: 200,
        body: 'Success',
      };
      resolve(responseObject);
    } else {
      reject(new Error('The fake API is not working currently'));
    }
  });
}
