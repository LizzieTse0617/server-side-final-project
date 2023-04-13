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

    //TODO: right now, we have to add a ownerId to let database know which person is signing in with their token
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    dateOfBirth: { type: Date, required: true },
    gifts: [giftSchema],
  },
  { timestamps: true }
);

module.exports = {
  Person: mongoose.model('person', personSchema),
  Gift: mongoose.model('gift', giftSchema),
};
