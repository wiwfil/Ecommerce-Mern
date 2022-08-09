const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const CryptoJS = require("crypto-js");
const Store = require("../models/Store");

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }
  try {
    const updatedStore = await Store.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedStore);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/addproduct/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedStore = await Store.findByIdAndUpdate(
      req.params.id,
      {
        $push: { products: req.body },
      },
      { new: true }
    );

    res.status(200).json(updatedStore);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Store.findByIdAndDelete(req.params.id);
    res.status(200).json("Store has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await Store.findById(req.params.id);
    const { password, ...others } = Store._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const stores = query
      ? await Store.find().sort({ _id: -1 }).limit(5)
      : await Store.find();
    res.status(200).json(stores);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
