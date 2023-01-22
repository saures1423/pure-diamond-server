const db = require('../config/database');

class BrandService {
	// constructor(BrandName) {
	// 	this.BrandName = BrandName;
	// }
	static create = async (BrandName) => {
		if (BrandName === null || BrandName.trim() === '') {
			throw new Error('All fields are required. Please ensure all fields are completed');
		}

		return db.execute(`INSERT INTO tbl_brand (BrandName) VALUES (?)`, [BrandName]);
	};

	static getAllBrand = async () => {
		return db.execute('SELECT * FROM tbl_brand');
	};

	static updateById = async (id, updatedBrandName, isActive) => {
		if (updatedBrandName === null || updatedBrandName.trim() === '') {
			throw new Error('All fields are required. Please ensure all fields are completed');
		}

		return db.execute(`UPDATE tbl_brand SET BrandName = ?, isActive = ? WHERE BrandID = ? `, [
			updatedBrandName,
			isActive,
			id,
		]);
	};

	static deleteBrand = async (id) => {
		return db.execute(`DELETE FROM tbl_brand WHERE BrandID = ?`, [id]);
	};
}

module.exports = BrandService;
