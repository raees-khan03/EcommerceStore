import React, { useContext, useEffect, useState } from "react";
import { shopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const RelatedProducts = ({ category, subCategory }) => {
  const [Products, setProducts] = useState([]);
 

  const { product } = useContext(shopContext);
  useEffect(() => {
    let AllProducts = product.slice();
    if (category) {
      AllProducts = AllProducts.filter((item) => item.category === category);
    }
    if (subCategory) {
      AllProducts = AllProducts.filter(
        (item) => item.subCategory === subCategory,
      );
    }
    setProducts(AllProducts.slice(0, 5));
  }, [category, subCategory]);
  return (
    <section>
      <div className="text-xl py-1">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>
      <div className=" grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-x-2 ">
        {Products.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
