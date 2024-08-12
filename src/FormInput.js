import React, { useContext } from "react";
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

  const submitHandler = (e) => {
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
    ctx.addItem(data)
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
