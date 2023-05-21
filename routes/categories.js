var express = require('express');
var router = express.Router();

/* GET categories listing. */
// /categories/
router.get('/', function(req, res, next) {

});
// /categories/ 
router.get('/:id', function(req, res, next) {

});


// GET /categories?take=<nombre>&skip=<offset>
router.get('/', (req, res) => {
});

// GET /categories/:id
router.get('/:id', (req, res) => {

});

// POST /categories
router.post('/', (req, res) => {
});

// PATCH /categories
router.patch('/', (req, res) => {
});

// DELETE /categories/:id
router.delete('/:id', (req, res) => {
});

module.exports = router;


