const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true,
        trim: true
    },
    price: { 
        type: Number, 
        required: true,
        min: 0
    },
    image: { 
        type: String, 
        required: true 
    },
    description: {
        type: String,
        default: "Premium jewelry product"
    },
    stock: { 
        type: Number, 
        default: 10,
        min: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
