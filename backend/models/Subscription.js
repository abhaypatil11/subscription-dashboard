const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  serviceName: {
    type: String,
    required: true
  },

  cost: {
    type: Number,
    required: true
  },

  billingCycle: {
    type: String,
    enum: ['monthly', 'yearly'],
    required: true
  },

  nextBillingDate: {
    type: Date,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
