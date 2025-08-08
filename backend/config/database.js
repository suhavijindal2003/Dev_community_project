const mongoose = require("mongoose");

const dbConnect= async()=> {
  await mongoose.connect(process.env.CONNECTION_URL).then(() => {
    console.log("DB CONNECTED");
  });
}


module.exports = dbConnect;