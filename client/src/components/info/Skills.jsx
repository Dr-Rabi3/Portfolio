import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";

import classes from "../../styles/skills.module.css";

import InsideSectionTitle from "../../UI/InsideSectionTitle";
import { fetchSkills } from "../../Util/http";

export default function Skills() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
    staleTime: 10000,
  });

  const skills = data?.data || [];
  return (
    <div className={classes.container}>
      <motion.div
        initial={{ x: -300 }}
        whileInView={{ x: 0 }}
        viewport={{ once: true }} // Trigger when 50% of <ul> is in view
        transition={{ duration: 0.5, type: "keyframes" }}
      >
        <InsideSectionTitle title="Skills" />
      </motion.div>
      {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {isError && (
        <p style={{ textAlign: "center" }}>
          Error: {error.message || "Something went wrong"}
        </p>
      )}
      {skills && (
        <motion.div
          initial={{ x: 300 }}
          whileInView={{ x: 0 }}
          viewport={{ once: true }} // Trigger when 50% of <ul> is in view
          transition={{ duration: 0.5, type: "keyframes" }}
          className={classes.content}
        >
          {skills.map((skill) => {
            return (
              <div key={skill._id}>
                <div className={classes.title}>{skill.title}</div>
                <ul className={classes.list}>
                  {skill.list.map((skillList, index) => (
                    <li key={index}>{skillList}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
