// routes/orgRoutes.js
const express = require('express');
const { createOrganisation, getOrganisations } = require('../controllers/orgController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/api/organisations', getOrganisations);
router.post('/api/organisations', createOrganisation);

module.exports = router;
