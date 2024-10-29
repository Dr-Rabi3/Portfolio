import { useContext } from "react";
import classes from "../../styles/footer.module.css";
import ReadMore from "../../UI/Readmore.jsx";
import CopyText from "../../store/CopyText.js";

export default function Footer() {
  const { setCopy } = useContext(CopyText); // Use context

  const textToCopy = "https://github.com/Dr-Rabi3"; // The text to copy

  const handleCopy = () => {
    setCopy(true); // Set the copy state to true
    navigator.clipboard
      .writeText(textToCopy) // Copy the text to the clipboard
      .then(() => {
        console.log("Text copied to clipboard!");

        setTimeout(() => {
          setCopy(false); // Reset the copy state after 1 minute (60 seconds)
          console.log("setCopy set to false after 1 minute.");
        }, 3000); // 1 minute delay (60000 milliseconds)
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <footer className={classes.container}>
      <div className={classes.content}>
        <div className={classes.title}>Looking for a new talent?</div>
        <div className={classes.email} onClick={handleCopy}>
          abdalrazekm06@gmail.com
        </div>
        <div className={classes.links}>
          <ReadMore
            url="https://www.linkedin.com/in/mohmed-abdalrazek-6515a0232/"
            content="LinkedIn"
          />
          <ReadMore
            url={process.env.REACT_APP_BACKEND_URL + "files/CV.pdf"}
            content="Download CV"
            download={true}
          />
        </div>
      </div>
      <div className={classes.footer}>
        <div className={classes["copy-right"]}>©2024 Mohamed A.</div>
        <div>Available for a full-time position</div>
        <div>Made by Mohamed A.</div>
      </div>
    </footer>
  );
}
