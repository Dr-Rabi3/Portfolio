import { motion } from "motion/react";
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
        viewport={{ once: true, amount: 0.5 }} // Trigger when 50% of <ul> is in view
        transition={{ duration: 0.5, type: "keyframes" }}
      >
        <InsideSectionTitle title="Toolbox" />
      </motion.div>
      {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {isError && (
        <p style={{ textAlign: "center" }}>
          Error: {error.message || "Something went wrong"}
        </p>
      )}
      {toolboxes &&
        toolboxes.map((toolbox) => (
          <motion.ul
            key={toolbox._id}
            className={classes.list}
            initial="hidden"
            whileInView="visible" // Trigger animation when the <ul> comes into view
            viewport={{ once: true, amount: 0.5 }} // Trigger when 50% of <ul> is in view
            variants={{
              visible: { transition: { staggerChildren: 0.3 } }, // Stagger animation for children (<li>)
            }}
          >
            {toolbox.toolbox.map((tool, index) => (
              <motion.li
                variants={listItemVariants}
                custom={index} // Pass index to control stagger timing
                // whileInView="visible" // Trigger animation for each <li> when it comes into view
                viewport={{ once: true, amount: 0.5 }} // Trigger when 50% of <li> is in view
              >
                {tool}
              </motion.li>
            ))}
          </motion.ul>
        ))}
    </div>
  );
}
