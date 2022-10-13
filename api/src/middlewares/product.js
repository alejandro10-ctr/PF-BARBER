const {Router} = require('express')
const {Product} = require('../db.js')
const {getAllProducts, getProductByPk} = require('../controllers/getAllProducts.js')

const router = Router();

router.get('/', async (req,res) => {
    try {
        const apiInfo = await getAllProducts();
        res.status(200).send(apiInfo)
    } catch (error) {
        res.status(404).send(error)
        console.log(error)
    }
})

router.get('/:id', async (req,res) => {
    try {
        const id = req.params.id
        const apiInfo = await getProductByPk(id);
        res.status(200).send(apiInfo)
    } catch (error) {
        res.status(404).json({"error": "El producto con ese id no existe"})
        console.log(error)
    }
})

router.post('/', async (req,res)=> {

    const {name,description,price,stock,score,image,quality} = req.body

    
    try {
        const newProduct = await Product.create({
            name,
            description,
            price,
            stock,
            score,
            image,
            quality
        })
        res.send(newProduct)
    } catch (error) {
        res.status(404).json(error.message)
    }
})

module.exports = router;