const State = require("../modals/stateModel");
const moment = require('moment')

exports.getStates = async (req, res, next) => {
  try {
    const states = await State.find({ isActive: true });
    // console.log("states are >>>>" , states)

    if (!states.length === 0) {
      throw error ("No states to be Found" )
    }

    res.status(200).json({
      success : true,
      message: "State Detail",
      timeStamp : moment().unix(),
      data: states,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({success : false , message: error.message });
  }
};
exports.createState = async (req, res, next) => {
  try {
    const { statename } = req.body;

    if (statename.length === 0) {
      throw Error("State Name absent")
    }

    const existingState = await State.findOne({ statename });

    if (existingState) {
      throw Error("State Name already exists")
    }
    const state = new State({
      statename,
      isActive: true,
    });

    await state.save();

    res.status(200).json({
      success:true,
      message: "State Created succesfully",
      timeStamp : moment().unix(),
      data: state,
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({success : false , message: error.message });
  }
};

exports.updateState = async (req, res, next) => {
  try {
    const { stateId } = req.query;

    const { statename } = req.body;

    if (!stateId || !statename) {
      throw Error("Missing Fields")
    }
    const state = await State.findOne({ id: stateId });

    const updatedState = await State.updateOne(
      { _id: state._id },
      { statename: statename }
    );

    res.status(200).json({
      success: true,
      message : "State updated successfully",
      data: updatedState,
      timeStamp:moment().unix()
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({success : false , message: error.message });
  }
};

exports.removeState = async (req, res, next) => {
  try {
    const { stateId } = req.query;

    if (!stateId) {
      throw error("Missing state Id")
    }
    const state = await State.findOne({ id: stateId });

    const removedState = await State.updateOne(
      { _id: state._id },
      { isActive: false }
    );
    res.status(200).json({
      success : true,
      message: "State Removed successfully",
      data: removedState,
      timeStamp : moment().unix()
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({success : false , message: error.message });
  }
};
