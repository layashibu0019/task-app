const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: "Welcome to Node Docker Practice App 🚀"
  });
});

router.get('/health', (req, res) => {
  res.json({ status: "OK" });
});

router.get('/env', (req, res) => {
  res.json({
    node_env: process.env.NODE_ENV || "not set"
  });
});

module.exports = router;
