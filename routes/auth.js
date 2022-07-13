const express = require('express');
const {
  register,
  login
} = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route("/signup").post(register);
router.route("/login").post(login);

module.exports = router;
