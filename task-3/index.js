import { useState } from "react";
import StudentsPicker from "../components/StudentsPicker";
import StudentsTable from "../components/StudentsTable";
import {
  fetchStudentData,
  fetchSchoolData,
  fetchLegalguardianData,
} from "../utils";

const studentsDataComponent = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [schoolsData, setSchoolsData] = useState([]);
  const [legalguardiansData, setLegalguardiansData] = useState([]);

  const onStudentsPick = async (studentIds) => {
    const studentPromises = [];
    const schoolPromises = [];
    const legalguardianPromises = [];

    for (const studentId of studentIds) {
      studentPromises.push(Promise.resolve(fetchStudentData(studentId)));
    }
    const studentData = await Promise.all(studentPromises);

    for (const student of studentData) {
      const { schoolId, legalguardianId } = student;
      schoolPromises.push(Promise.resolve(fetchSchoolData(schoolId)));
      legalguardianPromises.push(
        Promise.resolve(fetchLegalguardianData(legalguardianId))
      );
    }

    const schoolData = await Promise.all(schoolPromises);
    const legalguardianData = await Promise.all(legalguardianPromises);

    setStudentsData([...studentsData, studentData]);
    setSchoolsData([...schoolsData, schoolData]);
    setLegalguardiansData([...legalguardiansData, legalguardianData]);
  };

  return (
    <>
      <StudentsPicker onPickHandler={onStudentsPick} />
      <StudentsTable
        studentsData={studentsData}
        schoolsData={schoolsData}
        LegalguardiansData={legalguardiansData}
      />
    </>
  );
};

export default studentsDataComponent;
