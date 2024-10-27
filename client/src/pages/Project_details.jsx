import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import classes from "../styles/project_details.module.css";

import ProjectTitle from "../UI/ProjectTitle";
import Sidebar from "../components/sub-component/Sidebar";
import Feedback from "../components/sub-component/Feedback";
import DetailsSpace from "../components/sub-component/DetailsSpace";

export default function ProjectDetails() {
  const location = useLocation();

  const { state: project } = location || {};
  // useEffect(() => {
  //   if (project) {
  //     localStorage.setItem("savedProject", JSON.stringify(project));
  //   }
  // }, [project]);
  // const savedProject = JSON.parse(localStorage.getItem("savedProject"));
  const currentProject = project;
  const sub_titles = [];
  if (currentProject.details) {
    currentProject.details.forEach((detail) => {
      sub_titles.push(detail["sub-title"]);
    });
  }

  return (
    <>
      <ProjectTitle project={currentProject} />
      <div className={classes.container}>
        <div className={classes.forScroll}>
          <Sidebar sub_titles={sub_titles} />
        </div>
        <div className={classes.show}>
          {currentProject.details &&
            currentProject.details.map((detail, index) => (
              <DetailsSpace
                key={index}
                data={detail}
                id={`section${index + 1}`}
              />
            ))}
        </div>
        <Feedback
          id={`section${currentProject.details.length + 1}`}
          projectId={currentProject._id}
        />
      </div>
    </>
  );
}
