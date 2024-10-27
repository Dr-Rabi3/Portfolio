const Skill = require("../models/skillModel");

const createSkill = async (skillData) => {
  const skill = await Skill.create(skillData);
  return skill;
};

const getSkills = async () => {
  const skills = await Skill.find();
  return skills;
};

const updateSkills = async (id, updateSkillData) => {
  const skill = await Skill.findByIdAndUpdate(id, updateSkillData, {
    new: true,
    runValidators: true,
  });
  return skill;
};

const deleteSkill = async (id) => {
  await Skill.findByIdAndDelete(id);
};

module.exports = {
  createSkill,
  getSkills,
  updateSkills,
  deleteSkill,
};
