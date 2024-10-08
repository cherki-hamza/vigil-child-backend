const express = require('express');
const { getDeviceDataByParentId } = require('../controllers/deviceController');

const router = express.Router();


// route for get the device data by parent id
router.get('/:parentId', getDeviceDataByParentId);

// test data
//router.get('/:parentId/', testdata);

module.exports = router;