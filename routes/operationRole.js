const express = require('express');
const {
  create,
  removeAccess
} = require('../controllers/operationRole');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route("/create").post(create);
router.route("/removeAccess").post(removeAccess);

module.exports = router;
