const router = require("express").Router();
const Products = require("../models/products");

router.route("/").get((req, res) => {
  Products.find()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.route("/get/:id").get(async (req, res) => {
  let userId = req.params.id;

  try {
    let product = await Products.findById(userId);
    res.status(200).send({ status: "Product Fetched", product: product });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error with get user", error: err.message });
  }
});
module.exports = router;
