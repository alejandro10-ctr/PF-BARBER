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
  description: "This product has an extraordinary and modern design. It features an easy and quick system to replace blades. It can be adjusted in 6 different positions. 1 to 2 recommended for beginners. Progressively when you will fill confident adjust it at higher numbers to provide you a more aggressive and closer shave.",
},
{
  name: "Edwin Jagger Marfil",
  price: 4230,
  quality: "premium",
  stock: 9,
  image: "https://www.giftsandcare.com/9786-large_default/maquinilla-de-afeitar-clasica-plaza-edwin-jagger-marfil.jpg",
  score: 5,
  description: 'The safety razor with an open tooth comb has been developed specially for practised wet shavers. Due to the principle of its construction, which features a special blade angle, the new model allows a vigorous, very direct shaving technique. As on safety razors with closed combs, the curved blade is exposed and clamped in place by the curvature of the cap. '
},
{
  name: "Brosh Super Hard Gel 200gr",
  price: 137,
  quality: "basic",
  stock: 11,
  image: "https://www.giftsandcare.com/14216-large_default/brosh-super-hard-gel-200gr.jpg",
  score: 3,
  description: "This product offers a modern fresh fern aroma which has been specially formulated for Sensitive Skin. This gel will certainly help those gentlemen who have trouble with damage to the skin whilst shaving."
},
{
  name: "Mühle Double Edge Safety Razor R89 Rose Gold Close Comb",
  price: 2340,
  quality: "premium",
  stock: 9,
  image: "https://www.giftsandcare.com/1621-large_default/muehle-double-edge-safety-razor-r89-rose-gold-close-comb-.jpg",
  score: 5,
  description: "Exclusive limited editions of shaving brushes, 'basic' brushes with all types of hair, shaving accessories and a new line of after shaves with a markedly classic character, which renews and improves the essence of the authentic barbershop."
},
{
  name: "Fatip Chrome Slant Double Edge Safety Razor",
  price: 820,
  quality: "premium",
  stock: 2,
  image: "https://www.giftsandcare.com/17239-large_default/fatip-chrome-slant-double-edge-safety-razor.jpg",
  score: 3,
  description: "The cap of the razor can be released with a simple twist of the small wheel at the end of the handle. The open comb remains firmly attached to the handle. Used blades can then be removed safely and replaced with new ones. "
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
  description: "A fully adjustable razor for any skin type and stubble length. Cast from premium high-end chromed zinc alloys with a striking White Chrome finish"
},
{
  name: "Baxter of California Shave Tonic",
  price: 776,
  quality: "premium",
  stock: 12,
  image: "https://www.giftsandcare.com/9869-large_default/dear-barber-shave-oil-30ml.jpg",
  score: 2,
  description: "The first hair lotion from Barber Mind, good for the scalp and helps to get thick and healthy hair. The fresh pines and their menthol and eucaliptus contained in the formula, give it properties for a healthier scalp. It also helps refrain hair loss."
},
{
  name: "Captain Fawcett Barberism Pre-Shave Oil 50ml",
  price: 678,
  quality: "basic",
  stock: 8,
  image: "https://www.giftsandcare.com/9427-large_default/aceite-pre-afeitado-barberism-captain-fawcett-50ml.jpg",
  score: 5,
  description: "Pre/post shave Myrsol Emulsion that prepares and protects skin before shaving. It moisturizes and toning the skin. It also, soothes and refresh after shaving."
},
{
  name: "Hey Joe Pre Shave Oil 50ml",
  price: 5655,
  quality: "premium",
  stock: 7,
  image: "https://www.giftsandcare.com/7783-large_default/hey-joe-pre-shave-oil-50ml.jpg",
  score: 1,
  description: "Since 1957, Osma offers to customer’s high quality products dedicated to wet shaving. In respect to the craft traditions, rigorous selection of our raw materials, choice of natural ingredients are the values which we always put forward in the creation of our products."
},
{
  name: "After Shave BeardLovers",
  price: 4545,
  quality: "basic",
  stock: 5,
  image: "https://www.giftsandcare.com/3022-large_default/piedra-de-alumbre-natural-osma-75-gr.jpg",
  score: 3,
  description: "Pre/post shave Myrsol Emulsion that prepares and protects skin before shaving. It moisturizes and toning the skin. It also, soothes and refresh after shaving."
},
{
  name: "Cella Milano Bio Aloe Vera After Shave Balm 100ml",
  price: 655,
  quality: "premium",
  stock: 4,
  image: "https://www.giftsandcare.com/13418-large_default/cella-milano-bio-aloe-vera-after-shave-balm-100ml.jpg",
  score: 2,
  description: "An invigorating, fresh composition with oakmoss and mint fragrances. Obtained from aloe plants in the coastal regions of Spain. Selected natural ingredients soothe and refresh the skin. Aloe Vera regenerates and moisturises. The lotion relieves any irritation and prevents dryness."
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
