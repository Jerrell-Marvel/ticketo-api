import Product from "../../models/Product.js";
import { NotFoundError } from "../../errors/NotFoundError.js";

export const getProductData = async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new NotFoundError("product does not exist");
  }
  req.product = product;
  next();
};
