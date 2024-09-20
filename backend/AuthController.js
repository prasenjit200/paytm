const {User,Account} = require("./database");
const { validationRule } = require("./validate");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
dotenv.config();

const AuthController = {
register: async (req, res) => {
    try {
        const { FirstName, LastName, Username, Password } = req.body;

        // Validate input
        const validationResult = validationRule.safeParse({FirstName,LastName,Username,Password });
        if (!validationResult.success) {
            return res.status(400).json({
                message: "Validation error",
                error: validationResult.error.errors,
            });
        }
        const existingUser = await User.findOne({ Username });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(Password, 10);

        // Create the new user
        const newUser = await User.create({
            FirstName,
            LastName,
            Username,
            Password: hashedPassword, // Use the hashed password
        });
        await Account.create({
            userId: newUser._id,
            balance: 1 + Math.random() * 1000,
        });

        res.status(201).json({
            message: "New user created successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
},


    signin: async (req, res) => {
        try {
            const JWT_SECRET = process.env.JWT_SECRET;
            const { Username, Password,FirstName,LastName } = req.body;

            const validationResult = validationRule.safeParse({ Username, Password,FirstName,LastName });
            if (!validationResult.success) {
                return res.status(400).json({
                    message: "Validation error",
                    error: validationResult.error.errors,
                });
            }

            const user = await User.findOne({ Username, Password });
            if (!user) {
                return res.status(401).json({
                    message: "Invalid credentials",
                });
            }

            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        }
    },
    
    update: async (req, res) => {
        try {
            const { Username, Password, FirstName, LastName } = req.body;
            const validationResult = validationRule.safeParse({ Username, Password, FirstName, LastName });

            if (!validationResult.success) {
                return res.status(400).json({ message: "Validation failed!" });
            }

            await User.updateOne({ _id: req.userId }, req.body);
            res.status(200).json({ message: "User updated successfully!" });
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    },
    filter: async (req, res) => {
        try {
            const filter = req.query.filter || "";

            const Users = await User.find({
                $or: [
                    {
                        FirstName: {
                            $regex: filter,
                            $options: "i", 
                        },
                    },
                    {
                        LastName: {
                            $regex: filter,
                            $options: "i",
                        },
                    },
                ],
            });

            res.status(200).json({
                users: Users.map((user) => ({
                    Username: user.Username,
                    FirstName: user.FirstName,
                    LastName: user.LastName,
                    _id: user._id,
                })),
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    },
    transfer: async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { amount, to } = req.body;

            const account = await Account.findOne({ userId: req.userId }).session(session);
            if (!account || account.balance < amount) {
                await session.abortTransaction();
                return res.status(400).json({ message: "Insufficient balance" });
            }

            const toAccount = await Account.findOne({ userId: to }).session(session);
            if (!toAccount) {
                await session.abortTransaction();
                return res.status(400).json({ message: "Invalid account" });
            }

            account.balance -= amount;
            toAccount.balance += amount;

            await account.save({ session });
            await toAccount.save({ session });

            await session.commitTransaction();
            res.status(200).json({ message: "Transfer successful!" });
        } catch (error) {
            await session.abortTransaction();
            res.status(500).json({ message: "Transfer failed", error: error.message });
        } finally {
            session.endSession();
        }
    },
};

module.exports = AuthController;
