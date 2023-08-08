const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: String,
  items: [
    {
      dish_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish' },
      quantity: Number
    }
  ],
  timestamp: Date
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
