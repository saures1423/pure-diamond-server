const express = require('express');
const { postItem } = require('../controllers/item.controller');
const router = express.Router();

/**
 *  /item
 */
router.route('/').post(postItem);

module.exports = router;
