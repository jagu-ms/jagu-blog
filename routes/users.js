var express = require('express');
var router = express.Router();

const controller = require('../controllers/userController');
/* GET users listing. */


router.post('/',controller.create );

router.get('/',controller.list);

router.get('/:id',controller.show);

router.put('/:id',controller.update);

router.delete('/:id',controller.delete);


module.exports = router;
