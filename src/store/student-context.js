import React from "react";

const StudentContext = React.createContext({
  totalStudents: 0,
  items: [],
  addItem: (item) => {},
  deleteItem: (id) => {},
  editItem : (id)=>{}
});

export default StudentContext;
