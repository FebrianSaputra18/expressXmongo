const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads' });
const productController = require('./controller');

router.get('/product', productController.index);
router.get('/product/:id', productController.view);
router.patch("/product/:id", productController.update);
router.post('/product', upload.single('image'), productController.store);
router.delete('/product/:id', productController.destroy);

module.exports = router