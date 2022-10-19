const axios = require("axios");

class PaymentService {
  async createPayment() {
    const url = "https://api.mercadopago.com/checkout/preferences";

    const body = {
      payer_email: "TETE5428764",
      items: [
        {
          title: "Afeitadora",
          description: "Esta es una afeitadora premium",
          picture_url: "https://images.philips.com/is/image/philipsconsumer/e2c57450f26a40fa8accae7700c13b18?$jpglarge$&wid=960",
          category_id: "Premium",
          quantity: 1,
          unit_price: 5400
        }
      ],
      back_urls: {
        failure: "http://localhost:3000/shop",
        pending: "http://localhost:3001/pending",
        success: "http://localhost:3001/success"
      }
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
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
        currency_id: "ARS"
      },
      back_url: "https://google.com.ar",
      payer_email: "test_user_46945293@testuser.com"
    };

    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return subscription.data;
  }
}

module.exports = PaymentService;