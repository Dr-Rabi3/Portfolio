const toolboxService = require("../services/toolboxService");
const { handleStatus } = require("../utils/handleStatus");

// @desc    Create a new toolbox
// @route   POST /toolboxes
// @access  public
const createToolBox = async (req, res, next) => {
  try {
    const toolbox = await toolboxService.createToolBox(req.body);
    res.status(201).json({
      status: handleStatus.SUCCESS,
      data: toolbox,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    get all toolboxes
// @route   GET /toolboxes
// @access  public
const getToolBoxes = async (req, res, next) => {
  try {
    const toolboxes = await toolboxService.getToolBoxes();
    res.status(200).json({
      status: handleStatus.SUCCESS,
      count: toolboxes.length,
      data: toolboxes,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get toolbox by id
// @route   GET /toolboxes/:id
// @access  public
const getToolboxById = async (req, res, next) => {
  try {
    const toolbox = await toolboxService.getToolboxById(req.params.id);
    if (!toolbox) {
      return res.status(404).json({
        status: handleStatus.FAIL,
        message: "Toolbox not found",
      });
    }
    res.status(200).json({
      status: handleStatus.SUCCESS,
      data: toolbox,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update toolbox
// @route   PUT /toolboxes/:id
// @access  public
const updateToolBox = async (req, res, next) => {
  try {
    const toolbox = await toolboxService.updateToolBox(req.params.id, req.body);
    if (!toolbox) {
      return res.status(404).json({
        status: handleStatus.FAIL,
        message: "toolbox not found",
      });
    }
    res.status(200).json({
      status: handleStatus.SUCCESS,
      data: toolbox,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete toolbox
// @route   DELETE /toolboxes/:id
// @access  public
const deleteToolBox = async (req, res, next) => {
  try {
    await toolboxService.deleteToolBox(req.params.id);
    res.status(200).json({
      status: handleStatus.SUCCESS,
      message: "toolbox deleted",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createToolBox,
  getToolBoxes,
  getToolboxById,
  updateToolBox,
  deleteToolBox,
};
