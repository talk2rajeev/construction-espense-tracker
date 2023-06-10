const express = require('express');
const vendorController = require('../controllers/vendorController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/vendor', authMiddleware, vendorController.createVendor);
router.get('/vendors', authMiddleware, vendorController.getVendorList);
router.get('/vendor/:id', authMiddleware, vendorController.getVendorById);
router.put('/vendor', authMiddleware, vendorController.updateVendor);
router.delete('/vendor', authMiddleware, vendorController.deleteVendor);

module.exports = router;