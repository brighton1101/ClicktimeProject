var express = require('express');
var router = express.Router();

let sample_data = require('../../sample_data/data.json');
let sample_images = require('../../sample_data/images.json');

/* GET movie info */
router.get('/', function(req, res, next) {
	res.status(200);
	res.json(JSON.stringify(sample_data));
	res.send();
});

/* GET movie images */
router.get('/images', function(req, res, next) {
	res.status(200);
	res.json(JSON.stringify(sample_images));
	res.send();
});

module.exports = router;
