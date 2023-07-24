import mongoose, { Schema, model } from "mongoose";
import Product from "./Product.js";

const CartItemSchema = new Schema(
  {
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
      required: true,
    },

    price: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

CartItemSchema.index(
  { cartId: 1, productId: 1 },
  {
    unique: true,
  }
);

CartItemSchema.pre("save", async function (next) {
  const { productId, quantity } = this;

  const product = await Product.findOne({ _id: productId });

  const productPrice = product.price;

  this.price = quantity * productPrice;
  next();
});

const CartItem = model("CartItem", CartItemSchema);

export default CartItem;
