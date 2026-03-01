import mongoose from "mongoose";

// Schema pour le modèle Order
const orderSchema = new mongoose.Schema({
  items: [
    {
      albumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Albums",
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      priceValue: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "paid", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Création et exportation du modèle
const Order = mongoose.model("Order", orderSchema);

export default Order;
