const db = require('../config/database');

class ItemsService {
	static create = async (itemData) => {
		for (const key in itemData) {
			if (itemData[key] === '' || itemData[key] === null) {
				throw new Error('All fields are required. Please ensure all fields are completed');
			}
		}
		return db.execute(
			`INSERT INTO tbl_items (ItemName,ItemPrice,ItemUOM,BrandID,MinStock,ReorderQty,IsActive) VALUES (TRIM(?),TRIM(?),TRIM(?),TRIM(?),TRIM(?),TRIM(?),TRIM(?))`,
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

	static getItemById = async (id) => {
		return db.execute(`SELECT * FROM tbl_items WHERE ItemID = ?`, [id]);
	};

	static update = async (id, itemData) => {
		return db.query(
			`UPDATE tbl_items SET ItemName = TRIM(?), ItemPrice = TRIM(?), 
			ItemUOM = TRIM(?), BrandID = ?, MinStock = TRIM(?),
			ReorderQty = TRIM(?), IsActive = ? WHERE ItemID = ?`,
			[
				itemData.ItemName,
				itemData.ItemPrice,
				itemData.ItemUOM,
				itemData.BrandID,
				itemData.MinStock,
				itemData.ReorderQty,
				itemData.IsActive,
				id,
			]
		);
	};
	static deleteItem = async (id) => {
		return db.execute(`DELETE FROM tbl_items WHERE ItemID = ?`, [id]);
	};
}

module.exports = ItemsService;
