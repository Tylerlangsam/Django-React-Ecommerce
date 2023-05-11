import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          {/* Wrap product title in Link */}
          <h2>
            <Link to={`/product/${product.id}`}>{product.title}</Link>
          </h2>
          <p>{product.description}</p>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;