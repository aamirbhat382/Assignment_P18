const User = require("../models/user");
const bcrypt = require("bcryptjs");


function authController() {
  return {
    register : async (req, res) => {
      const { name, phoneNumber, password } = req.body;
      // Validate request
    
      if (!name || !phoneNumber || !password) {
        return res.status(422).json({
          error: "All fields are required",
        });
      }
      // Check If Phone Number Already exists
      User.exists({ phoneNumber: phoneNumber }, (err, result) => {
        if (result) {
          return res.status(422).json({
            error: "Phone Number is already taken",
          });
        }
      });
      // Hash Password
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        phoneNumber,
        password: hashedPassword,
      });
      user
        .save()
        .then((user) => {
          return res.status(200).json({ user });
        })
        .catch((err) => {
          console.log(err)
          return res.status(500).json({
            error: "Something went wrong",
          });
        }); 
    }

  }


}

module.exports = authController
