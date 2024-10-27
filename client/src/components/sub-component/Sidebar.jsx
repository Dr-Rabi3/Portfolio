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

  const listItems = Array.from({ length: sub_titles.length }, (_, index) => {
    const sectionId = `section${index + 1}`;
    return (
      <li key={index}>
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
      </li>
    );
  });

  return (
    <div className={classes.container}>
      <div>
        Project
        <ul>{listItems}</ul>
      </div>
      <div>
        <a
          href={`#section${sub_titles.length + 1}`}
          className={
            activeHash === `section${sub_titles.length + 1}` ? classes.active : ""
          }
        >
          Feedback
        </a>
      </div>
    </div>
  );
}
