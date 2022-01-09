const express = require('express');
const userController = require('../controllers/user');
const multerUpload = require('../fileHandler')
const multer = require('multer');

const router = express.Router();
const upload = multer({
    storage:multerUpload.multerStorage,
    fileFilter:multerUpload.multerFilter
})

router.post('/create-user',upload.single('file'),userController.registerUser)

router.get('/users/:prof',userController.getUsersByProfession)

router.get('/get-all-users',userController.getAllUsers)


module.exports = router;