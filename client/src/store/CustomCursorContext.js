import { createContext } from "react";

const CustomCursorContext = createContext({
  type: "default",
  setType: () => {},
});

export default CustomCursorContext;
