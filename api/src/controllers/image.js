const { Router } = require("express");
const imageProductController = require('../controllers/imageProduct')
const { getAllImage, dbCreateImage, dbDeleteImage} = require('../middlewares/getAllImages')

const router = Router();

router.get('/', async (req, res) => {
    try {
      const products = await getAllImage()
      res.status(200).send(products);
    } catch (error) {
      res.status(404).send(error.message);
    }
  })
  router.delete('/:id', async (req, res) => {
    try {
      const deletedImage = await dbDeleteImage(req.params.id)
      res.status(200).send(deletedImage);
    } catch (error) {
      res.status(404).send(error.message);
    }
  })
  router.use('/product',imageProductController)

module.exports = router;