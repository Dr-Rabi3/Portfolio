import { motion } from "motion/react";
import { useEffect, useState } from "react";
import classes from "../../styles/sidebar.module.css";

export default function Sidebar({ sub_titles }) {
  const [activeHash, setActiveHash] = useState(window.location.hash);
  // Update the active hash when the hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    const section = document.getElementById(activeHash.replace("#", ""));
    if (section) {
      const sectionPosition =
        section.getBoundingClientRect().top + window.scrollY; // Get the section position relative to the document
      window.scrollTo({
        top: sectionPosition - 100, // Adjust for the navbar height
        behavior: "smooth", // Enable smooth scroll
      });
    }

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [activeHash]);

  const listItemVariants = {
    hidden: { opacity: 0, x: -200 }, // Starting state (off-screen)
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.3, // Stagger each item by 0.3s
        duration: 0.5, // Animation duration
      },
    }),
  };

  const listItems = Array.from({ length: sub_titles.length }, (_, index) => {
    const sectionId = `section${index + 1}`;
    return (
      <motion.li
        key={index}
        variants={listItemVariants}
        custom={index} // Pass index to control stagger timing
      >
        <a
          href={"#" + sectionId}
          className={
            activeHash === "#" + sectionId ||
            (sectionId === "section1" && activeHash === "")
              ? classes.active
              : ""
          }
        >
          {sub_titles[index]}
        </a>
      </motion.li>
    );
  });

  return (
    <div className={classes.container}>
      <div>
        Project
        <motion.ul
          initial="hidden"
          whileInView="visible" // Trigger animation when the <ul> comes into view
          variants={{
            visible: { transition: { staggerChildren: 0.3 } }, // Stagger animation for children (<li>)
          }}
          viewport={{ once: true }} // Trigger when 50% of the <ul> is in view
        >
          {listItems}
        </motion.ul>
      </div>
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ type: "keyframes" }}
        viewport={{ once: true }} // Trigger when 50% of the <ul> is in view
      >
        <a
          href={`#section${sub_titles.length + 1}`}
          className={
            activeHash === `section${sub_titles.length + 1}`
              ? classes.active
              : ""
          }
        >
          Feedback
        </a>
      </motion.div>
    </div>
  );
}
