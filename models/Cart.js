import mongoose, { Schema, model } from "mongoose";

const CartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    items: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "CartItem",
    },
  },
  {
    timestamps: true,
  }
);

const Cart = model("Cart", CartSchema);

export default Cart;
