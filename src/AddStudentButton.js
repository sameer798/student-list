import React, { useContext } from 'react';
import StudentContext from './store/student-context';


const AddStudentButton = (props) => {
  const ctx = useContext(StudentContext);
  return (
    <div>
        <h3>{ctx.totalStudents}</h3>
        <button onClick={props.onShow}>Add Students</button>
    </div>
  )
}

export default AddStudentButton