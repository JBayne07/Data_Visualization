const express = require('express');
const router = express.Router();

const numController = require('../controllers/number');

router.get("/numbers", numController.getAllNum);
router.get("/numbers/:id", numController.getNum);
router.post("/numbers", numController.addNum);
router.delete("/numbers/:id", numController.deleteNum);

module.exports = router;