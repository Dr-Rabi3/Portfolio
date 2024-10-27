import classes from '../styles/about.module.css';

import ReadMore from '../UI/Readmore.jsx';
import ME from "../assets/me2.png";
import Skills from '../components/info/Skills';
import Toolbox from '../components/info/Toolbox';
import Experience from '../components/info/Experience';

export default function About() {
  return (
    <>
      <div className={classes.container}>
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
        <div className={classes.info}>
          <h2>I am Mohamed Abdelrazek Abdo &#128075;</h2>
          <h3>
            A graduate of the Faculty of Computers and Information, Department
            of Computer Science.
          </h3>
          <p>
            I love this field and aspire to be a software engineer in one of the
            companies. In addition to that, I am studying some web technology in
            an attempt to become a full stack developer. And here you are in one
            of my applications in the web field. I am happy for you to visit my
            site.
          </p>
          <ReadMore
            url={process.env.REACT_APP_BACKEND_URL + "files/CV.pdf"}
            content="Download CV"
            download={true}
          />
        </div>
      </div>
      <div className={classes["about-line"]}>About</div>
      <Skills />
      <div className={classes["about-line"]}>About</div>
      <Toolbox />
      <div className={classes["about-line"]}>About</div>
      <Experience />
    </>
  );
}
