const mongoose = require("mongoose");

const courseShema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// create collection name in mongose compass -> Course to courses by deafault set captial letter to small letter and add s at the end
module.exports = mongoose.model("Course", courseShema); // build model/collection dependent on schema
