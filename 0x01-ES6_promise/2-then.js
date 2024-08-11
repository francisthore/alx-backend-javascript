// Handles a promise object
export default function handleResponseFromAPI(promise) {
  promise.then(
    (result) => {
      const resultObject = {
        status: 200,
        body: 'Success',
      };
      console.log('Got a response from the API');
      return resultObject;
    },
    (error) => {
      return {};
    }
  );
}
