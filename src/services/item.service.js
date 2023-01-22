const db = require('../config/database');

class ItemsService {
	static create = async (itemData) => {
		for (const key in itemData) {
			if (itemData[key] === '' || itemData[key] === null) {
				throw new Error('All fields are required. Please ensure all fields are completed');
			}
		}
		return db.execute(
			`INSERT INTO tbl_items (ItemName,ItemPrice,ItemUOM,BrandID,MinStock,ReorderQty,IsActive) VALUES (?,?,?,?,?,?,?)`,
			[
				itemData.ItemName,
				itemData.ItemPrice,
				itemData.ItemUOM,
				itemData.BrandID,
				itemData.MinStock,
				itemData.ReorderQty,
				itemData.IsActive,
			]
		);
	};
	static getAllItems = async () => {
		return db.execute('SELECT * FROM tbl_items');
	};

	static update = async (id, itemData) => {
		return db.execute(`UPDATE tbl_items SET ItemName = ? WHERE ItemID = ?`, [
			itemData.ItemName,
			id,
		]);
	};
	static deleteItem = async (id) => {
		return db.execute(`DELETE FROM tbl_items WHERE ItemID = ?`, [id]);
	};
}

module.exports = ItemsService;
