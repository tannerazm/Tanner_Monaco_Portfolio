const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  const SALT_COUNT = 10;

  bcrypt.hash(req.body.password, SALT_COUNT, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    }
    User.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    }).then((user) => {
      if (user) {
        res.json({
          message: "User already exists!",
        });
      } else {
        let user = new User({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          password: hashedPass,
        });

        user
          .save()
          .then(() => {
            res.json({
              message: "User Added Successfully",
            });
          })
          .catch((error) => {
            res.json({
              message: `${error}`,
            });
          });
      }
    });
  });
};

const login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ $or: [{ email: username }, { phone: username }] }).then(
    (user) => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            res.json({
              error: err,
            });
          }
          if (result) {
            let token = jwt.sign({ name: user.name }, process.env.JWT_SECRET, {
              expiresIn: "1y",
            });
            res.json({
              message: "Login Successful!",
              token,
            });
            return { user: user.name, token: token }
          } else {
            res.json({
              message: "Username or Password Incorrect!",
            });
          }
        });
      } else {
        res.json({
          message: "Username or Password Incorrect!",
        });
      }
    }
  );
};

module.exports = {
  register,
  login,
};
