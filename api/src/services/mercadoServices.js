const axios = require("axios");
const {
  getProductByPk,
  getAllProducts,
} = require("../middlewares/getAllProducts.js");

// const {
//   id,
// } = require("../../../client/src/components/DetailProducts/DetailProducts.jsx");

class PaymentService {
  async createPayment(productId) {
    const url = "https://api.mercadopago.com/checkout/preferences";

    // const idFront = axios.get

    // const products = await getAllProducts();

    const product = await getProductByPk(productId)

    const products = [
      {
        title: product,
        description: "Esta es una Crema para la barba premium",
        picture_url:
          "https://images.philips.com/is/image/philipsconsumer/e2c57450f26a40fa8accae7700c13b18?$jpglarge$&wid=960",
        category_id: "Premium",
        quantity: 1,
        unit_price: 500,
      },
    ];

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
