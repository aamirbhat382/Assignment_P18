const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt")

function authController() {
  return {
    register: async (req, res) => {
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
          console.log(err);
          return res.status(500).json({
            error: "Something went wrong",
          });
        });
    },
    login: async (req, res) => {
      try {
        if (!req.body.phoneNumber || !req.body.password) {
          return res.status(422).json({
            error: "All feilds are required",
          });
        }
        const password = req.body.password; // Get Password
        // Get phoneNumber
        const uesrPhoneNumber = await User.findOne({
          phoneNumber: req.body.phoneNumber,
        });
        // Compare Password
        const isMatch = await bcrypt.compare(
          password,
          uesrPhoneNumber.password
        );
        //  Check If Match
        if (isMatch) {
          //create token
          const token = jwt.sign({ _id: uesrPhoneNumber._id }, process.env.SECRET);
          //put token in cookie
          res.cookie("token", token, { expire: new Date() + 9999 });

          //send response to front end
          const { _id, name, phoneNumber,uploads } = uesrPhoneNumber;
          return res.json({ token, user: { _id, name,  phoneNumber,uploads } });
        } else {
          return res.status(422).json({
            error: "Password or Phone Number is wrong",
          });
        }
      } catch (error) {
        console.log(error)
        return res.status(500).json({
          error: "Internal Server error",
        });
      }
    },
  };
}

module.exports = authController;
