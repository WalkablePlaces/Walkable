const express = require('express');
const router = express.Router();


const loginController = require('../controllers/loginController')
const cookieController = require('../controllers/cookieController')

router.post('/signup', loginController.signUp, (req, res) => {
  res.sendStatus(201)
})

router.post('/login', loginController.login, cookieController.setCookie, (req, res) => {
  res.status(200).json(res.locals.userInfo)
})

module.exports = router