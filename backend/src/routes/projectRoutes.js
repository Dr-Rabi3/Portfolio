// create rout for all function (get,post,...)

const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

router
  .route("/")
  .post(projectController.createProject)
  .get(projectController.getProjects);


router
  .route("/:id")
  .get(projectController.getProjectById)
  .put(projectController.updateProject)
  .delete(projectController.deleteProject);

module.exports = router;
