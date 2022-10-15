const { Router } = require("express");
const { getAllProducts, getProductByPk, getProductByName, dbCreateProduct, dbUpdateProduct, dbDeleteProduct } = require("../middlewares/getAllProducts");
const { getAllImage, dbCreateImage, dbDeleteImage} = require('../middlewares/getAllImages')

const router = Router();


router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const productByName = await getProductByName(name);
      res.status(200).json(productByName);
      return
    }
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await getProductByPk(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const createdProduct = await dbCreateProduct(req.body);
    res.send(createdProduct);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await dbUpdateProduct(req.body, req.params.id);
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await dbDeleteProduct(req.params.id)
    res.status(200).send(deletedProduct);
  } catch (error) {
    res.status(404).send(error.message);
  }
})


router.get('/:id/images', async (req, res) => {
  try {
    const products = await getAllImage()
    res.status(200).send(products);
  } catch (error) {
    res.status(404).send(error.message);
  }
})

router.post("/:id/images", async (req, res) => {
  try {
    const product = await getProductByPk(req.params.id)
    const createdImage = await dbCreateImage(req.body, product);
    res.send(createdImage);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.delete('/:id/images/:imageId', async (req, res) => {
  try {
    const deletedImage = await dbDeleteImage(req.params.imageId)
    res.status(200).send(deletedImage);
  } catch (error) {
    res.status(404).send(error.message);
  }
})
module.exports = router;
