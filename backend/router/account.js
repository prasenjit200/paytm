const express = require("express");
const { authMiddleware } = require("../middleware");
const AuthController = require("../AuthController");
const Account = require("../database").Account;
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.json({ balance: account.balance });
    } catch (error) {
        res.status(500).json({ message: "Error fetching balance", error: error.message });
    }
});

router.post("/transfer", authMiddleware, AuthController.transfer);

module.exports = router;
