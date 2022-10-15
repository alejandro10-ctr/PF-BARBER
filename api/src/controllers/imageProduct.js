const { Router } = require("express");
const { getAllProducts, getProductByPk, getProductByName, dbCreateProduct, dbUpdateProduct, dbDeleteProduct } = require("../middlewares/getAllProducts");
const { getAllImage, dbCreateImage, dbDeleteImage } = require('../middlewares/getAllImages')

const router = Router();



router.get('/:id', async (req, res) => {
    try {
        const product = await getProductByPk(req.params.id)
        const images = product.images
        res.status(200).send(images);
    } catch (error) {
        res.status(404).send(error.message);
    }
})

router.post("/:id", async (req, res) => {
    try {
        const product = await getProductByPk(req.params.id)
        const createdImage = await dbCreateImage(req.body, product);
        res.send(createdImage);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = router;