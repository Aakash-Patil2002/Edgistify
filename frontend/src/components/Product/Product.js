import React from "react";
import style from "./Product.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Product({ product }) {
  const navigate = useNavigate();
  const addToCart = (prodId) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return navigate('/login')
    }
    axios
      .post(
        "http://localhost:5001/api/cart/addtocart",
        { prodId },
        {
          headers: {
            Authorization: `Barear ${token}`,
          },
        }
      )
      .then((result) => {
        alert(result.data.message);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  return (
    <div className={style.cart_body}>
      <figure className="mb-0">
        <img
          src={product.imageUrl}
          className={style.cartImg}
          alt={product.name}
        />
        <figcaption className="mt-3">
          <h6 className={style.CourseTitle}>{product.brand}</h6>
          <h3 className={style.CourseName}>{product.name}</h3>
          <p className={style.details}>
            ₹ {product.price}{" "}
            <span className={style.stock}>Only {product.stock} left</span>
          </p>
          <button
            className={style.add_cart}
            onClick={() => addToCart(product._id)}
          >
            Add To Cart
          </button>
        </figcaption>
      </figure>
    </div>
  );
}

export default Product;
