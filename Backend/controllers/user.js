const User = require('../models/user')
const bcrypt = require('bcrypt');

// Signup Controller
exports.registerUser = async (req, res, next) => {
    try {
        const { password, firstName, email, lastName,profession } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new User({
            firstName,
            lastName,
            profession,
            password: hashedPassword,
            email,
            imgUrl:req.file.filename

        })
        const createdUser = await user.save()
        res.status(200).json({ createdUser })
    } catch (error) {
        return res.status(500).send('Internal server Error!!')
    }

}

exports.getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await User.find()
        res.status(200).json({ allUsers: allUsers })
    } catch (error) {
        return res.status(500).send('Internal server Error!!')
    }

}

exports.getUsersByProfession = async (req, res, next) => {
    try {
        const prof = req.params.prof
        const allUsers = await User.find({profession:prof})
        res.status(200).json({ allUsers: allUsers })
    } catch (error) {
        return res.status(500).send('Internal server Error!!')
    }

}

