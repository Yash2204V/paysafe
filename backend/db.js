const mongoose = require("mongoose");
require("dotenv").config();

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@paytm-clone.p9gdk.mongodb.net/?retryWrites=true&w=majority&appName=paytm-clone`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 10,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true
    }

});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = { User, Account };