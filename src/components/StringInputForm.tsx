import React, { useState } from "react";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";

import "./StringInputForm.scss";

export default function StringInputForm() {
    const [inputString, setInputString] = useState('')
  const [orderedString, setOrderedString] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const sortedInputString = inputString
      .toLowerCase()
      .split("")
      .sort()
      .join("");
    setOrderedString(sortedInputString);
    console.log(sortedInputString);
    setInputString('');
  }

  return (
    <>
      <div className="FormContainer">
        <form onSubmit={handleSubmit}>
          <FormControl variant="standard">
              Input String
            {/* <InputLabel>Input String</InputLabel> */}
            <Input value={inputString} onChange={(e) => setInputString(e.target.value)} />
          </FormControl>
          <Button variant="outlined" type="submit" disabled={!inputString}>
            Submit
          </Button>
        </form>
        <div className="FormResultDisplay">Ordered: {orderedString}</div>
      </div>
    </>
  );
}

// spaces?
// just alphabets? or numbers and symbols too
