const db = require('../config/database');

class BrandService {
	// constructor(BrandName) {
	// 	this.BrandName = BrandName;
	// }
	static create = async (BrandName) => {
		if (BrandName === null || BrandName.trim() === '') {
			throw new Error('All fields are required. Please ensure all fields are completed');
		}

		return db.execute(`INSERT INTO tbl_brand (BrandName) VALUES (TRIM(?))`, [BrandName]);
	};

	static getAllBrand = async () => {
		return db.execute('SELECT * FROM tbl_brand');
	};

	static getBrandById = async (BrandID) => {
		return db.execute(`SELECT * FROM tbl_brand WHERE BrandID = ?`, [BrandID]);
	};

	static getLastID = async () => {
		await db.execute('analyze table tbl_brand;');

		return db.execute(`SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = 'tbl_brand' AND table_schema = DATABASE();
`);
	};

	static updateById = async (id, updatedBrandName, isActive) => {
		if (updatedBrandName === null || updatedBrandName.trim() === '') {
			throw new Error('All fields are required. Please ensure all fields are completed');
		}

		return db.execute(`UPDATE tbl_brand SET BrandName = TRIM(?), IsActive = ? WHERE BrandID = ?`, [
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
