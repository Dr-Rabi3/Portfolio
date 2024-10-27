const skillsService = require("../services/skillsService");
const { handleStatus } = require("../utils/handleStatus");

// @desc    Create a new skill
// @route   POST /skills
// @access  public
const createSkill = async (req, res, next) => {
  try {
    const skill = await skillsService.createSkill(req.body);
    res.status(201).json({
      status: handleStatus.SUCCESS,
      data: skill,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all skills
// @route   GET /skills
// @access  public
const getSkills = async (req, res, next) => {
  try {
    const skills = await skillsService.getSkills();
    res.status(200).json({
      status: handleStatus.SUCCESS,
      count: skills.length,
      data: skills,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update single skill by id
// @route   PUT /skills/:id
// @access  public
const updateSkills = async (req, res, next) => {
  try {
    const skill = await skillsService.updateSkills(req.params.id, req.body);
    if (!skill) {
      return res.status(404).json({
        status: handleStatus.FAIL,
        message: "skill not found",
      });
    }
    res.status(200).json({
      status: handleStatus.SUCCESS,
      data: skill,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete single skill by id
// @route   DELETE /skills/:id
// @access  public
const deleteSkill = async (req, res, next) => {
  try {
    await skillsService.deleteProject(req.params.id);
    res.status(200).json({
      status: handleStatus.SUCCESS,
      message: "skill deleted",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createSkill,
  getSkills,
  updateSkills,
  deleteSkill,
};
