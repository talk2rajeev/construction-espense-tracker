const express = require('express');
const workerController = require('../controllers/workerController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/worker', authMiddleware, workerController.createWorker);
router.get('/workers', authMiddleware, workerController.getWorkerList);
router.get('/worker/:id', authMiddleware, workerController.getWorkerById);
router.put('/worker', authMiddleware, workerController.updateWorker);
router.delete('/worker', authMiddleware, workerController.deleteWorker);

module.exports = router;