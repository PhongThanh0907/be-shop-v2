import asyncHandler from "express-async-handler";

import {
  getProducts,
  createProduct,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../services/Product.js";

export const getProductsHandler = asyncHandler(async (req, res) => {
  const { searchText, max, brand, sort, type } = req.query;
  const products = await getProducts({ searchText, type, max, brand, sort });
  res.status(200).json(products);
});

export const getProductHandler = asyncHandler(async (req, res) => {
  const product = await getProductById(req.params.id);
  res.status(200).json(product);
});

export const createProductHandler = asyncHandler(async (req, res) => {
  const createdProduct = await createProduct(req.body);
  res.status(200).json(createdProduct);
});

export const deleteProductHandler = asyncHandler(async (req, res) => {
  await deleteProduct(req.params.id);
  res.status(200).json({
    message: `Product ${req.params.id} have been deleted`,
  });
});

export const updateProductHandler = asyncHandler(async (req, res) => {
  const product = await updateProduct(req.params.id, req.body);
  res.status(200).json(product);
});
