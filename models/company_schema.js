const mongoose = require("mongoose");
const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  founded: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userName",
    // required : true
  },
  company_logo: {
    type: String,
  },
});
companySchema.set("timestamps", true);
module.exports = mongoose.model("companydetail", companySchema);
