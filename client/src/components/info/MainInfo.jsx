import { motion, useScroll, useTransform } from "motion/react";

import classes from "../../styles/mainInfo.module.css";
import ME from "../../assets/me2.png";
import ReadMore from "../../UI/Readmore.jsx";

export default function MainInfo() {
  const { scrollY } = useScroll();
  const opacityBack = useTransform(
    scrollY,
    [0, 200, 300, 500],
    [1, 0.5, 0.5, 0]
  );
  const moveImage = useTransform(
    scrollY,
    [0, 200, 300, 500, 600, 700],
    [0, 50, 100, 150, 200, 250]
  );
  const moveText = useTransform(
    scrollY,
    [0, 200, 300, 500, 600, 700],
    [0, -50, -100, -150, -200, -250]
  );
  return (
    <motion.div style={{ opacity: opacityBack }} className={classes.container}>
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        style={{ x: moveText }}
        transition={{ duration: 0.5, type: "keyframes" }}
        className={classes.info}
      >
        <h2>HI, Mohamed Abdalrazek Abdo &#128075;</h2>
        <h3>Software Engineer & Web Developer</h3>
        <h5>Available for a full-time position</h5>
        <p>
          I am studying Computer Science and focusing on Data Structures,
          Object-Oriented Programming (OOP), Algorithms, and Web Development.
          Learning a variety of skills enables me to approach challenges from
          multiple perspectives. I am currently available for a full-time
          position.
        </p>
        <div style={{ display: "flex", gap: "3rem" }}>
          <ReadMore content="Learn more" url="/about" inPage={true} />
          <ReadMore
            url={process.env.REACT_APP_BACKEND_URL + "files/CV.pdf"}
            content="Download CV"
            download={true}
          />
        </div>
      </motion.div>
      <motion.div
        initial={{ x: 300 }}
        animate={{ x: 0 }}
        style={{ x: moveImage }}
        transition={{ duration: 0.5, type: "keyframes" }}
        className={classes["image-box"]}
      >
        <div className={classes["image-back"]}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={classes["image-container"]}>
          <img src={ME} alt="Me" />
        </div>
      </motion.div>
    </motion.div>
  );
}
