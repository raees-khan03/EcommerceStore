import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  return (
    <Link to={`/product/${id}`} className="group block cursor-pointer">
      {/* Image Container */}
      <div className="overflow-hidden bg-gray-50 aspect-square">
        <img
          src={image[0]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="pt-3 pb-1">
        <p className="text-sm text-gray-700 truncate">{name}</p>
        <p className="text-sm font-semibold text-gray-900 mt-0.5">Rs{price}</p>
      </div>
    </Link>
  );
};

export default ProductItem;