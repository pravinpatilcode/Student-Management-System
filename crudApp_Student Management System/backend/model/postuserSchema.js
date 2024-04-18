const mongoose = require("mongoose");
const connectToDatabase = require("../database/connection");
const postuserSchema = mongoose.Schema({
  
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
    required: false,
  },
 
});




module.exports = mongoose.model("User", postuserSchema);
connectToDatabase()