import React, { useContext } from 'react';
import StudentContext from './store/student-context';
import classes from './AddStudentButton.module.css'


const AddStudentButton = (props) => {
  const ctx = useContext(StudentContext);
  return (
    <div className={classes.container}>
        <h3>total Students-{ctx.totalStudents}</h3>
        <button onClick={props.onShow}>Add Students</button>
    </div>
  )
}

export default AddStudentButton