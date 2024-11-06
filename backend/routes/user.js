const express = require("express");
const router = express.Router();

const { User, Account } = require("../db");
const { z } = require("zod");

const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const { authMiddleware, authTokenMiddleware } = require("../middleware");

const userSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    password: z.string()
});

router.post("/signup", async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    const { success, error } = userSchema.safeParse(req.body);
    if (!success || error) {
        return res.status(411).json({
            message: "Email already taken/ Incorrect Input",
        });
    }
    try {
        const existingUser = await User.findOne({ email: email }); // Use req.body.email
        if (existingUser) {
            return res.status(411).json({
                message: "Email already taken/ Incorrect Input"
            });
        }

        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                const user = await User.create({ 
                    firstname, 
                    lastname, 
                    email, 
                    password: hash
                });

                const userId = user._id;
                await Account.create({
                    userId: userId,
                    balance: 1 + Math.random()*10000
                });
                
                var token = jwt.sign({ userId }, JWT_SECRET);
                // res.cookie("token", token);
                res.json({
                    message: "User created successfully",
                    token: token
                });
            });
        });
        
    } catch (err) {
        console.error("Error finding user:", err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

const signinBody = z.object({
    email: z.string().email(),
	password: z.string()
})

router.post("/signin", async (req, res) => {
    const { success, error } = signinBody.safeParse(req.body);
    if (!success || error) {
        return res.status(411).json({
            message: "Email already taken/ Incorrect Input",
        });
    }
    const { email, password } = req.body;
    const user = await User.findOne({
        email: email
    });
    
    try{
        bcrypt.compare(password, user.password, async function(err, result) {
            if (result == false) {
                res.status(411).json({
                    message: "SignUp First/ Incorrect Input"
                });
    
            }else{
                const userId = user._id;
                var token = jwt.sign({ userId }, JWT_SECRET);
                // res.cookie("token", token);
                
                res.json({
                    message: "User login successfully",
                    token: token
                });    
            }
        });
    } catch(err){
        return res.status(500).json({
            message: "Internal Server Error",
            error: err
        });
    }
});

router.post("/logout", authMiddleware, (req,res)=>{
    res.cookie("token", "");
    res.json({
        message: "Logout successfully",
    });
})

const updateSchema = z.object({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    password: z.string().optional()
})

router.put("/", authMiddleware, async (req, res)=>{
    const {success, error} = updateSchema.safeParse(req.body);
    if(!success || error){
        return res.status(411).json({
            message: "Incorrect Input",
        });
    }
    
    const userId = req.userId;
    try {
        const user = await User.findOneAndUpdate({ _id: userId }, req.body );
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.status(200).json({
            message: "Updated successfully",
            user: user
        });
    } catch (err) {
        console.error("Error updating user:", err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
})

router.get("/bulk", authMiddleware, async (req, res)=>{
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter,
                "$options": "i"
            }
        }, {
            lastname: {
                "$regex": filter,
                "$options": "i"
            }
        }]
    })
    res.json({
        user: users.map(user => {
            return {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                _id: user._id,
            }
        })
    })
})

module.exports = router;