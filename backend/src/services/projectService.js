// create all main function in project model

const Project = require('../models/projectModel');

const createProject = async (projectData) => { 
  const project = await Project.create(projectData);
  return project;
}

const getProjects = async () => {
  const projects = await Project.find();
  return projects;
}

const getProjectById = async (id) => { 
  const project = await Project.findById(id);
  return project;
}

const updateProject = async (id, updateProject) => {
  const project = await Project.findByIdAndUpdate(id, updateProject, {
    new: true,
    runValidators: true,
  });
  return project;
}

const deleteProject = async (id) => { 
  await Project.findByIdAndDelete(id);
}

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
}; 