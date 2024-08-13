export default function updateStudentGradeByCity(studentsArr, city, newGrades) {
  const filteredByCity = studentsArr.filter((student) => student.location === city);
  const withGrade = filteredByCity.map((student) => {
    let updatedGrade = 'N/A';
    for (const grade of newGrades) {
      if (grade.studentId === student.id) {
        updatedGrade = grade.grade;
        break;
      }
    }
    return {
      ...student,
      grade: updatedGrade,
    };
  });
  return withGrade;
}
