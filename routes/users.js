 const router = require('express').Router();


 /* GET users listing. */
router.get('/', async function(req, res, next) {
  res.send("hello");
});

router.get('/:id', async function(req, res, next) {
 
});

router.get('/:id/articles', async function(req, res, next) {

});

router.post('/', async function(req, res, next) {

});


router.put('/', async function(req, res, next) {

});

router.delete('/', async function(req, res, next){

})

module.exports = router;
