import { uploadPhoto, createUser } from './utils';

export default function handleProfileSignup() {
  const promise = Promise.all([uploadPhoto(), createUser()]);
  promise
    .then((res) => {
      console.log(`${res[0].body} ${res[1].firstName} ${res[1].lastName}`);
    });
}
