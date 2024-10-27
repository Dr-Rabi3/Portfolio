import classes from "../styles/sectionTitle.module.css";

export default function SectionTitle({ title, text }) {
  return (
    <div className={classes.container}>
      <span></span>
      <h1 className={classes.title}>{title}</h1>
      <h3 className={classes.text}>{text}</h3>
      <span></span>
    </div>
  );
}
