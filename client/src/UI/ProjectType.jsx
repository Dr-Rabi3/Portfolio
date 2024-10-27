import classes from "../styles/project_type.module.css";

export default function ProjectType({ type }) {
  return (
    <div className={classes.content}>
      <h2 className={classes["text-shadows"]}>{type}</h2>
    </div>
  );
}
