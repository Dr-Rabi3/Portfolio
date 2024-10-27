import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

const _ = require("lodash");

export const queryClient = new QueryClient();

export const fetchSkills = async ({ signal }) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "skills",
      {
        signal,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const err = new Error("An error occurred while fetching the skills");
      err.code = error.response.status;
      err.info = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const fetchToolboxes = async ({ signal }) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "toolboxes",
      {
        signal,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const err = new Error("An error occurred while fetching the toolboxes");
      err.code = error.response.status;
      err.info = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const fetchAwards = async ({ signal }) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "awards",
      {
        signal,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const err = new Error("An error occurred while fetching the awards");
      err.code = error.response.status;
      err.info = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const fetchProjects = async ({ signal }) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "projects",
      {
        signal,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const err = new Error("An error occurred while fetching the projects");
      err.code = error.response.status;
      err.info = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const getProjectById = async ({ signal, id }) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "projects/" + id,
      {
        signal,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const err = new Error("An error occurred while fetching the projects");
      err.code = error.response.status;
      err.info = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

const HandleProject = ({ project }) => {
  if (project.image) {
    const imagePath = project.image.replace("images/", "").replace(".png", "");
    _.set(project, "image", imagePath);
  }

  _.forEach(project.details, (detail) => {
    if (detail.image) {
      if (Array.isArray(detail.image)) {
        detail.image = detail.image.map((img) =>
          img.replace("images/", "").replace(".png", "")
        );
      } else {
        const imagePath = detail.image
          .replace("images/", "")
          .replace(".png", "");
        _.set(detail, "image", imagePath);
      }
    }
  });
  return project;
};

export const LikedProject = async ({ signal, id }) => {
  const { data } = await getProjectById({ signal, id });
  const project = HandleProject({ project: data });
  project.likes++;
  try {
    const response = await axios.put(
      process.env.REACT_APP_BACKEND_URL + "projects/" + id,
      project,
      {
        signal,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const err = new Error("An error occurred while update project");
      err.code = error.response.status;
      err.info = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const CommentProject = async ({ signal, id, comment }) => {
  const { data } = await getProjectById({ signal, id });
  const project = HandleProject({ project: data });
  project.comments.push(comment);
  try {
    const response = await axios.put(
      process.env.REACT_APP_BACKEND_URL + "projects/" + id,
      project,
      {
        signal,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const err = new Error("An error occurred while update project");
      err.code = error.response.status;
      err.info = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};
