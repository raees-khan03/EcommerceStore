import React, { useContext, useEffect, useState } from "react";
import { shopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const BestSeller = () => {
  const { product } = useContext(shopContext);
  const [bestSellesproducts, setBestSellerproducts] = useState([]);

  useEffect(() => {
    const bestSeller = product.filter((item) => item.bestseller);
    setBestSellerproducts(bestSeller);
  }, [product]);

  return (
    <section className="my-10">
      <div className="text-xl py-1 mb-2">
        <Title text1={"BEST"} text2={"SELLER"} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
        {bestSellesproducts.map((item) => (
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

export default BestSeller;