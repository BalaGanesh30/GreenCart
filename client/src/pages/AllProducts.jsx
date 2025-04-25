import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

const AllProducts = () => {
  const { Products, searchQuery } = useAppContext();
  const [filteredProducts, setfilteredProducts] = useState([]);

  useEffect(() => {
    // console.log("Products from context:", Products);
    if (searchQuery.length > 0) {
      setfilteredProducts(
        Products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setfilteredProducts(Products);
    }
  }, [Products, searchQuery]);

  return (
    <div className="mt-16 flex flex-col">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">All products</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-4 mt-6">
        {Array.isArray(filteredProducts) &&
          filteredProducts
            .filter((product) => product.inStock) // safe access
            .map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
      </div>
    </div>
  );
};

export default AllProducts;
