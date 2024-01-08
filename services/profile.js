const Profile = require('../models/profile');

const getProfileById = async (id) => {
    return await Profile.findById(id);
}

const createProfile = async (data) => {
    const newProfile = new Profile(data);
    return await newProfile.save();
}

module.exports = {getProfileById, createProfile}