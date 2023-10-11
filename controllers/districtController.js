const District = require("../modals/districtModel");
const moment = require("moment");

exports.getDistricts = async (req, res, next) => {
  try {
    const { state_id } = req.query;

    if (!state_id) {
      throw Error("State ID missing");
    }

    const district = await District.find({
      State_id: state_id,
      isActive: true,
    });
    // if (district.length === 0) {
    //   throw Error("Cannot Find State")
    // }

    res.status(200).json({
      success: true,
      message: "District Detail",
      timeStamp: moment().unix(),
      data: district,
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.createDistrict = async (req, res, next) => {
  try {
    const { State_id, districtName } = req.body;

    if (!State_id || !districtName) {
      throw Error("State ID or District Name missing");
    }

    const district = new District({
      State_id,
      districtName,
      isActive: true,
    });

    await district.save();

    res.status(200).json({
      success: true,
      timeStamp: moment().unix(),
      message: "District created Successfully",
      data: district,
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateDistrict = async (req, res, next) => {
  try {
    const { id } = req.query;
    const { districtName } = req.body;

    if (!id || !districtName) {
      throw Error("Missing  Id or District Name ");
    }
    const district = await District.findOne({ id: id });

    const updatedDistrict = await District.updateOne(
      { _id: district._id },
      { districtName: districtName }
    );

    res.status(200).json({
      success: true,
      message: "District updated successfully",
      data: updatedDistrict,
      timeStamp: moment().unix(),
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
exports.removeDistrict = async (req, res, next) => {
  try {
    const { id } = req.query;

    if (!id) {
      throw Error("Missing Id");
    }
    const district = await District.findOne({ id: id });

    const removedDistrict = await District.updateOne(
      { _id: district._id },
      { isActive: false }
    );
    res.status(200).json({
      success: true,
      message: "District removed successfully",
      data: removedDistrict,
      timeStamp: moment().unix(),
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
