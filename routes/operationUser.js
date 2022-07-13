const express = require('express');
const {
  getall,
  check,
  updateUsers,
  updateOne
} = require('../controllers/operationUser');

const router = express.Router();

const { protect,authorize } = require('../middleware/auth');

router.route("/getall").post(getall);
router.route("/check").post(protect,authorize("USER"),check)
router.route("/updateUsers").post(updateUsers)
router.route("/updateOne").post(protect,updateOne)

module.exports = router;
