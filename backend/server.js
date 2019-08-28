const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const getSecret = require('./secret');
const Data = require('./data');

const API_PORT = 3001;
const app = express();
const router = express.Router();

mongoose.connect(getSecret('dbUri'));
const db = mongoose.connection;

/* eslint-disable no-console */
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
/* eslint-enable no-console */

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/', (req, res) => {
  res.json({ message: 'HELLOW WORLDUUHHHH' });
});

router.get('/getData', (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data });
  });
});

router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  Data.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

/* eslint-disable consistent-return */
router.post('/putData', (req, res) => {
  const data = new Data();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.message = message;
  data.id = id;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});
/* eslint-enable consistent-return */

app.use('/api', router);

/* eslint-disable no-console */
app.listen(API_PORT, () => console.log(`LISTENING ON UHH PORT ${API_PORT}`));
/* eslint-enable no-console */
