import React, { useState } from "react";
import CopyText from "./CopyText";

export function CopyTextProvider({ children }) {
  const [copy, setCopy] = useState(false); // State management

  return (
    <CopyText.Provider value={{ copy, setCopy }}>{children}</CopyText.Provider>
  );
}
