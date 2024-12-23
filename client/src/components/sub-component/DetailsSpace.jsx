import { motion } from "motion/react";
import classes from "../../styles/details_space.module.css";
import { Link } from "react-router-dom";

export default function DetailsSpace({ data, ...props }) {
  let content = "";
  if (data["sub-title"] === "Links") {
    const regex = /(\w+): (https?:\/\/[^\s,]+)/g;
    let match;
    let links = [];
    while ((match = regex.exec(data.description)) !== null) {
      const name = match[1]; // The link label (e.g., "Github", "Demo")
      const url = match[2]; // The URL
      links.push({ name: name, url: url }); // Push an object with both name and URL
    }
    content = (
      <>
        <div className={classes.description}>
          <ul>
            {links.map((link) => (
              <li key={link.name}>
                <h4>{link.name}: </h4>{" "}
                <Link to={link.url} target="_blank">
                  {link.url}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  } else {
    content = (
      <>
        <div className={classes.description}>{data.description}</div>
        {data.link && (
          <Link
            to={data.link}
            target="_blank"
            style={{
              color: "var(--second-color)",
              textDecoration: "underline",
            }}
          >
            Github Link
          </Link>
        )}
        {data.image && (
          <div className={classes.image}>
            {Array.isArray(data.image) ? (
              data.image.map((img, index) => (
                <img
                  key={index}
                  src={process.env.REACT_APP_BACKEND_URL + img}
                  alt="Project details"
                />
              ))
            ) : (
              <img
                src={process.env.REACT_APP_BACKEND_URL + data.image}
                alt="Project details"
              />
            )}
          </div>
        )}
      </>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5, type: "keyframes" }}
      viewport={{ once: true }}
      className={classes.container}
      {...props}
    >
      <h2>{data["sub-title"]}</h2>
      {content}
    </motion.div>
  );
}
