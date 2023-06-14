const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController')
const favoriteController = require('../controllers/favoriteController')


router.post('/getLocationResults', apiController.addressToLocation, apiController.getLocationResults, apiController.walkingDistance, favoriteController.checkDatabase, (req, res) => {
// console.log(res.locals.rawData);
res.status(200).json({places: res.locals.rawData});
})


router.post('/addFavorite', favoriteController.addFavorite, (req, res) => {
  res.sendStatus(200);
});

router.get('/getAllFavorites', favoriteController.getAllFavorites, (req, res) => {
const { data } = res.locals;
res.status(200).json({data: data});
});

router.delete('/deleteFavorite', favoriteController.deleteFavorite, (req, res) => {
  res.sendStatus(200);
});


module.exports = router