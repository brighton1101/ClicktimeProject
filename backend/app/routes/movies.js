var express = require('express');
var router = express.Router();

let sample_data = require('../../sample_data/data.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.json(JSON.stringify(sample_data));
	res.send();
});

module.exports = router;
