import classes from "../../styles/mainInfo.module.css";

import ME from "../../assets/me2.png";
import ReadMore from "../../UI/Readmore.jsx";

export default function MainInfo() {
  return (
    <div className={classes.container}>
      <div className={classes.info}>
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
        <div style={{display:"flex", gap:"3rem"}}>
        <ReadMore content="Learn more" url="/about" inPage={true} />
        <ReadMore
          url={process.env.REACT_APP_BACKEND_URL + "files/CV.pdf"}
          content="Download CV"
          download={true}
        />
        </div>
      </div>
      <div className={classes["image-box"]}>
        <div className={classes["image-back"]}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={classes["image-container"]}>
          <img src={ME} alt="Me" />
        </div>
      </div>
    </div>
  );
}
