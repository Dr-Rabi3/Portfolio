import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import classes from "../styles/project_details.module.css";
import { decryptData, encryptData } from "../Util/crypt";

import ProjectTitle from "../UI/ProjectTitle";
import Sidebar from "../components/sub-component/Sidebar";
import Feedback from "../components/sub-component/Feedback";
import DetailsSpace from "../components/sub-component/DetailsSpace";

export default function ProjectDetails() {
  const location = useLocation();
  const { state: project } = location || {};

  useEffect(() => {
    if (project) {
      const encryptedProject = encryptData(project);
      localStorage.setItem("savedProject", encryptedProject);
    }
  }, [project]);

  const savedProjectData = localStorage.getItem("savedProject");
  const savedProject = savedProjectData ? decryptData(savedProjectData) : null;

  const currentProject = project || savedProject;
  const sub_titles = [];
  if (currentProject && currentProject.details) {
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
