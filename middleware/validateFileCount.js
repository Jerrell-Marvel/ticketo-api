import { UnprocessableEntityError } from "../errors/UnprocessableEntityError.js";
import Product from "../models/Product.js";
import { fileUpload } from "./fileUpload.js";
export const validateFileCount = async (req, res, next) => {
  const { productId } = req.params;
  console.log(req.files);
  //   return res.json(req.files);
  next();

  //   console.log(req.);

  //   const asyncFileUpload = () => {
  //     return new Promise((resolve, reject) => {
  //       fileUpload("./public/product-images").array("product-images", 12)(req, res, (err) => {
  //         if (err) {
  //           reject(err);
  //         }

  //         resolve();
  //       });
  //     });
  //   };

  //   await asyncFileUpload();

  //   const product = await Product.findOne({ _id: productId });

  //   const imagesCount = product.images.length;

  //   if (imagesCount + req.files.length > 5) {
  //     throw new UnprocessableEntityError("file numbers exceeded 12");
  //   }
  //   return res.json(req.files);

  //   fileUpload("./public/product-images").array("product-images", 12)(req, res, async function (err) {
  //     const product = await Product.findOne({ _id: productId });

  //     const imagesCount = product.images.length;

  //     if (imagesCount + req.files.length > 5) {
  //       throw new UnprocessableEntityError("file numbers exceeded 12");
  //     }
  //     return res.json(req.files);
  //   });

  //   return res.json(req.files);
};
