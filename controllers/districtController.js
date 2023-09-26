const District = require("../modals/districtModel");

exports.getDistricts =  async (req, res, next) => {
    try {
      const { state_id } = req.query;
  
      if (!state_id) {
        return res.status(400).json({ message: "State ID missing" });
      }
  
      const district = await District.find({ State_id: state_id , isActive : true } );
  
      if (!district) {
        return res.status(400).json({ message: "Cannot Find State" });
      }
  
      res.status(200).json({
        success: true,
        message: "District Detail",
        timeStamp: new Date(),
        Districts: district,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error });
    }
  }

  exports.createDistrict =  async (req, res, next) => {
    try {
      const { State_id, districtName } = req.body;
  
      if (!State_id || !districtName) {
        return res
          .status(400)
          .json({ message: "State ID or District Name missing" });
      }
  
      const district = new District({
        State_id,
        districtName,
        isActive:true
      });
  
      await district.save();
  
      res.status(200).json({
        success: true,
        status: 200,
        message: "District created Successfully",
        district: district,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error });
    }
  }