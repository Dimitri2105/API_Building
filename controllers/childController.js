const { json } = require("body-parser");
const Child = require("../modals/childModel");
const moment = require("moment");

exports.getallChild = async (req, res, next) => {
  try {
    const { id, sex, dob, state_id, district_id, name } = req.query;

    let result;
    const filter = { isActive: true };

    if (id) {
      filter.id = id;
      // result = await Child.findOne({ id: id, isActive: true });
    } else {
      // result = await Child.find({ isActive: true });
      filter;
    }

    if (sex) filter.sex = sex;

    if (state_id) filter.state_id = state_id;

    if (district_id) filter.district_id = district_id;

    if (dob) {
      // const child = await Child.find({dob : {$regex: `${dob}`, $options: 'i'}})
      filter.dob = { $regex: `${dob}`, $options: "i" };
    }
    if (name) {
      filter.name = { $regex: `^.*${name}.*$`, $options: "i" };
    }
    result = await Child.find(filter);

    res.status(200).json({
      success: true,
      message: "Child Profile Detail",
      timeStamp: moment().unix(),
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getOneChild = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw error("Missing Id");
    }
    const child = await Child.findOne({ id: id, isActive: true });

    if (!child) {
      throw error("No child data to be Found");
    }

    res.status(200).json({
      success: true,
      message: "Child Profile Detail",
      timeStamp: moment().unix(),
      data: child,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.createChild = async (req, res, next) => {
  try {
    const { name, sex, dob, father_name, mother_name, district_id, state_id } =
      req.body;

    if (!name || !sex || !dob || !father_name || !mother_name) {
      throw error("All fields are required ");
    }

    const child = new Child({
      name,
      sex,
      dob,
      father_name,
      mother_name,
      district_id,
      state_id,
      isActive: true,
    });

    await child.save();

    res.status(200).json({
      success: true,
      message: "Child created Successfully",
      timeStamp: moment().unix(),
      data: child,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateChild = async (req, res, next) => {
  try {
    const { id } = req.query;

    const { name, sex, dob, father_name, mother_name, district_id } = req.body;

    if (!id) {
      throw error("Missing Id");
    }

    if (
      name.length === 0 ||
      sex.length === 0 ||
      dob.length === 0 ||
      father_name.length === 0 ||
      mother_name.length === 0 ||
      !district_id
    ) {
      throw error("Missing Some fields !!! ");
    }

    const child = await Child.findOne({ id: id });

    const updatedChild = await Child.updateOne(
      { _id: child._id },
      { name, sex, dob, father_name, mother_name, district_id }
    );

    res.status(200).json({
      success: true,
      message: "Child updated successfully",
      timeStamp: moment().unix(),
      data: updatedChild,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.removeChild = async (req, res, next) => {
  try {
    const { id } = req.query;

    if (!id) {
      throw error("Missing child Id");
    }
    const child = await Child.findOne({ id: id });

    const removedChild = await Child.updateOne(
      { _id: child._id },
      { isActive: false }
    );
    res.status(200).json({
      success: true,
      message: "Child removed successfully",
      data: removedChild,
      timeStamp: moment().unix(),
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
