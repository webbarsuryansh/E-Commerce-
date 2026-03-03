const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name:     String,
    image:    String,
    price:    Number,
    quantity: Number
  }],
  shippingAddress: {
    street:  String,
    city:    String,
    state:   String,
    zip:     String,
    country: String
  },
  paymentMethod:  { type: String, required: true },
  itemsPrice:     { type: Number, required: true },
  taxPrice:       { type: Number, required: true },
  shippingPrice:  { type: Number, required: true },
  totalPrice:     { type: Number, required: true },
  isPaid:         { type: Boolean, default: false },
  paidAt:         Date,
  isDelivered:    { type: Boolean, default: false },
  deliveredAt:    Date,
  status: {
    type: String,
    enum: ['Pending','Processing','Shipped','Delivered','Cancelled'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);