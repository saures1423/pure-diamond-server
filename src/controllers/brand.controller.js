const BrandService = require('../services/brand.service');

exports.postBrand = async (req, res) => {
	const BrandName = req.body.BrandName;

	try {
		const brand = await BrandService.create(BrandName);

		res.status(200).json({ message: 'New brand name has been added', brand });
	} catch (err) {
		if (err.code === 'ER_DUP_ENTRY') {
			return res.status(400).send({ message: 'Brand name already exists in the database' });
		}
		res.status(500).send({ message: err.message });
	}
};

exports.getAllBrand = async (_, res) => {
	try {
		const [rows, _] = await BrandService.getAllBrand();

		res.status(200).json({ rows });
	} catch (err) {
		res.status(500).send(err.message);
	}
};

exports.updateBrandById = async (req, res) => {
	const BrandName = req.body.BrandName;
	const IsActive = req.body.IsActive;
	const BrandID = req.params.BrandID;
	try {
		// const [rows, _] = await BrandService.getBrandById(BrandID);

		const [results, _] = await BrandService.updateById(BrandID, BrandName, IsActive);

		if (results?.changedRows === 0) {
			return res.status(200).send({});
		}
		res.status(200).json({ message: 'Brand has been updated' });
	} catch (err) {
		if (err.code === 'ER_DUP_ENTRY') {
			return res.status(400).send({ message: 'Brand name already exists in the database' });
		}
		res.status(500).send({ message: err.message });
	}
};

exports.deleteBrandById = async (req, res) => {
	const BrandID = req.params.BrandID;
	try {
		await BrandService.deleteBrand(BrandID);

		res.status(200).json({ message: 'Brand has been deleted.' });
	} catch (err) {
		if (err.code === 'ER_ROW_IS_REFERENCED_2') {
			return res.status(400).send({
				message: 'Brand cannot be deleted. This item is referred to by another object.',
			});
		}
		res.status(500).send({ message: err.message });
	}
};

exports.getLastID = async (req, res) => {
	try {
		const [results, _] = await BrandService.getLastID();

		res.status(200).json({ lastID: results });
	} catch (err) {
		if (err.code === 'ER_ROW_IS_REFERENCED_2') {
			return res.status(400).send({
				message: 'Brand cannot be deleted. This item is referred to by another object.',
			});
		}
		res.status(500).send({ message: err.message });
	}
};
