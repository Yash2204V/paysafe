const mongoose = require("mongoose");
require("dotenv").config();

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const zod = require("zod");

mongoose.connect(`mongodb+srv://${username}:${password}@paytm-clone.p9gdk.mongodb.net/?retryWrites=true&w=majority&appName=paytm-clone`)

const userSchema = zod.object({
    firstname: zod.string(),
    lastname: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6)
});

const validateUser = (user) => {
    return userSchema.safeParse(user);
};

const User = mongoose.model("User", userSchema);

module.exports = { User, validateUser };