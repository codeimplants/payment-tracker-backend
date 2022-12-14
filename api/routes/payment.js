const express = require("express");
const router = express.Router();
const paymentModel = require("../models/addPayment");

// Get All Payment Data
router.get("/getPaymentDetails", async (req, res) => {
    const getAllPaymentData = await paymentModel.find();
    if (getAllPaymentData) {
        return res.status(200).json(getAllPaymentData);
    } else {
        return res.status(401).json({ error: "Something Went Wrong!!!" });
    }
});

router.post("/updateItemDetails", async (req, res) => {
    const paymentDetails = {
        vendor_name: req.body.vendor_name,
        vendor_phone_number: req.body.vendor_phone_number,
        payment_description: req.body.payment_description,
        total_amount: req.body.total_amount,
        advance_payment: req.body.advance_payment,
        balance_payment: req.body.balance_payment,
        receipt_url: req.body.receipt_url,
        other_details: req.body.other_details
    };

    const updatepaymentDetails = await paymentModel.findOneAndUpdate(req.body._id, paymentDetails, { new: true })
    updatepaymentDetails.save().then((ele) => {
        return res.status(200).json({ msg: "Payment Details has been updated successfully!!", details: ele });
    })
        .catch((error) => {
            return res.status(401).json({ error: "Something Went Wrong!!" });
        })
});

// Add Payment Details
router.post("/addPaymentDetails", async (req, res) => {
    const vendorExist = await paymentModel.findOne({ vendor_phone_number: req.body.vendor_phone_number });
    if (vendorExist) return res.status(401).json({ error: "Vender is already exists with this phone number." });

    const newPayment = new paymentModel(req.body);
    newPayment.save().then((result) => {
        return res.status(200).json({ msg: "Payment Details Added successfully!!", details: result });
    })
        .catch((error) => {
            console.log("error", error)
            return res.status(401).json({ error: "Something Went Wrong!!!" });
        });
});

// Delete Payment Details
router.get('/deletePaymentDetails/:id', function (req, res, next) {
    paymentModel.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            return res.status(200).json({ msg: "Payment Details has been deleted successfully!!" });
        } else {
            console.log("639a25f048ee8bc1bafda12c", err)
            return res.status(401).json({ error: "Something Went Wrong!!" });
        }
    })
})

module.exports = router;