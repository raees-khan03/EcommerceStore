import React, { useContext, useEffect, useState } from "react";
import { shopContext } from "../context/ShopContext";
import Product from "./ProductItem";
import ProductItem from "./ProductItem";
import Title from "./Title";

const LatestCollection = () => {
  const { product } = useContext(shopContext);

  const [lastestProducts, setLatestProducts] = useState([]);
 

  useEffect(() => {
    if (product && product.length > 0) {
      const latestProducts = product.slice(0, 9);
      setLatestProducts(latestProducts);
    }
  }, [product]);
  return (
    <section className="my-10 ">
      <div className="text-xl py-1 mb-2">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
        {lastestProducts.map((item) => (
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

export default LatestCollection;
