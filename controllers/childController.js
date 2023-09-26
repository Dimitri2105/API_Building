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
      isActive : true
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
