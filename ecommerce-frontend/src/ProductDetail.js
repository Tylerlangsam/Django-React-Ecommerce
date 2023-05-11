import React, { useEffect, useState } from 'react';

function ProductDetail({ match }) {
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`http://localhost:8000/products/${match.params.id}`)
        .then(response => response.json)
        .then(data => setProduct(data));
    }, [match.params.id]);

    return (
      <div>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>${product.price}</p>
      </div>
    );
}

export default ProductDetail;