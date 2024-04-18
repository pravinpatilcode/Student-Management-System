const mongoose = require("mongoose");
const connectToDatabase = () => {
  mongoose.connect("mongodb://localhost:27017/Pravin_data", {
    useNewUrlParser: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("mongoose is connected");
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
};

module.exports=connectToDatabase;