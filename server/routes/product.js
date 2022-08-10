const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const Product = require("../models/Product");

//Create
router.post("/", verifyTokenAndAuthorization, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    const similarProducts = await Product.find({
      _id: {
        $nin: req.params.id,
      },
      categories: {
        $in: product.categories,
      },
    }).limit(4);
    res.status(200).json({ product, similarProducts });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/popular", async (req, res) => {
  console.log("work")
  try {
    const productsByPopularity = await Product.find()
      .sort({ soldCount: -1 })
      .limit(4);
    res.status(200).json(productsByPopularity);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  let sortQ;
  const sort = req.query.sort || "popularity";
  const productsPerPage = 10;
  const page = req.query.page;
  const qColor = req.query.color;
  const qPrice = req.query.price;
  const qInStock = req.query.instock === "true" ? true : false;
  if (qPrice) {
    prices = qPrice.split("-");
  }
  const qCategory = req.query.category;
  const search = req.query.term || "";

  const filter = {};
  if (search) {
    filter.title = {};
    filter.title.$regex = search;
  }
  if (qCategory) {
    filter.categories = {
      $in: qCategory.split(","),
    };
  }
  if (qColor) {
    filter.color = { $in: qColor.split(",") };
  }
  if (qInStock) {
    filter.inStock = qInStock;
  }
  if (qPrice) {
    filter.price = { $gte: Number(prices[0]), $lte: Number(prices[1]) };
  }

  if (sort === "lh") {
    sortQ = { price: 1 };
  } else if (sort === "hl") {
    sortQ = { price: -1 };
  } else {
    sortQ = { soldCount: -1 };
  }

  try {
    let allProducts;
    allProducts = await Product.find(filter);
    let products = await Product.find(filter)
      .sort(sortQ)
      .limit(productsPerPage * page);

    let pageSize = Math.ceil(allProducts.length / productsPerPage);

    res.status(200).json({ products, pageSize });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
