import React, { useEffect, useReducer } from "react";
import StudentContext from "./student-context";

const studentReducer = (state, action) => {
  if (action.type === "ADD") {
    const updateTotalStudents = state.totalStudents + 1;
    const udateStudents = state.items.concat(action.item);
    return {
      ...state,
      items: udateStudents,
      totalStudents: updateTotalStudents,
    };
  }
  if (action.type === "DELETE") {
    const existingStudentIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingStudent = state.items[existingStudentIndex];
    let updatedStudents;
    if (existingStudent.id === action.id) {
      updatedStudents = state.items.filter((item) => item.id !== action.id);
    }
    return {
      ...state,
      items: updatedStudents,
      totalStudents: state.totalStudents - 1,
    };
  }
  if (action.type === "EDIT") {
    const existingStudent = state.items.find((item) => item.id === action.id);
    return {
      ...state,
      studentToEdit: existingStudent,
    };
  }
  if (action.type === "SET_STUDENTS") {
    return {
      ...state,
      items: action.items,
      totalStudents: action.items.length,
    };
  }
  return state;
};

const StudentProvider = (props) => {
  const [studentState, dispatchSudentState] = useReducer(studentReducer, {
    items: [],
    totalStudents: 0,
    studentToEdit : null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://crudcrud.com/api/dafb95d2ecc8484ab657274713e9bbfd/students');
        const data = await response.json();
        
        // Dispatch the fetched data to the reducer
        dispatchSudentState({ type: "SET_STUDENTS", items: data });
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  const addStudentHander = (item) => {
    dispatchSudentState({ type: "ADD", item: item });
  };

  const deleteSudentHandler = (id) => {
    dispatchSudentState({ type: "DELETE", id: id });
  };

  const editStudentHandler = (id) => {
    dispatchSudentState({ type: "EDIT", id: id });
    props.onShow();
    studentContext.deleteItem(id);
  };

  const studentContext = {
    totalStudents: studentState.totalStudents,
    items: studentState.items,
    addItem: addStudentHander,
    deleteItem: deleteSudentHandler,
    editItem: editStudentHandler,
    studentToEdit: studentState.studentToEdit,
  };
  return (
    <StudentContext.Provider value={studentContext}>
      {props.children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;
