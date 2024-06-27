const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account, Transaction, User } = require('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});

router.post("/transfer", authMiddleware, async (req, res) => {
    //const session = await mongoose.startSession();
    

    //session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    //const account = await Account.findOne({ userId: req.userId }).session(session);
    const account = await Account.findOne({ userId: req.userId });
    
    if (!account || account.balance < amount) {
        //await session.abortTransaction();
        
        return res.status(411).json({
            message: "Insufficient balance",
            success:false,
        });
    }
    
    //const toAccount = await Account.findOne({ userId: to }).session(session);
    const toAccount = await Account.findOne({ userId: to });

    if (!toAccount) {
        //await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account",
            success:false,
        });
    }

    await Transaction.create({
        senderId:req.userId,
        receiverId:to,
        amount:amount
    });

    // Perform the transfer
    //await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    //await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } });
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } });

    // Commit the transaction
    //await session.commitTransaction();
    res.json({
        message: "Transfer successful",
        success:true,
    });
});

router.get("/history",authMiddleware,async (req,res)=>{
    const history = await Transaction.find({
        $or:[
            {senderId:req.userId},
            {receiverId:req.userId}
        ]
    }).populate("receiverId").populate("senderId");
    const user = await User.findById({_id:req.userId});
    return res.status(200).json({
        history,
        user
    })
})

module.exports = router;