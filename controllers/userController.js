const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let user = require("../models/user_schema");
const { transporter } = require("../service/email_service");

//User signup API

const userSignup = async (req, res) => {
  const { email, password } = req.body;
  const userData = new user(req.body);
  try {
    const isUserExists = await user.findOne({ email: email });
    if (isUserExists) {
      return res.status(409).json({
        status: false,
        error: "User with this email is already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(password, salt);
    const filePath = `/uploads/${req.file.filename}`;
    userData.profilePic = filePath;
    await userData.save();
    return res.status(201).json({
      success: true,
      message: "Registration successfully",
    });
  } catch (err) {
    res.status(201).json({
      status: false,
      message: err.message,
    });
  }
};
//User Login

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const isUserLogin = await user.findOne({ email: email });
  if (isUserLogin !== null) {
    const pwdConfirmation = await bcrypt.compare(
      password,
      isUserLogin.password
    );
    if (pwdConfirmation && isUserLogin) {
      const token = jwt.sign(
        { id: isUserLogin._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "10m" }
      );
      res.status(200).json({
        status: true,
        message: "Login successfully",
        token: token,
      });
    } else {
      res.status(401).json({
        status: false,
        message: "Please Enter correct username and password",
      });
    }
  } else {
    res.status(500).json({
      status: false,
      message: "this email is not registered",
    });
  }
};

// forgetPass
const forgetPassWordEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const userData = await user.findOne({ email: email });
    if (userData != null) {
      const secret = userData._id + process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ userid: userData._id }, secret, {
        expiresIn: "20m",
      });
      const link = `http://127.0.0.1:3000/api/user/reset/${userData._id}/${token}`;
      await transporter.sendMail({
        from: "sendMailer",
        to: email,
        subject: "Password Reset Request",
        html: `<a href=${link}>Click on link to reset your password `,
      });
      return res.status(201).json({
        success: true,
        message: "email send successfully",
        token: token,
        id: userData._id,
      });
    } else {
      res.status(403).json({
        success: false,
        error: "user with this email is not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
//
//Reset Passwords API

const resetPassword = async (req, res) => {
  const { userid, token } = req.params;
  const newPassword = req.body.newPassword;
  const comfirmPassword = req.body.comfirmPassword;
  try {
    const userData = await user.findById(userid);

    if (!userData) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
    const secret = userData._id + process.env.JWT_SECRET_KEY;
    jwt.verify(token, secret, async (err, data) => {
      if (err) {
        return res.status(500).json({
          status: false,
          error: err.message,
        });
      }
    });
    if (!userid) {
      return res.status(400).json({
        status: false,
        message: "Invalid user Id",
      });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);    
    userData.password = hashPassword;
    await userData.save();
    return res.status(200).json({
      status: true,
      message: "password reset successfully ",
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      error: err.message,
    });
  }
};

module.exports = {
  userSignup,
  userLogin,
  forgetPassWordEmail,
  resetPassword,
};
