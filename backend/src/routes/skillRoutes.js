const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skillsController");

router
  .route("/")
  .get(skillController.getSkills)
  .post(skillController.createSkill);

router
  .route("/:id")
  .put(skillController.updateSkills)
  .delete(skillController.deleteSkill);

module.exports = router;
