const mongoose = require("mongoose");
const connectToDatabase = require("../database/connection");
const userSchema = mongoose.Schema({
  
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
 
});



module.exports = mongoose.model("user", userSchema);
connectToDatabase()