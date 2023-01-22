const ItemsService = require('../services/item.service');

exports.postItem = async (req, res) => {
	// const ItemName = req.body.ItemName;
	// const ItemPrice = req.body.ItemPrice;
	// const ItemUOM = req.body.ItemUOM;
	// const BrandID = req.body.ItemName;
	// const MinStock = req.body.ItemPrice;
	// const ReorderQty = req.body.ItemUOM;
	// const IsActive = req.body.ItemUOM;

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

exports.getAllItems = async (_, res) => {
	try {
		const [rows, _] = await ItemsService.getAllItems();

		res.status(200).json({ rows });
	} catch (err) {
		res.status(500).send(err.message);
	}
};

exports.updateItem = async (req, res) => {
	try {
		const ItemID = req.params.ItemID;

		await ItemsService.update(ItemID, req.body);

		res.status(200).json({ message: 'Inventory item has been updated.' });
	} catch (err) {
		if (err.code === 'ER_DUP_ENTRY') {
			return res
				.status(400)
				.send({ message: 'Inventory item name already exists in the database.' });
		}
		res.status(500).send({ message: err.message });
	}
};

exports.deleteItem = async (req, res) => {
	const ItemID = req.params.ItemID;
	try {
		await ItemsService.deleteItem(ItemID);

		res.status(200).json({ message: 'Inventory has been deleted' });
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};
