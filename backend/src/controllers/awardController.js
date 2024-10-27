const awardService = require("../services/awardService");
const { handleStatus } = require("../utils/handleStatus");

// @desc    Create a new award
// @route   POST /awards
// @access  public
const createAward = async (req, res, next) => {
  try {
    const award = await awardService.createAward(req.body);
    res.status(200).json({
      status: handleStatus.SUCCESS,
      data: award,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    get all awards
// @route   GET /awards
// @access  public
const getAwards = async (req, res, next) => {
  try {
    const awards = await awardService.getAwards();
    res.status(200).json({
      status: handleStatus.SUCCESS,
      count: awards.length,
      data: awards,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update single award by id
// @route   PUT /awards/:id
// @access  public
const updateAward = async (req, res, next) => {
  try {
    const award = await awardService.updateAward(req.params.id, req.body);
    if (!award) {
      return res.status(404).json({
        status: handleStatus.FAIL,
        message: "award not found",
      });
    }
    res.status(200).json({
      status: handleStatus.SUCCESS,
      data: award,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    delete award by id
// @route   DELETE /awards/:id
// @access  public
const deleteAward = async (req, res, next) => {
  try {
    await awardService.deleteAward(req.params.id);
    res.status(200).json({
      status: handleStatus.SUCCESS,
      message: "award deleted",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createAward,
  getAwards,
  updateAward,
  deleteAward,
};
