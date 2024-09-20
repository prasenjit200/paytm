const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

const UserSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxLength: 50,
  },
  LastName: {
    type: String,
    required: true,
    minlength: 3,
    maxLength: 50,
  },
  Username: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  Password: {
    type: String,
    required: true,
    trim: true,
    maxLength: 500,
  },
});

const AccountDetails = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model('Account', AccountDetails);
const User = mongoose.model('User', UserSchema);

module.exports = { User, Account };
