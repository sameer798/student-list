import React, { useContext } from "react";
import StudentContext from "./store/student-context";


const StudentList = () => {
   const ctx = useContext(StudentContext);

    const deleteHandler = id =>{
        ctx.deleteItem(id)
    }

   const editHandler = id =>{
    ctx.editItem(id)
   }

  const studentList = ctx.items.map((student) => (
    <li key={student.id}>
      {student.name}-{student.mobile}-{student.address} <button onClick={editHandler.bind(null, student.id)}>edit</button>
      <button onClick={deleteHandler.bind(null, student.id)}>delete</button>
    </li>
  ));
  return (
    <div>
      <ul>{studentList}</ul>
    </div>
  );
};

export default StudentList;
