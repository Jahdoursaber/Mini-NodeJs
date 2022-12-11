const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    libelle: { type: String, required: true  },
    prix: { type: Number, required: true },
    description: {type: String, required: true },
    quantite: {type: Number, required: true},

  },
  { timestamps: true }
);
module.exports = mongoose.model("products", productSchema, "products");