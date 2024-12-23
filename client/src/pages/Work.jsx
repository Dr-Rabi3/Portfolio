import { motion } from "motion/react";
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
  const listItemVariants = {
    hidden: { opacity: 0, x: -500 }, // All items start stacked off-screen
    visible: (index) => ({
      opacity: 1,
      x: 0, // Move to the original position
      transition: {
        delay: index * 0.6, // Stagger delay for each item
        duration: 0.5, // Animation duration
      },
    }),
  };

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
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 1 } } }} // Stagger the children animation
        >
          {projects.map((project, index) => (
            <motion.li
              key={project._id}
              variants={listItemVariants}
              custom={index} // Pass index to control stagger timing
            >
              <NavLink to="/project-details" state={project}>
                <SmallCard key={project._id} project={project} />
              </NavLink>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
