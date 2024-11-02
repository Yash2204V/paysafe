const express = require("express");
const router = express.Router();
const { Account } = require("../db");
const mongoose = require("mongoose");
const { authMiddleware } = require("../middleware");

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({ userId: req.userId });

    res.json({
        balance: account.balance
    })
});

const transferFunds = async(fromAccountId, toAccountId, amount) => {
    // Decrement the balance of the fromAccountId
    await Account.findIdAndUpdate(fromAccountId, {$inc: {balance: -amount}});

    // Increment the balance of the toAccountId
    await Account.findIdAndUpdate(toAccountId, {$inc: {balance: amount}});
}

// transferFunds('fromAccountId', 'toAccountId', 1000);

module.exports = router;