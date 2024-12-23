import { motion, useScroll, useTransform } from "motion/react";

import classes from "../styles/about.module.css";

import ReadMore from "../UI/Readmore.jsx";
import ME from "../assets/me2.png";
import Skills from "../components/info/Skills";
import Toolbox from "../components/info/Toolbox";
import Experience from "../components/info/Experience";

export default function About() {
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
    <>
      <motion.div
        style={{ opacity: opacityBack }}
        className={classes.container}
      >
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          style={{ x: moveText }}
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
        <motion.div
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          style={{ x: moveImage }}
          transition={{ duration: 0.5, type: "keyframes" }}
          className={classes.info}
        >
          <h2>I’m Mohamed Abdelrazek Abdo &#128075;</h2>
          <h3>Bachelar of Computer science.</h3>
          <p>
            I am passionate about this field and aspire to become a software
            engineer. I am also studying web technologies to build my skills as
            a full-stack developer. Here, you’ll find one of my web
            applications, and I’d be delighted for you to visit my site.
          </p>
          <h5>Available for a full-time position</h5>
          <ReadMore
            url={process.env.REACT_APP_BACKEND_URL + "files/CV.pdf"}
            content="Download CV"
            download={true}
          />
        </motion.div>
      </motion.div>
      <div className={classes["about-line"]}>About</div>
      <Skills />
      <div className={classes["about-line"]}>About</div>
      <Toolbox />
      <div className={classes["about-line"]}>About</div>
      <Experience />
    </>
  );
}
