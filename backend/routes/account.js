const express = require("express");
const router = express.Router();
const { Account, User } = require("../db");
const mongoose = require("mongoose");
const { authMiddleware, authTokenMiddleware } = require("../middleware");
const { z } = require("zod");



router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({ userId: req.userId });
    const user = await User.findOne({ _id: req.userId });    
    if (!account || !user) {
        return res.status(404).json({
            message: "Account or user not found"
        });
    }

    res.json({
        balance: account.balance.toFixed(2),
        firstname: user.firstname
    });
});


const transfer = z.object({
    amount: z.number().positive(),
    to: z.string()
})

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    try {    
        session.startTransaction();
        const { success, error } = transfer.safeParse(req.body);
        if (!success || error) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid Input"
            });
        }
        const { amount, to } = req.body;

        //Fetch the amount within the transaction
        const account = await Account.findOne({ userId: req.userId }).session(session);
        if(!account || account.balance < account) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);
        if(!toAccount){
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid Account"
            }); 
        }

        // Perform the transfer
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        // Commit the transaction
        await session.commitTransaction();
        res.status(200).json({
            message: "Transfer successful"
        });

    } catch(e){
        await session.abortTransaction();
        res.status(404).json({
            message: "Transfer failed",
            error: e
        });
    }
})

module.exports = router;