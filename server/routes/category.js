const Category = require("../models/Category");
const { verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newCategory = new Category({
    title: req.body.title,
    img: req.body.img,
  });
  try {
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ sold: -1 });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/popular", async (req, res) => {
  try {
    const categoriesByPopularity = await Category.find()
      .sort({ sold: -1 })
      .limit(4);

    res.status(200).json(categoriesByPopularity);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
