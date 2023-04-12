const mongoose = require('mongoose');

const giftSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    url: { type: String },
    store: { type: String },
  },
  { timestamps: true }
);
const personSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gifts: [giftSchema],
  },
  { timestamps: true }
);

module.exports = {
  Person: mongoose.model('person', personSchema),
  Gift: mongoose.model('gift', giftSchema),
};
