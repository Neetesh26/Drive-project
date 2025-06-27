const express = require('express');
const router = express.Router();
const {body ,validationResult} = require('express-validator')


router.get('/register', (req, res) => {
    res.render('register');
})

router.post('/register', 
    body('email').trim().isEmail().isLength({ min : 7 }).withMessage('Please enter a valid email address'),
    body('password').trim().isLength({min : 6}).withMessage('Password must be at least 6 characters long'),
    body('username').trim().isLength({min : 3}).withMessage('Username must be at least 3 characters long'),
    (req, res) => {

        const errors = validationResult(req)
        
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message : "Invallid data"
            })
        }
    
})

module.exports = router;