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
          I'm study Computer Science, and learn more about Data Structure, OOP,
          Algorithm, and Web Development. Learning a variety of skills allows you to
          approach challenges from multiple perspectives. I'm currently
          available for a full-time position.
        </p>
        <ReadMore content="Learn more" url="/about" />
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
