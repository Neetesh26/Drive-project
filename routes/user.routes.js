const express = require('express');
const router = express.Router();
const {body ,validationResult} = require('express-validator')
const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');

router.get('/register', (req, res) => {
    res.render('register');
})

router.post('/register', 
    body('email').trim().isEmail().isLength({ min : 7 }).withMessage('Please enter a valid email address'),
    body('password').trim().isLength({min : 6}).withMessage('Password must be at least 6 characters long'),
    body('username').trim().isLength({min : 3}).withMessage('Username must be at least 3 characters long'),
    async (req, res) => {

        const errors = validationResult(req)
        
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message : "Invallid data"
            })
        }
        const { username, email, password } = req.body;

        const hashPassword = await bcrypt.hash(password , 10);

        const user = new UserModel({
            username,
            email,
            password: hashPassword
        });
            //userModel.create✅
        await user.save().then(() => {
                console.log("User registered successfully");
            })
            .catch((err) => {
                console.error("Error registering user:", err);
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
        );

        // If user registration is successful, send a success response
        res.json({ message: "User registered successfully",
            user: user
        })
})

module.exports = router;