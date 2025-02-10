import React, { useEffect, useState } from "react";
import Product from "../../components/Product/Product";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/products")
      .then((result) => {
        if (result) {
          setProducts(result.data.products);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Navbar />
      <div className="container py-3">
        <div className="row">
          {products &&
            products.map((product) => {
              return (
                <div key={product._id} className="col-md-6 col-lg-3 mb-4">
                  <Product product={product} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Home;
