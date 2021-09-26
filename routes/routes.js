const express = require('express');
const router = express.Router();

const numController = require('../controllers/number');

router.get("/numbers", numController.get_all_num);
router.get("/numbers/:id", numController.get_num);
router.post("/numbers", numController.add_num);
router.delete("/numbers/:id", numController.delete_num);

module.exports = router;