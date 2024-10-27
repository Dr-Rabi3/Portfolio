import { useQuery } from "@tanstack/react-query";

import classes from "../../styles/toolbox.module.css";

import InsideSectionTitle from "../../UI/InsideSectionTitle";
import { fetchToolboxes } from "../../Util/http.js";

export default function Toolbox() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["toolboxes"],
    queryFn: fetchToolboxes,
    staleTime: 10000,
  });
 
  const toolboxes = data?.data || [];
  return (
    <div className={classes.container}>
      <InsideSectionTitle title="Toolbox" />
      {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {isError && (
        <p style={{ textAlign: "center" }}>
          Error: {error.message || "Something went wrong"}
        </p>
      )}
      {toolboxes && toolboxes.map((toolbox) => (
        <ul key={toolbox._id} className={classes.list}>
          {toolbox.toolbox.map((tool) => (
            <li key={tool}> {tool}</li>
          ))}
        </ul>
      ))}
    </div>
  );
}
