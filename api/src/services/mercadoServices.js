const axios = require("axios");
const { getDBDetailSales } = require("../middlewares/getAllDetailSales.js");
const mercadopago = require("mercadopago");

// const {
//   id,
// } = require("../../../client/src/components/DetailProducts/DetailProducts.jsx");

class PaymentService {
  async createPayment(productId, userId) {
    const url = "https://api.mercadopago.com/checkout/preferences";

    // const idFront = axios.get

    // const products = await getAllProducts();

    const car = await getDBDetailSales(userId);
    let products
    if (Math.round(productId)) {
      const productDetail = await car.find(
        (productDetail) => productDetail.productId === Math.round(productId)
      );
      products = [
        {
          id: productDetail.productId,
          title: productDetail.product.name,
          description: productDetail.product.description,
          picture_url: productDetail.product.image,
          category_id: productDetail.product.quality,
          quantity: productDetail.quantity,
          unit_price: productDetail.product.price,
        },
      ];
    } else {
      products = car.map((e) => {
        return {
          id: e.productId,
          title: e.product.name,
          description: e.product.description,
          picture_url: e.product.image,
          category_id: e.product.quality,
          quantity: e.quantity,
          unit_price: Number(e.product.price),
        };
      });
    }
    
    const body = {
      payer_email: "",
      
      items: products,

      back_urls: {
        failure: "http://localhost:3000/",
        pending: "http://localhost:3000/",
        success: "http://localhost:3000/",
      },
    };
    
    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });
    return payment.data;
  }

  async createSubscription() {
    const url = "https://api.mercadopago.com/preapproval";

    const body = {
      reason: "Suscripción de ejemplo",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 10,
        currency_id: "ARS",
      },
      back_url: "https://google.com.ar",
      payer_email: "test_user_46945293@testuser.com",
    };

    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    return subscription.data;
  }
}

module.exports = PaymentService;
