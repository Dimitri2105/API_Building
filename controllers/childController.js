const Child = require("../modals/childModel");

exports.getChild = async (req, res, next) => {
  try {
    const child = await Child.find({ isActive: true });

    if (child.length === 0) {
      return res.status(400).json({ message: "No child data to be Found" });
    }

    res.status(200).json({
      success: "true",
      message: "Child Profile Detail",
      timeStamp: new Date(),
      child_profile: child,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

exports.createChild = async (req, res, next) => {
  try {
    const { name, sex, dob, father_name, mother_name, district_id } = req.body;

    if (!name || !sex || !dob || !father_name || !mother_name) {
      return res.status(400).json({ message: "All fields are required " });
    }

    const child = new Child({
      name,
      sex,
      dob,
      father_name,
      mother_name,
      district_id,
      isActive: true,
    });

    await child.save();

    res.status(200).json({
      success: true,
      status: 200,
      message: "Child created Successfully",
      child: child,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

exports.updateChild = async (req, res, next) => {
  try {
    const { id } = req.query;

    const { name, sex, dob, father_name, mother_name, district_id } = req.body;

    if (!id) {
      return res.status(400).json({ messsage: "Missing state Id" });
    }

    if (
      name.length === 0 ||
      sex.length === 0 ||
      dob.length === 0 ||
      father_name.length === 0 ||
      mother_name.length === 0 ||
      !district_id
    ) {
      return res.status(400).json({ messsage: "Missing Some fields !!! " });
    }

    const child = await Child.findOne({ id: id });

    const updatedChild = await Child.updateOne(
      { _id: child._id },
      { name, sex, dob, father_name, mother_name, district_id }
    );

    res.status(200).json({
      message: "Success",
      statename: updatedChild,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};
