const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  requiredFund: Number,
});

module.exports = mongoose.model('Campaign', campaignSchema);
