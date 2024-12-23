import { motion } from "motion/react";
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
  const listItemVariants = {
    hidden: { opacity: 0, x: 300 }, // Starting state (off-screen)
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.3, // Stagger each item by 0.5s
        duration: 0.6, // Animation duration
      },
    }),
  };
  return (
    <div className={classes.container}>
      <motion.div
        initial={{ x: -300 }}
        whileInView={{ x: 0 }}
        viewport={{ once: true }} // Trigger when 50% of <ul> is in view
        transition={{ duration: 0.5, type: "keyframes" }}
      >
        <InsideSectionTitle title="Awards" />
      </motion.div>
      {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {isError && (
        <p style={{ textAlign: "center" }}>
          Error: {error.message || "Something went wrong"}
        </p>
      )}
      {awards && (
        <div className={classes.content}>
          <motion.ul
            initial="hidden"
            whileInView="visible" // Trigger animation when the <ul> comes into view
            viewport={{ once: true, amount: 0.5 }} // Trigger when 50% of <ul> is in view
            variants={{
              visible: { transition: { staggerChildren: 0.3 } }, // Stagger animation for children (<li>)
            }}
            className={classes.list}
          >
            {awards.map((award, index) => (
              <motion.li
                key={award._id}
                variants={listItemVariants}
                custom={index} // Pass index to control stagger timing
                // whileInView="visible" // Trigger animation for each <li> when it comes into view
                viewport={{ once: true, amount: 0.5 }} // Trigger when 50% of <li> is in view
              >
                {award.text}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      )}
    </div>
  );
}
