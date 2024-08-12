import AddStudentButton from './AddStudentButton';
import './App.css';
import { useState } from 'react';
import StudentProvider from './store/StudentProvider';

import FormInput from './FormInput';
import StudentList from './StudentList';

function App() {

  const [showForm, setShowForm] = useState(true);

  const formShowHandler = ()=>{
    setShowForm(false);
  }
  const formtHideHandler = () =>{
    setShowForm(true)
  }
  return (
    <StudentProvider>
    <AddStudentButton onShow={formShowHandler}/>
    {!showForm && <FormInput  onClose={formtHideHandler}/>}
    <StudentList/>
    </StudentProvider>
   
  );
}

export default App;
