const express = require("express");
const router = express.Router();
const toolboxController = require("../controllers/toolboxController");

router
  .route("/")
  .post(toolboxController.createToolBox)
  .get(toolboxController.getToolBoxes);


router
  .route("/:id")
  .get(toolboxController.getToolboxById)
  .put(toolboxController.updateToolBox)
  .delete(toolboxController.deleteToolBox);

module.exports = router;