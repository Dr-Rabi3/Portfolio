import "../styles/small_card.css";
import "../Util/mousePoint";
import ProjectType from "./ProjectType";

export default function SmallCard({ project }) {
  return (
    <div className="card">
      <ProjectType type={project.type} />
      <div className="content">
        <div className="title">{project.title}</div>
        <p>{project.description}</p>
      </div>
    </div>
  );
}
