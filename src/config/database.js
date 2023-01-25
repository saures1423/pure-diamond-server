const mysql = require('mysql2');

const pool = mysql.createPool({
	host: process.env.HOST,
	user: process.env.USER,
	database: process.env.DB_NAME,
	password: process.env.PASS,
});

pool.getConnection((err, connection) => {
	if (err) {
		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
			console.error('Database connection was closed.');
		}
		if (err.code === 'ER_CON_COUNT_ERROR') {
			console.error('Database has too many connections.');
		}
		if (err.code === 'ECONNREFUSED') {
			console.error('Database connection was refused.');
		}
	}
	if (connection) {
		connection.query('SELECT * FROM tbl_brand', (error, results, fields) => {
			connection.release();
			if (error) {
				console.error(error);
				return;
			}
			console.log(results);
		});
	}
});
module.exports = pool.promise();
