// Handles a promise object
export default function handleResponseFromAPI(promise) {
  return promise
    .then(() => {
      const resultObject = {
        status: 200,
        body: 'success',
      };
      console.log('Got a response from the API');
      return resultObject;
    })
    .catch(() => new Error());
}
