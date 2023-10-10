const mongoose = require("mongoose");

const URL =
  // "mongodb+srv://karannewuser:fEmZhME5inEdMBMv@cluster0.knsqu0p.mongodb.net/API_BUILDING?retryWrites=true&w=majority";
"mongodb+srv://karannewuser:fEmZhME5inEdMBMv@cluster0.knsqu0p.mongodb.net/demo-api-test"

mongoose.set('useFindAndModify', false); 

const options = {
  useNewUrlParser : true ,
  useUnifiedTopology: true,

}

const setupConnection = async () => {
  try {
    await mongoose.connect(URL , options);
    console.log("DB connection succesfull")
  } catch (error) {
    console.error("Database connection error:", error);
  } 
};

module.exports =  setupConnection 
