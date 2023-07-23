import { BadRequestError } from "../errors/BadRequestError.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import Product from "../models/Product.js";
import fs from "fs/promises";

import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { InternalServerError } from "../errors/InternalServerError.js";

// const currentURL = import.meta.url;
// const currentPath = dirname(fileURLToPath(currentURL));

export const createProduct = async (req, res) => {
  const images = req.files.map((file) => file.filename);

  const product = await Product.create({ ...req.body, images });
  return res.json(product);
};

export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { deleteImages, addedImages } = req.body;
  const { product } = req;

  let newImages = product.images;

  req.files.forEach((file) => newImages.push(file.filename));

  if (deleteImages && deleteImages.length !== 0) {
    const isDeletedImageNamesValid = deleteImages.every((image) => product.images.includes(image));

    if (!isDeletedImageNamesValid) {
      throw new NotFoundError("images not found");
    }

    for (const deleteImg of deleteImages) {
      // absolute path
      // const path = resolve(currentPath, `../public/product-images/${deleteImg}`);

      // console.log(path);
      // console.log(`../public/product-images/${deleteImg}`);

      try {
        // fs.unlink depends on where the app is started (using relative path approach)
        await fs.unlink(`./public/product-images/${deleteImg}`);
      } catch (err) {
        console.log(err);
        throw new InternalServerError("failed to delete file");
      }

      const removedArr = newImages.filter((image) => image !== deleteImg);
      newImages = removedArr;
    }
  }

  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productId },
    {
      ...req.body,
      $set: {
        images: newImages,
      },
    },
    {
      new: true,
    }
  );

  return res.json(updatedProduct);
};

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  const deletedProduct = await Product.findOneAndDelete({ _id: productId });

  if (!deletedProduct) {
    throw new NotFoundError("product does not exist");
  }

  for (const image of deletedProduct.images) {
    const path = resolve(currentPath, `../public/product-images/${image}`);

    try {
      await fs.unlink(path);
    } catch (err) {
      throw new InternalServerError("failed to delete file");
    }
  }

  return res.json(deletedProduct);
};
