export default function getStudentsByLocation(arr, city) {
  if (!Array.isArray(arr)) {
    return [];
  }
  if (typeof city !== 'string') {
    throw new TypeError('City must be a string');
  }
  const filteredStudentsByLocation = arr.filter((student) => student.location === city);
  return filteredStudentsByLocation;
}
