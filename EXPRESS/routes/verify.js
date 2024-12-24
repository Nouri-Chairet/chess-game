const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.get('/verify/:token', async (req, res) => {
    const token = req.params.token;

    try {
        const decoded = jwt.verify(token, process.env.EMAIL_SECRET);
        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(400).json({error: 'Invalid token'});
        }
        if(user.verified){
            return res.status(400).json({error: 'Email already verified'});
        }
        user.verified = true;
        await user.save();
        res.json({message: 'Email verified successfully'});
        res.redirect('http://localhost:5173/');
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'Server error'});
    }
} );
