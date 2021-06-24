const express = require("express");
const TestModel = require("./model");
const router = express.Router();

router.get('/test', async (req, res) => {
  const tests = await TestModel.find();
  res.send(tests);
});

// router.post('/test', )

module.exports = router;