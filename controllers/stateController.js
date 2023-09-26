const State = require("../modals/stateModel");

exports.getStates = async (req, res, next) => {
  try {
    const states = await State.find({ isActive: true });
    if (!states) {
      return res.status(400).json({ message: "No states to be Found" });
    }

    res.status(200).json({
      message: "State Detail",
      timeStamp: new Date(),
      states: states,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};
exports.createState = async (req, res, next) => {
  try {
    const { statename } = req.body;

    if (!statename) {
      return res.status(200).json({ message: "State Name absent" });
    }

    const existingState = await State.findOne({ statename });

    if (existingState) {
      return res.status(400).json({ message: "State Name already exists" });
    }
    const state = new State({
      statename,
      isActive: true,
    });

    await state.save();

    res.status(200).json({
      message: "Success",
      statename: state,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

exports.updateState = async (req, res, next) => {
  try {
    const { stateId } = req.query;

    const { statename } = req.body;

    if (!stateId) {
      return res.status(400).json({ messsage: "Missing state Id" });
    }
    if (!statename) {
      return res.status(400).json({ messsage: "Missing Statename" });
    }

    const state = await State.findOne({ id: stateId });

    const updatedState = await State.updateOne(
      { _id: state._id },
      { statename: statename }
    );

    res.status(200).json({
      message: "Success",
      statename: updatedState,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};
