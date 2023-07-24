import { BadRequestError } from "../errors/BadRequestError.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import Cart from "../models/Cart.js";
import CartItem from "../models/CartItem.js";
import mongoose from "mongoose";

export const getCart = async (req, res) => {
  const { username, userId, role, isGoogleUser } = req.user;

  // const cart = await Cart.findOne({ userId }).populate({
  //   path: "items",
  //   populate: {
  //     path: "productId",
  //   },
  // });
  const cart = await Cart.findOne({ userId }).populate("items").populate("productId");

  if (!cart) {
    throw new NotFoundError("cart not found");
  }

  let totalPrice = 0;
  // cart.items.forEach((item) => {
  //   totalPrice += item.productId.price * item.quantity;
  // });

  // TODO : refactor and use mongodb aggregate instead

  return res.json({ ...cart._doc, totalPrice });
};

export const addCart = async (req, res) => {
  const { username, userId, role, isGoogleUser } = req.user;

  const { productId, quantity } = req.body;

  if (!productId) {
    throw new BadRequestError("productId can not be empty");
  }
  if (!quantity) {
    throw new BadRequestError("quantity can not be empty");
  }

  const cart = await Cart.findOne({
    userId,
  });

  if (!cart) {
    throw new NotFoundError("cart not found");
  }

  const cartItem = await CartItem.create({ cartId: cart._id, productId, quantity });

  const updatedCart = await Cart.findOneAndUpdate(
    { userId },
    {
      $push: {
        items: cartItem._id,
      },
    },
    {
      new: true,
    }
  );

  return res.json(updatedCart);
};

export const updateCart = async (req, res) => {
  const { username, userId, role, isGoogleUser } = req.user;

  const { productId, quantity } = req.body;

  if (!productId) {
    throw new BadRequestError("productId can not be empty");
  }
  if (!quantity) {
    throw new BadRequestError("quantity can not be empty");
  }

  const cart = await Cart.findOne({
    userId,
  });

  if (!cart) {
    throw new NotFoundError("cart not found");
  }

  // Returns prev data (not updated)
  // const prevCartItem = await CartItem.findOne({
  //   cartId: cart._id,
  //   productId,
  // });

  // if (!prevCartItem) {
  //   throw new NotFoundError("cart item not found");
  // }

  // const productPrice = prevCartItem.price / prevCartItem.quantity;

  // const newPrice = productPrice * quantity;

  const updatedCartItem = await CartItem.findOneAndUpdate(
    { cartId: cart._id, productId },
    { quantity },
    {
      new: true,
    }
  );

  // const priceDiff = updatedCartItem.price - prevCartItem.price;

  //   console.log(`product price : ${productPrice}`);
  //   console.log(`new price : ${newPrice}`);
  //   console.log(`diff price : ${priceDiff}`);

  // const updatedCart = await Cart.findOneAndUpdate(
  //   {
  //     _id: cart._id,
  //   },
  //   {
  //     $inc: {
  //       price: priceDiff,
  //     },
  //   },
  //   {
  //     new: true,
  //   }
  // );

  return res.json({ updatedCartItem });
};
