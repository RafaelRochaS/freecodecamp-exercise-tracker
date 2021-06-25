const express = require("express");
const User = require("./model");
const router = express.Router();

router.get('/', async (req, res) => {
  res.send({ status: 'online' });
})

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

router.post('/users/:id/exercises', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (req.body.description) {
      user.description = req.body.description;
    }
    if (req.body.duration) {
      user.duration = req.body.duration;
    }
    if (req.body.date) {
      user.date = new Date(req.body.date).toDateString();
    } else {
      user.date = new Date().toDateString();
    }

    await user.save();
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
});

module.exports = router;