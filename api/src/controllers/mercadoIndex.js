const express = require("express");
const router = express.Router();
const { getDBDetailSales } = require("../middlewares/getAllDetailSales.js");
const PaymentController = require("../services/mercadoRoutes");
// const PaymentService = require("../services/mercadoServices");
// const PaymentInstance = new PaymentController(new PaymentService());
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

// const productsInCart = async () => {
//   let allProducts = await getDBDetailSales(112819319418963967330);
// };

// var PaymentService = async () => {
//   const car = await getDBDetailSales(112819319418963967330).then((res) =>
//     console.log("car", res)
//   );

//   let products;
//   if (Math.round(112819319418963967330)) {
//     const productDetail = await car.find(
//       (productDetail) =>
//         productDetail.productId === Math.round(112819319418963967330)
//     );
//     products = [
//       {
//         id: productDetail.productId,
//         title: productDetail.product.name,
//         description: productDetail.product.description,
//         picture_url: productDetail.product.image,
//         category_id: productDetail.product.quality,
//         quantity: productDetail.quantity,
//         unit_price: productDetail.product.price,
//       },
//     ];
//   } else {
//     products = car.map((e) => {
//       return {
//         id: e.productId,
//         title: e.product.name,
//         description: e.product.description,
//         picture_url: e.product.image,
//         category_id: e.product.quality,
//         quantity: e.quantity,
//         unit_price: Number(e.product.price),
//       };
// };

router.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});

router.get("/pay", (req, res) => {
  PaymentInstance.getPaymentLink(req, res);
});

router.get("/subscripcion", (req, res) => {
  PaymentInstance.getSubscriptionLink(req, res);
});

router.get("/generar", async (req, res) => {
  //   console.log("");
  const body = {
    payer_email: "",

    items: {
      id: 1,
      quantity: 1,
      unit_price: 100,
    },

    back_urls: {
      failure: "http://localhost:3000/",
      pending: "http://localhost:3000/",
      success: "http://localhost:3001/payments/generar",
    },

    notification_url: "hola.com",
  };

  mercadopago.preferences
    .create(body)
    .then((response) => res.json(response))
    .catch((err) => console.log(err));
});

router.get("/test", async (req, res) => {
  mercadopago.configurations.setAccessToken(process.env.ACCESS_TOKEN);

  let paymentId = req.query.payment_id;

  mercadopago.payment.capture(paymentId, mercadopago, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log("soy yo", response);
      res.json({
        hola: "hola",
        json: req.query,
        otro: res.body,
        response: response.body.notification_url,
      });
    }
  });
});

// router.get("/success/:id", (req,res) => {

// })

module.exports = router;
