import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState(null);
  const [size, setSize] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [isVisible, setIsVisible] = useState(false);

  const { productId } = useParams();
  const { product, addtoCart } = useContext(shopContext);

  useEffect(() => {
    // Reset all state whenever productId changes so old data doesn't flash
    setProductData(null);
    setImage(null);
    setSize(null);
    setIsVisible(false);
    setActiveTab("description");

    const ProductInfo = product.find((item) => item._id === productId);
    if (ProductInfo) {
      setProductData(ProductInfo);
      setImage(ProductInfo.image[0]);
      setTimeout(() => setIsVisible(true), 10);
    }

    // Scroll to top when navigating to a new product
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId, product]);

  if (!productData) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div
      className={`max-w-6xl mx-auto px-4 py-8 transition-all duration-500 ${
        isVisible
          ? "opacity-100 translate-y-0 blur-0"
          : "opacity-0 translate-y-4 blur-sm"
      }`}
    >
      {/* Product Top Section */}
      <section className="flex flex-col sm:flex-row gap-8 mb-5">
        {/* Left: Thumbnails + Main Image */}
        <div className="flex gap-3 flex-1">
          {/* Thumbnail Column */}
          <div className="flex flex-col gap-2 w-36 shrink-0">
            {productData?.image?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumbnail-${index}`}
                onClick={() => setImage(img)}
                className={`w-36 object-cover object-center cursor-pointer border-2 rounded transition-all duration-200 ${
                  image === img ? "border-gray-400" : "border-transparent"
                } hover:border-gray-300`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 max-w-[420px] h-[500px] rounded overflow-hidden">
            <img
              src={image}
              alt="product"
              className="w-full h-full object-contain object-top"
            />
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl font-medium text-gray-800 leading-snug">
            {productData.name}
          </h1>

          <div className="flex items-center gap-1">
            <img src={assets.star_icon} alt="star" className="w-4 h-4" />
            <img src={assets.star_icon} alt="star" className="w-4 h-4" />
            <img src={assets.star_icon} alt="star" className="w-4 h-4" />
            <img src={assets.star_icon} alt="star" className="w-4 h-4" />
            <img src={assets.star_dull_icon} alt="star" className="w-4 h-4" />
            <span className="text-sm text-gray-500 ml-1">(122)</span>
          </div>

          <p className="text-2xl font-medium text-gray-900">
            Rs{productData.price}
          </p>

          <p className="text-sm text-gray-600 leading-relaxed max-w-md">
            {productData.description}
          </p>

          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold text-gray-700">Select Size</h2>
            <div className="flex gap-2 flex-wrap">
              {productData.sizes.map((btnSize) => (
                <button
                  key={btnSize}
                  onClick={() => setSize(btnSize)}
                  className={`w-12 h-12 text-sm font-medium border rounded transition-all duration-150 ${
                    btnSize === size
                      ? "border-orange-400 bg-white text-gray-900"
                      : "border-gray-200 bg-gray-100 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {btnSize}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              addtoCart(productData._id, size);
            }}
            className="mt-2 w-40 py-3 bg-gray-900 text-white text-sm font-medium tracking-wide uppercase hover:bg-gray-700 transition-colors duration-200 rounded-sm"
          >
            Add to Cart
          </button>

          <div className="mt-2 border-t border-gray-200 pt-4 flex flex-col gap-1">
            <p className="text-xs text-gray-600">✓ 100% Original product.</p>
            <p className="text-xs text-gray-600">
              ✓ Cash on delivery is available on this product.
            </p>
            <p className="text-xs text-gray-600">
              ✓ Easy return and exchange policy within 7 days.
            </p>
          </div>
        </div>
      </section>

      {/* Description / Reviews Tabs */}
      <section className="mt-16">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-6 py-3 text-sm font-medium transition-colors duration-150 ${
              activeTab === "description"
                ? "border-b-2 border-gray-900 text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-3 text-sm font-medium transition-colors duration-150 ${
              activeTab === "reviews"
                ? "border-b-2 border-gray-900 text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Reviews (122)
          </button>
        </div>

        <div className="border border-gray-200 border-t-0 p-6 rounded-b-sm">
          {activeTab === "description" ? (
            <div className="text-sm text-gray-600 leading-relaxed space-y-3 max-w-4xl">
              <p>
                An e-commerce website is an online platform that facilitates the
                buying and selling of products or services over the internet. It
                serves as a virtual marketplace where businesses and individuals
                can showcase their products, interact with customers, and
                conduct transactions without the need for a physical presence.
                E-commerce websites have gained immense popularity due to their
                convenience, accessibility, and the global reach they offer.
              </p>
              <p>
                E-commerce websites typically display products or services along
                with detailed descriptions, images, prices, and any available
                variations (e.g., sizes, colors). Each product usually has its
                own dedicated page with relevant information.
              </p>
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              No reviews yet. Be the first to review this product.
            </div>
          )}
        </div>
      </section>

      <div>
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  );
};

export default Product;
