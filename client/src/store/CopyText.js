import { createContext } from "react";

// Create CopyText Context
const CopyText = createContext({
  copy: false, // Default value for the state
  setCopy: () => {}, // Default empty function to set the state
});

export default CopyText;
