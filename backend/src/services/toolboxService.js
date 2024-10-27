
const ToolBox = require("../models/toolboxModel");

const createToolBox = async (toolBoxData) => {
  const toolBox = await ToolBox.create(toolBoxData);
  return toolBox;
};

const getToolBoxes = async () => {
  const toolBoxes = await ToolBox.find();
  return toolBoxes;
};

const getToolboxById = async (id) => {
  const toolbox = await ToolBox.findById(id);
  return toolbox;
};

const updateToolBox = async (id, updateToolboxData) => {
  const toolbox = await Award.findByIdAndUpdate(id, updateToolboxData, {
    new: true,
    runValidators: true,
  });
  return toolbox;
};


const deleteToolBox = async (id) => {
  await ToolBox.findByIdAndDelete(id);
};

module.exports = {
  createToolBox,
  getToolBoxes,
  getToolboxById,
  updateToolBox,
  deleteToolBox,
};