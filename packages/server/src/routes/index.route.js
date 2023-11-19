const express = require('express');
const httpStatus = require('http-status');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(httpStatus.OK).send({ success: true, message: 'Real Chat Api' });
});

module.exports = router;
