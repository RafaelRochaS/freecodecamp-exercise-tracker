const express = require("express");
const User = require("./model");
const router = express.Router();

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

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
    let userExercises;

    if (user.exercises) {
      userExercises = user.exercises;
    } else {
      userExercises = [];
    }

    userExercises.push({
      description: req.body.description,
      duration: req.body.duration,
      date: (req.body.date) ? new Date(req.body.date).toDateString() : new Date().toDateString()
    });

    user.exercises = userExercises;

    await user.save();
    res.send({
      _id: req.params.id,
      username: user.username,
      date: userExercises[userExercises.length - 1].date,
      duration: req.body.duration,
      description: req.body.description
    });
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
});

router.get('/users/:id/logs', async (req, res) => {
  try {
    const results = await User.find({ _id: req.params.id });
    if (req.query.to && req.query.from) {
      if (isValidDate(toDate)) { // credit https://github.com/npwilliams09/FCC-Back-End/blob/master/Excercise%20Tracker/server.js
        results = results.filter((item) => (item.date >= fromDate && item.date <= toDate));
      } else if (isValidDate(fromDate)) {
        results = results.filter((item) => (item.date >= fromDate))
      }
    }
    let log = [results]
    console.log(`Results: ${results}`);
    if (req.query.limit) {
      console.log(`Limit: ${limit} type: ${typeof limit}`)
      log = log.splice(0, parseInt(limit));
    }
    res.send({ log: log, count: log.length });
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
});

module.exports = router;