const mongoose = require("mongoose");

const payment = new mongoose.Schema({
    vendor_name: {
        type: String,
        required: true
    },
    vendor_phone_number: {
        type: Number,
        required: true
    },
    payment_description: {
        type: String,
        required: true
    },
    total_payment: {
        type: Number,
        required: true
    },
    advance_payment: {
        type: Number,
        required: true
    },
    balance_payment: {
        type: Number,
        required: true
    },
    payment_date: {
        type: String,
        required: true
    },
    due_date: {
        type: String,
        required: true
    },
    receipt_url: {
        type: String,
    },
    other_details: {
        type: String
    }
});

module.exports = mongoose.model("payment", payment);