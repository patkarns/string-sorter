import React, { useState } from "react";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import Box from "@mui/system/Box";
import Paper from "@mui/material/Paper";

import "./StringSorter.scss";

export default function StringSorter() {
  const defaultOrder = "abcdefghijklmnopqrstuvwxyz".split("");
  const [inputString, setInputString] = useState("");
  const [customSortOrder, setCustomSortOrder] = useState("");
  const [orderedString, setOrderedString] = useState("");

  function handleSubmit(e): void {
    e.preventDefault();
    const cleanedInputString = inputString.toLowerCase().split("");

    const sortedInputChars = customSortOrder
      ? sortStringCustom(cleanedInputString)
      : cleanedInputString.sort();

    setOrderedString(sortedInputChars.join(""));
    setInputString("");
    setCustomSortOrder("");
  }

  function sortStringCustom(unsortedChars: string[]): string[] {
    const customOrder = customSortOrder.split("");
    // the set will contain a concatenation of user-provided customOrder, plus the default a-z ordering for alphabets not specified by the user
    // (the default a-z order will get overridden by custom inputs since customOrder will be prioritized when creating the set)
    const sortOrder = Array.from(new Set(customOrder.concat(defaultOrder)));
    // store the alphabet's corresponding index in a map (O(n) operation), so all subsequent access is O(1)
    // otherwise, we'll have to repeatedly call indexOf on the sortOrder array on every iteration of .sort()
    // sortOrderIndexMap will look something like { 's': 0, 'v': 1, 'a': 2, 'b': 3, ... } if the second input is ['s', 'v']
    const sortOrderIndexMap = new Map();
    for (let i = 0; i < sortOrder.length; i++) {
      sortOrderIndexMap.set(sortOrder[i], i);
    }
    return unsortedChars.sort(
      (a, b) => sortOrderIndexMap.get(a) - sortOrderIndexMap.get(b)
    );
  }

  return (
    <>
      <div className="Description">
        <h1>Order a string</h1>
        <h3>1. Enter a string and click ORDER</h3>
        <h3>
          2. (Optional) Specify a sort order (e.g. Specifying <i>svb</i> will
          sort the string by s, v, then b in this order. The rest of the letters
          in the string will be sorted in alphabetical order.)
        </h3>
      </div>
      <Box className="StringSorter">
        <Paper className="FormContainer">
          <form onSubmit={handleSubmit} className="Form">
          <FormControl>
                Input Text
                <Input
                  value={inputString}
                  onChange={(e) => setInputString(e.target.value)}
                />
              </FormControl>
              <FormControl>
                Custom Sort Order (Optional)
                <Input 
                  value={customSortOrder}
                  onChange={(e) => setCustomSortOrder(e.target.value)}
                />
              </FormControl>
            <Button variant="outlined" type="submit" disabled={!inputString}>
              Order
            </Button>
          </form>
        </Paper>
        <Paper className="ResultContainer">
          <div className="ResultDisplay">
            <h3>Ordered Text</h3>
            <p>{orderedString}</p>
          </div>
        </Paper>
      </Box>
    </>
  );
}

// spaces?
// just alphabets? or numbers and symbols too
// max
