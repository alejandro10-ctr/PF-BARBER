const { Router } = require("express");
const { Product } = require("../db.js");
const {
  getAllProducts,
  getProductByPk,
  getProductByName,
} = require("../middlewares/getAllProducts");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    const apiInfo = await getAllProducts();
    if (name) {
      const byName = await getProductByName(name);
      return res
        .status(200)
        .send(
          byName.length >= 1 ? byName : "No existe un producto con ese nombre"
        );
    }
    res.status(200).send(apiInfo);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const apiInfo = await getProductByPk(id);
    res.status(200).send(apiInfo);
  } catch (error) {
    res.status(404).json({ error: "El producto con ese id no existe" });
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const { name, description, price, stock, score, image, quality } = req.body;

  try {
    const newProduct = await Product.create({
      name,
      description,
      price,
      stock,
      score,
      image,
      quality,
    });
    res.send(newProduct);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const change = req.body;
  try {
    if (id) {
      const productUpdate = await Product.update(change, { where: { id: id } });
    }
    res.status(200).send("Los cambios fueron realizados con exito");
  } catch (error) {
    res.status(404).send(error);
  }
});
//name

module.exports = router;
