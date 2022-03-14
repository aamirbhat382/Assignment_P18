const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 32
    },
    pdf: {
      data: Buffer,
      contentType: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Upload", uploadSchema);