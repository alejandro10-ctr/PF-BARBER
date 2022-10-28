const { Product, Image } = require("../db.js");
const { Op } = require("sequelize");

const JSONUsers = [{
  name: "Beard Balm",
  price: 200,
  quality: "premium",
  stock: 7,
  image: "https://http2.mlstatic.com/D_NQ_NP_2X_959303-MLA51602582272_092022-F.webp",
  score: 3,
  description:' It is a high-quality concentrated shaving cream with a high proportion of glycerin for a smooth and moisturizing shave. The cream can be applied by brush or by hand, this action produces a rich, abundant lather that softens the beard for a quick and comfortable shave. ',
}, {
  name: "Mühle Razor Gillette® Fusion Vivo Series Plumtree",
  price: 5400,
  quality: "basic",
  stock: 6,
  image: "https://www.giftsandcare.com/12277-home_default_carousel/muehle-razor-gillette-fusion-vivo-series-plumtree.jpg",
  score: 4,
},
{
  name: "Edwin Jagger Marfil",
  price: 4230,
  quality: "premium",
  stock: 9,
  image: "https://www.giftsandcare.com/9786-large_default/maquinilla-de-afeitar-clasica-plaza-edwin-jagger-marfil.jpg",
  score: 5,
},
{
  name: "Brosh Super Hard Gel 200gr",
  price: 137,
  quality: "basic",
  stock: 11,
  image: "https://www.giftsandcare.com/14216-large_default/brosh-super-hard-gel-200gr.jpg",
  score: 3,
},
{
  name: "Mühle Double Edge Safety Razor R89 Rose Gold Close Comb",
  price: 2340,
  quality: "premium",
  stock: 9,
  image: "https://www.giftsandcare.com/1621-large_default/muehle-double-edge-safety-razor-r89-rose-gold-close-comb-.jpg",
  score: 5,
},
{
  name: "Fatip Chrome Slant Double Edge Safety Razor",
  price: 820,
  quality: "premium",
  stock: 2,
  image: "https://www.giftsandcare.com/17239-large_default/fatip-chrome-slant-double-edge-safety-razor.jpg",
  score: 3,
},
{
  name: "Omega Garnet Shaving Bowl",
  price: 2543,
  quality: "basic",
  stock: 4,
  image: "https://www.giftsandcare.com/6329-large_default/brocha-de-afeitar-pelo-sintetico-roja-omega-s10018.jpg",
  score: 1,
},
{
  name: "Fatip Piccolo Gold Slant Close Open Double Edge Safety Razor",
  price: 987,
  quality: "basic",
  stock: 8,
  image: "https://www.giftsandcare.com/16511-large_default/fatip-piccolo-gold-slant-close-open-double-edge-safety-razor.jpg",
  score: 4,
},
{
  name: "Baxter of California Shave Tonic",
  price: 776,
  quality: "premium",
  stock: 12,
  image: "https://www.giftsandcare.com/9869-large_default/dear-barber-shave-oil-30ml.jpg",
  score: 2,
},
{
  name: "Captain Fawcett Barberism Pre-Shave Oil 50ml",
  price: 678,
  quality: "basic",
  stock: 8,
  image: "https://www.giftsandcare.com/9427-large_default/aceite-pre-afeitado-barberism-captain-fawcett-50ml.jpg",
  score: 5,
},
{
  name: "Hey Joe Pre Shave Oil 50ml",
  price: 5655,
  quality: "premium",
  stock: 7,
  image: "https://www.giftsandcare.com/7783-large_default/hey-joe-pre-shave-oil-50ml.jpg",
  score: 1,
},
{
  name: "After Shave BeardLovers",
  price: 4545,
  quality: "basic",
  stock: 5,
  image: "https://www.giftsandcare.com/3022-large_default/piedra-de-alumbre-natural-osma-75-gr.jpg",
  score: 3,
},
{
  name: "Cella Milano Bio Aloe Vera After Shave Balm 100ml",
  price: 655,
  quality: "premium",
  stock: 4,
  image: "https://www.giftsandcare.com/13418-large_default/cella-milano-bio-aloe-vera-after-shave-balm-100ml.jpg",
  score: 2,
}
]

const getAllProducts = async () => {
  let products = await Product.findAll({
    include: Image,
    order: [
        ['id', 'ASC']
    ]
  });
  if (!products.length) {
    products = await Product.bulkCreate(JSONUsers, { validate: true });
  }
  return products;
};

const getProductByPk = async (id) => {
  const product = await Product.findOne({
    where: {
      id
    },
    include: Image
  });

  if (!product) {
    throw new Error("product not found");
  }
  return product;
};

const getProductByName = async (name) => {
  const product = await Product.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    order: [
        ['id', 'ASC']
    ]
  });
  if (!product.length) {
    throw new Error("product not found");
  }

  return product;
};
const dbCreateProduct = async (info) => {
  await Product.create(info)
  return `product ${info.name} created successfully`
}
const dbUpdateProduct = async (info, id) => {
  const [response] = await Product.update(
    info,
    {
      where: {
        id,
      },
    }
  );
  if (response) {
    return `product id:${id} updated successfully`;
  } else {
    throw new Error("product not found");
  }
}
const dbDeleteProduct = async (id) => {
  await Product.destroy({
    where: { id },
    include: { model: Image },
  });
  return `product id:${id} deleted successfully`
};
module.exports = {
  getAllProducts,
  getProductByPk,
  getProductByName,
  dbCreateProduct,
  dbUpdateProduct,
  dbDeleteProduct,
};
