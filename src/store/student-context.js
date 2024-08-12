import React from "react";

const StudentContext = React.createContext({
  totalStudents: 0,
  items: [],
  addItem: (item) => {},
  deleteItem: (id) => {},
  editItem : (id)=>{},
  studentToEdit : null
});

export default StudentContext;
