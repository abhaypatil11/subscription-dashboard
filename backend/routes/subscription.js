const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getAllSubscriptions,
  addSubscription,
  updateSubscription,
  deleteSubscription
} = require('../controllers/subscriptionController');

router.use(authMiddleware); 


router.get('/', getAllSubscriptions);
router.post('/', addSubscription);
router.put('/:id', updateSubscription);
router.delete('/:id', deleteSubscription);

module.exports = router;
