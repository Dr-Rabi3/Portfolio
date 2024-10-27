const Award = require("../models/awardModel");

const createAward = async (awardData) => {
  const award = await Award.create(awardData);
  return award;
};

const getAwards = async () => {
  const awards = await Award.find();
  return awards;
};

const updateAward = async (id, updateSkillData) => {
  const award = await Award.findByIdAndUpdate(id, updateSkillData, {
    new: true,
    runValidators: true,
  });
  return award;
};

const deleteAward = async (id) => {
  await Award.findByIdAndDelete(id);
}

module.exports = {
  createAward,
  getAwards,
  updateAward,
  deleteAward,
};
