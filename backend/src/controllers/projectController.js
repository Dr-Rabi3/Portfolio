const _ = require("lodash");

const projectService = require("../services/projectService");
const { handleStatus } = require("../utils/handleStatus");

// @desc    Create a new project
// @route   POST /projects
// @access  public
const createProject = async (req, res, next) => {
  try {
    const project = await projectService.createProject(req.body);
    res.status(201).json({
      status: handleStatus.SUCCESS,
      data: project,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all projects
// @route   GET /projects
// @access  public
const getProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getProjects();
    _.forEach(projects, (project) => {
      if (project.image) {
        _.set(project, "image", `images/${project.image}.png`);
      }

      _.forEach(project.details, (detail) => {
        if (detail.image) {
          if (Array.isArray(detail.image)) {
            // Modify each item in the array individually
            detail.image = detail.image.map((img) => `images/${img}.png`);
          } else {
            _.set(detail, "image", `images/${detail.image}.png`);
          }
        }
      });
    });

    res.status(200).json({
      status: handleStatus.SUCCESS,
      count: projects.length,
      data: projects,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single project by id
// @route   GET /projects/:id
// @access  public
const getProjectById = async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({
        status: handleStatus.FAIL,
        message: "Project not found",
      });
    }
    if (project.image) {
      _.set(project, "image", `images/${project.image}.png`);
    }
    _.forEach(project.details, (detail) => {
      if (detail.image) {
        if (Array.isArray(detail.image)) {
          // Modify each item in the array individually
          detail.image = detail.image.map((img) => `images/${img}.png`);
        } else {
          _.set(detail, "image", `images/${detail.image}.png`);
        }
      }
    });
    res.status(200).json({
      status: handleStatus.SUCCESS,
      data: project,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update single project by id
// @route   PUT /projects/:id
// @access  public
const updateProject = async (req, res, next) => {
  try {
    const project = await projectService.updateProject(req.params.id, req.body);
    if (!project) {
      return res.status(404).json({
        status: handleStatus.FAIL,
        message: "project not found",
      });
    }
    res.status(200).json({
      status: handleStatus.SUCCESS,
      data: project,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete single project by id
// @route   DELETE /projects/:id
// @access  public
const deleteProject = async (req, res, next) => {
  try {
    await projectService.deleteProject(req.params.id);
    res.status(200).json({
      status: handleStatus.SUCCESS,
      message: "project deleted",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
