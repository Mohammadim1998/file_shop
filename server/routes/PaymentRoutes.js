const express = require('express');
const router = express();
const { check } = require('express-validator');

const PaymentCtrl = require('../controllers/PaymentCtrl');

router.get("/payments", PaymentCtrl.getAllPayments);
router.get("/not-viewed-payments",PaymentCtrl.getAllNotViewedPayments);
router.post("/update-payment/:id", [
    check("username", "تعداد کارکتر نام کاربری باید 8 تا 20 کارکتر باشد...").isLength({ min: 8, max: 20 }),
    check("resnumber", "تعداد کارکتر کد پرداخت باید بیشتر از 15 کارکتر باشد...").isLength({ min: 15 }),
    check("email", "فرمت ایمیل اشتباه است...").isEmail(),
    check("amount", "فرمت مبلغ اشتباه است...").isNumeric(),
    check("payed", "فرمت پرداخت شدن اشتباه است...").isBoolean(),
    check("products", "فرمت محصولات قابل پرداخت اشتباه است...").isArray(),
    check("viewed", "فرمت چک شدن اشتباه است...").isBoolean(),
],PaymentCtrl.updatePayment);
router.post("/delete-payment/:id", PaymentCtrl.deletePayment);
// for admin
router.get("/get-payment/:id", PaymentCtrl.getOnePaymentById);


router.post("/new-payment", PaymentCtrl.newPayment);
router.post("/payment-result-check", PaymentCtrl.paymentResultCheck);



module.exports = router;