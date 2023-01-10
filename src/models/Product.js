import mongoose, { Schema } from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    nameProduct: {
      type: String,
      require: true,
    },
    productCode: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      require: true,
    },

    imageProduct: {
      type: [String],
      require: true,
    },

    bestSeller: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
    },
    oldPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);
ProductSchema.index({ nameProduct: "text", brand: "text" });

export default mongoose.model("Product", ProductSchema);
