const express = require('express');

const router = express.Router();
const sauceController = require('../controllers/sauceController');

router
  .route('/top5')
  .get(sauceController.aliasTopSauces, sauceController.getAllSauces);

router.route('/sauce-stats').get(sauceController.getStats);

router
  .route('/')
  .get(sauceController.getAllSauces)
  .post(sauceController.createSauce);

router
  .route('/:id')
  .get(sauceController.getSauce)
  .patch(sauceController.updateSauce)
  .delete(sauceController.deleteSauce);

module.exports = router;
