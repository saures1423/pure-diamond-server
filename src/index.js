const app = require('./config/express');

app.listen(1500, () => {
	console.log(`Server running on port ${1500}`);
});

module.exports = app;
