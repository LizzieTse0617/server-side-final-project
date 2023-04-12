const { Schema, model } = require("mongoose");

const pokemonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  abilities: [
    {
      type: String,
    },
  ],
},
{
  timestamps: true,
}


);

module.exports = model("pokemon", pokemonSchema);
