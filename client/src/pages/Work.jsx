import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";

import classes from "../styles/work.module.css";
import { fetchProjects } from "../Util/http";

import SmallCard from "../UI/SmallCard";

export default function Work() {
    const { data, isError, error, isLoading } = useQuery({
      queryKey: ["projects"],
      queryFn: fetchProjects,
      staleTime: 10000,
    });
  const projects = data?.data || [];

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h1>Select Work</h1>
        <div className={classes["sub-title"]}>
          <h3>Explore my creative project</h3>
          <p>Check out some of my projects by area of expertise</p>
        </div>
      </div>
      {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {isError && (
        <p style={{ textAlign: "center" }}>
          Error: {error.message || "Something went wrong"}
        </p>
      )}
      {projects && (
        <ul>
          {projects.map((project) => (
            <li key={project._id}>
              <NavLink to="/project-details" state={project}>
                <SmallCard key={project._id} project={project} />
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
