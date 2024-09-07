import React, { useContext, useEffect } from "react";
import Card from "./Card";
import Modal from "./Modal";
import { useRef } from "react";
import StudentContext from "./store/student-context";

function generateUniqueId(name, price) {
  const normalizedString = `${name}-${price}`
    .toLowerCase()
    .replace(/\s+/g, "-");
  const hash = normalizedString.split("").reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  return hash;
}

const FormInput = (props) => {

   const ctx = useContext(StudentContext)
  const nameRef = useRef();
  const mobRef = useRef();
  const addressRef = useRef();

  useEffect(() => {
    if (ctx.studentToEdit) {
      nameRef.current.value = ctx.studentToEdit.name;
      mobRef.current.value = ctx.studentToEdit.mobile;
      addressRef.current.value = ctx.studentToEdit.address;
    }
  }, [ctx.studentToEdit]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const mobile = mobRef.current.value;
    const address = addressRef.current.value;

    const uniqueId = generateUniqueId(name, mobile);
    const data = {
      id: uniqueId,
      name: name,
      mobile: mobile,
      address: address,
    };
    try {
      const response = await fetch('https://crudcrud.com/api/dafb95d2ecc8484ab657274713e9bbfd/students',{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const studentData = await response.json();
      ctx.addItem(studentData)
     if(!response.ok){
      throw new Error(response.error)
     }
    } catch (error) {
      alert(error.message)
    }
    
    nameRef.current.value = "";
    mobRef.current.value = "";
    addressRef.current.value = "";
  };

  return (
    <Modal onClick={props.onClose}>
      <Card>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" ref={nameRef} />
          </div>
          <div>
            <label htmlFor="mobile">Mobile Number:</label>
            <input type="tel" id="mobile" name="mobile" ref={mobRef} />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input id="address" name="address" ref={addressRef} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </Card>
    </Modal>
  );
};

export default FormInput;
