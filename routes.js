const express = require("express");
const User = require("./model");
const router = express.Router();

router.get('/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.get('/users/:id', async (req, res) => {
  try {
    const test = await User.findOne({ _id: req.params.id });
    res.send(test);
  } catch {
    res.status(404);
    res.send({ error: 'User not found.' });
  }
});


router.post('/users', async (req, res) => {
  const user = new User({
    username: req.body.username,
  });
  console.log(user);

  await user.save();
  res.send(user);
});

module.exports = router;