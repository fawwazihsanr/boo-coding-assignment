const express = require('express');
const router = express.Router();
const User = require('../models/user')

module.exports = function() {
    router.post('/', async(req, res) => {
        const newUser = new User(req.body);

        try{
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error){
            res.status(400).json({message: error.message});
        }
    })

    return router;
}