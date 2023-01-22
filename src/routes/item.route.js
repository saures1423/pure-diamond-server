const express = require('express');
const { postItem, updateItem, getAllItems, deleteItem } = require('../controllers/item.controller');
const router = express.Router();

/**
 *  /item
 */
router.route('/').post(postItem).get(getAllItems);

router.route('/:ItemID').patch(updateItem).delete(deleteItem);

module.exports = router;
