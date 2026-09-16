const express = require('express');
const { readJSON } = require('../utils/dataStore');
const router = express.Router();

// GET /api/menu
router.get('/', async (req, res) => {
  const menu = await readJSON('menu.json');
  res.json(menu);
});

module.exports = router;
