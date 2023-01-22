const express = require('express');
const router = express.Router();

const {
	postBrand,
	getAllBrand,
	updateBrandById,
	deleteBrandById,
} = require('../controllers/brand.controller');

/**
 *  /brand
 */
router.route('/').post(postBrand).get(getAllBrand);

router.route('/:BrandID').patch(updateBrandById).delete(deleteBrandById);

module.exports = router;
