interface Student {
  firstName: string,
  lastName: string;
  age: number,
  location: string
}

const student1: Student = {
  firstName: 'testign',
  lastName: 'Mamba',
  age: 23,
  location: 'California'
}

const student2: Student = {
  firstName: 'yerr',
  lastName: 'Mamba Jr',
  age: 5,
  location: 'California West'
}

const studentsList: Student[] = [student1, student2];

const renderTable = () => {
  const tbl = document.createElement('table');
  document.body.appendChild(tbl);

  studentsList.forEach((student) => {
    const row = tbl.insertRow();

    const firstNameCell = row.insertCell(0);
    const locationCell = row.insertCell(1);

    firstNameCell.textContent = student.firstName;
    locationCell.textContent = student.location;
  });
};

renderTable()
