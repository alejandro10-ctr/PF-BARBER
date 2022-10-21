const express = require("express")
const router = express.Router()

const PaymentController = require("../services/mercadoRoutes")
const PaymentService = require("../services/mercadoServices")
const PaymentInstance = new PaymentController(new PaymentService());

router.get("/", (req, res) => {
    res.render("index", {title: "Express"})
})

router.get("/pay", (req,res) => {
    PaymentInstance.getPaymentLink(req, res)
})

router.get("/subscripcion", (req,res) => {
    PaymentInstance.getSubscriptionLink(req, res)
})

module.exports = router