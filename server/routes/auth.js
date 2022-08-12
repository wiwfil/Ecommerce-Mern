const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Register
router.post("/signup", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalpassword !== req.body.password) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC
    );

    const { password, ...others } = user._doc;

    res.cookie("token", accessToken, { httpOnly: true ,secure: true, sameSite: 'none'});
    const userInfo = { ...others, accessToken };

    res.status(200).json(userInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/logout", async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 2, httpOnly: true });
    res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
