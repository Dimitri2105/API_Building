const State = require("../modals/stateModel");

exports.getStates = async (req, res, next) => {
    try {
      const states = await State.find({isActive : true});
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

}