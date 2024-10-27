import { useQuery } from "@tanstack/react-query";

import classes from "../../styles/experience.module.css";

import InsideSectionTitle from "../../UI/InsideSectionTitle";
import { fetchAwards } from "../../Util/http";

export default function Experience() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["awards"],
    queryFn: fetchAwards,
    staleTime: 10000,
  });

  const awards = data?.data || [];
  console.log(awards);
  return (
    <div className={classes.container}>
      <InsideSectionTitle title="Awards" />
      {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {isError && (
        <p style={{ textAlign: "center" }}>
          Error: {error.message || "Something went wrong"}
        </p>
      )}
      {awards && (
        <div className={classes.content}>
          <ul className={classes.list}>
            {awards.map((award) => (
              <li key={award._id}>{award.text}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
