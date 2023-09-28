const Child = require("../modals/childModel");

exports.getChild = async (req, res, next) => {
  try {
    const child = await Child.find({ isActive: true });

    if (child.length === 0) {
      throw Error ("No child data to be Found")
    }

    res.status(200).json({
      success: true,
      message: "Child Profile Detail",
      timeStamp: moment().unix(),
      data: child,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({success : false , message: error.message });
  }
};

exports.createChild = async (req, res, next) => {
  try {
    const { name, sex, dob, father_name, mother_name, district_id } = req.body;

    if (!name || !sex || !dob || !father_name || !mother_name) {
      throw Error( "All fields are required ")
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
      message: "Child created Successfully",
      timeStamp : moment().unix(),
      data: child,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({success : false , message: error.message });
  }
};

exports.updateChild = async (req, res, next) => {
  try {
    const { id } = req.query;

    const { name, sex, dob, father_name, mother_name, district_id } = req.body;

    if (!id) {
      throw Error ("Missing Id")
    }

    if (
      name.length === 0 ||
      sex.length === 0 ||
      dob.length === 0 ||
      father_name.length === 0 ||
      mother_name.length === 0 ||
      !district_id
    ) {
      throw Error ("Missing Some fields !!! ")
    }

    const child = await Child.findOne({ id: id });

    const updatedChild = await Child.updateOne(
      { _id: child._id },
      { name, sex, dob, father_name, mother_name, district_id }
    );

    res.status(200).json({
      success : true,
      message: "Child updated successfully",
      timeStamp : moment().unix(),
      data: updatedChild,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({success : false , message: error.message });
  }
};

exports.removeChild = async(req,res,next) =>{
  try{
    const { id } = req.query;

    if (!id) {
      throw Error ("Missing child Id")
    }
    const child = await Child.findOne({ id: id });

    const removedChild = await Child.updateOne(
      { _id: child._id },
      { isActive: false }
    );
    res.status(200).json({
      success: true,
      message : "Child removed successfully",
      data: removedChild,
      timeStamp : moment().unix()
    });

  }catch (error) {
    console.log(error);
    res.status(400).json({success : false , message: error.message });
  }
}
