export default function getListStudentIds(arr) {
  if (!Array.isArray(arr)) {
    return [];
  }
  const studentIDs = arr.map((student) => student.id);
  return studentIDs;
}
