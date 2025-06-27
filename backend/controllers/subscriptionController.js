const Subscription = require('../models/Subscription');

exports.getAllSubscriptions = async (req, res) => {
  try {
    const userId = req.user.userId ; 
    const subs = await Subscription.find({ userId });
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addSubscription = async (req, res) => {
  try {
    
    const { serviceName, cost, billingCycle, nextBillingDate, category } = req.body;
    const userId = req.user.userId; 

    const newSub = new Subscription({
      userId,
      serviceName,
      cost,
      billingCycle,
      nextBillingDate,
      category
    });

    const saved = await newSub.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Subscription.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    await Subscription.findByIdAndDelete(id);
    res.json({ message: 'Subscription deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
