const ItemsService = require('../services/item.service');

exports.postItem = async (req, res) => {
	// const ItemName = req.body.ItemName;
	// const ItemPrice = req.body.ItemPrice;
	// const ItemUOM = req.body.ItemUOM;
	// const BrandID = req.body.ItemName;
	// const MinStock = req.body.ItemPrice;
	// const ReorderQty = req.body.ItemUOM;
	// const IsActive = req.body.ItemUOM;
	console.log('🚀 ~ file: item.controller.js:14 ~ exports.postItems= ~ req.body', req.body);

	try {
		await ItemsService.create(req.body);

		res.status(200).json({ message: 'New inventory item has been added.' });
	} catch (err) {
		if (err.code === 'ER_DUP_ENTRY') {
			return res
				.status(400)
				.send({ message: 'Inventory item name already exists in the database.' });
		}
		res.status(500).send({ message: err.message });
	}
};
