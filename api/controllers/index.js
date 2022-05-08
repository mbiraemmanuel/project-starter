const express = require('express');
const router = express.Router();


// Load each controller
const postsController = require('./posts.js');
const machineController = require('./machine.js');
const jobController = require('./job.js');
const contactController = require('./contact.js');
const appConfigController = require('./appConfig.js');

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
router.use('/posts', postsController);
router.use('/machine', machineController);
router.use('/jobs', jobController);
router.use('/contact', contactController);
router.use('/application-configuration', appConfigController);


module.exports = router;