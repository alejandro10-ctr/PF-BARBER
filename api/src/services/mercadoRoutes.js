class PaymentController {
  constructor(subscriptionService) {
    this.subscriptionService = subscriptionService;
  }

  async getPaymentLink(req, res) {
    try {
      const payment = await this.subscriptionService.createPayment(req.query.productId, req.query.userId);

      return res.json(payment);
    } catch (error) {
      return res
        .status(500)
        .send(error.message);
    }
  }

  async getSubscriptionLink(req, res) {
    try {
      const subscription = await this.subscriptionService.createSubscription();

      return res.json(subscription);
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ error: true, msg: "Failed to create subscription" });
    }
  }
}

module.exports = PaymentController;