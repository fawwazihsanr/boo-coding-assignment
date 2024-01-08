'use strict';

const express = require('express');
const router = express.Router();
const Profiles = require('../models/profile')
const profileService = require('../services/profile')

const profiles = [
  {
    "id": 1,
    "name": "A Martinez",
    "description": "Adolph Larrue Martinez III.",
    "mbti": "ISFJ",
    "enneagram": "9w3",
    "variant": "sp/so",
    "tritype": 725,
    "socionics": "SEE",
    "sloan": "RCOEN",
    "psyche": "FEVL",
    "image": "https://soulverse.boo.world/images/1.png",
  }
];

module.exports = function() {
  router.get('/:id', async(req, res, next) => {
    try {
      const profile = await profileService.getProfileById(req.params.id);
      res.render('profile_template', {
        profile: profile
      })
    } catch (error){
      res.status(400).json({message: error.message});
    }
  })


  router.post('/', async (req, res, next) => {
    try {
      const savedProfile = await profileService.createProfile(req.body);
      res.status(201).json(savedProfile)
    } catch (error){
      res.status(400).json({message: error.message});
    }
  })
  return router;
}

