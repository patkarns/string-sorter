import React, { useState } from 'react';

import Button from '@mui/material/Button';

import './StringInputForm.scss'

export default function StringInputForm() {
    const [orderedString, setOrderedString] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    const sortedInputString = (formJson.myInput as string).toLowerCase().split('').sort().join('');
    setOrderedString(sortedInputString)
    console.log(formData.entries(), formJson.myInput);
  }

  return (
    <>
      <div>
      Ordered: {orderedString}
      <form onSubmit={handleSubmit}>
        <label>
          Text input: <input name="myInput" defaultValue="Some initial value" />
        </label>
        <Button type="reset" variant="outlined">Reset</Button>
        <Button type="submit" variant="outlined">Submit</Button>
        {/* <button type="reset">Reset form</button>
        <button type="submit">Submit form</button> */}
      </form>
      </div>
    </>
  );
}



// spaces?
// just alphabets? or numbers and symbols too
// 