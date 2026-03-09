import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    console.log(
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller
    );

    const images = [image1, image2, image3, image4].filter(
      (img) => img !== undefined
    );

    const imagesURL = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path);
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price,
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      image: imagesURL,
      bestseller: bestseller === "true" ? true : false,
      date: Date.now(),
    };

    const newProduct = new productModel(productData);
    await newProduct.save();

    res.json({ success: true, message: "Product Added" });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    console.log("Removed Item ID:", req.body.id);

    await productModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Product removed" });

  } catch (error) {
    res.json({ success: false, message: error.message }); // fixed
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await productModel.findById(productId);

    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };