import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { backendURL } from "../App";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add = ({ token }) => {
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
  const [imagePreviews, setImagePreviews] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const sizes = ["S", "M", "L", "XL", "XXL"];
  const imageKeys = ["image1", "image2", "image3", "image4"];

  // Handle image selection
  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setImages((prev) => ({ ...prev, [key]: file }));
      setImagePreviews((prev) => ({
        ...prev,
        [key]: URL.createObjectURL(file),
      }));
    }
  };

  // Toggle sizes
  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Handle form submission
  const onSubmit = async (data) => {
    if (selectedSizes.length === 0) {
      toast.error("Please select at least one size.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("subCategory", data.subCategory);
      formData.append("price", data.price);
      formData.append("bestseller", data.bestseller || false);
      formData.append("sizes", JSON.stringify(selectedSizes));

      // Append images from state
      Object.keys(images).forEach((key) => {
        if (images[key]) formData.append(key, images[key]);
      });

      // Optional: Log FormData for debugging
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const res = await axios.post(
        backendURL + "/api/product/add",
        formData,
        { headers: { token } }
      );

      console.log("Backend Response:", res.data);
      toast.success("Product added successfully!");

      // Reset form and images
      reset();
      setImages({ image1: null, image2: null, image3: null, image4: null });
      setImagePreviews({ image1: null, image2: null, image3: null, image4: null });
      setSelectedSizes([]);

    } catch (err) {
      console.error("Submit failed:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-start gap-3 px-4"
      >
        {/* Images */}
        <div>
          <p className="mb-2">Upload Image</p>
          <div className="flex flex-wrap gap-4">
            {imageKeys.map((key) => (
              <label key={key} htmlFor={key} className="cursor-pointer">
                <img
                  src={imagePreviews[key] || assets.upload_area}
                  alt=""
                  className="w-20 h-20 object-cover"
                />
                <input
                  key={imagePreviews[key]} // force re-render to clear input
                  type="file"
                  id={key}
                  accept="image/*"
                  hidden
                  onChange={(e) => handleImageChange(e, key)}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Name */}
        <div className="w-full">
          <p className="mb-2">Product Name</p>
          <input
            type="text"
            placeholder="Type product name here"
            className="w-full max-w-[500px] px-3 py-2"
            {...register("name", { required: "Product name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="w-full">
          <p className="mb-2">Product Description</p>
          <textarea
            className="w-full max-w-[500px] px-3 py-2"
            placeholder="Write product description"
            rows={4}
            {...register("description", { required: "Description is required" })}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Category & Sub Category */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div>
            <p className="mb-2">Product Category</p>
            <select
              className="w-full px-3 py-2"
              {...register("category", { required: "Category is required" })}
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
            )}
          </div>
          <div>
            <p className="mb-2">Sub Category</p>
            <select
              className="w-full px-3 py-2"
              {...register("subCategory", { required: "Sub category is required" })}
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
            {errors.subCategory && (
              <p className="text-red-500 text-xs mt-1">{errors.subCategory.message}</p>
            )}
          </div>
        </div>

        {/* Price */}
        <div>
          <p className="mb-2">Product Price</p>
          <input
            type="number"
            className="w-full px-3 py-2 sm:w-[120px]"
            placeholder="25"
            {...register("price", { required: "Price is required", min: 1 })}
          />
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Sizes */}
        <div>
          <p className="mb-2">Product Size</p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <div key={size} onClick={() => toggleSize(size)}>
                <p
                  className={`px-3 py-1 cursor-pointer ${
                    selectedSizes.includes(size) ? "bg-pink-200" : "bg-slate-200"
                  }`}
                >
                  {size}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bestseller */}
        <div className="flex gap-2 mt-2">
          <input type="checkbox" id="bestseller" {...register("bestseller")} />
          <label htmlFor="bestseller" className="cursor-pointer">
            Add to bestseller
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-28 py-3 mt-4 bg-black text-white disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Adding..." : "ADD"}
        </button>
      </form>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Add;