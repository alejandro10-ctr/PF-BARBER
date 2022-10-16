const { Product, Image } = require("../db.js");

const getAllImage = async where => {
    return await Image.findAll(where);
}

const dbCreateImage = async ({ urlImage }, product) => {
    if (urlImage) {
        const [image, isCreated] = await Image.findOrCreate({
            where: {
                urlImage
            }
        })
        if (isCreated) {
            product.addImage(image)
            return "image created"
        }
        return "image already exists"
    } else {
        throw new Error('missing param urlImage')
    }
}
const dbDeleteImage = async id => {
    await Image.destroy({
      where: { id },
    });
    return `image id:${id} deleted successfully`

}
module.exports = {
    getAllImage,
    dbCreateImage,
    dbDeleteImage,
}