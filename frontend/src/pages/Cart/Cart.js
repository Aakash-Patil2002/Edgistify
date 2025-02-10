import React, { useEffect, useState } from "react";
import style from "./Cart.module.css";
import cross from "../../assets/cross_icon.png";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [qtyChange, setQtyChange] = useState(true);
  const navigate=useNavigate();
  const token = localStorage.getItem("jwt");
  
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/cart/getcart", {
        headers: {
          Authorization: `Barear ${token}`,
        },
      })
      .then((result) => {
        setCartItems(result.data.myCartProducts);
      })
      .catch((err) => {
        console.log(err);
        if(err.response.data.message==="Invalid Token"){
          navigate('/login')
        }
        else{
          console.log(err)
        }
      });
  }, [token, qtyChange,navigate]);

  const updateQuantity = (qty, prodId) => {
    if (qty <= 0) {
      return;
    }
    axios
      .put(
        "http://localhost:5001/api/cart/quantity",
        { qty, prodId },
        {
          headers: {
            Authorization: `Barear ${token}`,
          },
        }
      )
      .then((result) => {
        setQtyChange(!qtyChange);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removerFromCart = (prodId) => {
    axios
      .delete(`http://localhost:5001/api/cart/removetocart/${prodId}`, {
        headers: {
          Authorization: `Barear ${token}`,
        },
      })
      .then((result) => {
        setQtyChange(!qtyChange);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const prod of cartItems) {
      totalAmount = totalAmount + prod.productPrice * prod.quantity;
    }
    return totalAmount;
  };
  return (
    <div>
      <Navbar />
      <section className={style.cart}>
        <div className="container">
          <div className={style.cart_items_title + " row"}>
            <p className="col-2">Items</p>
            <p className="col-2">Title</p>
            <p className="col-2">Price</p>
            <p className="col-2">Quatity</p>
            <p className="col-2">Total</p>
            <p className="col-2">Remove</p>
          </div>
          <div className={style.cart_item_list}>
            {cartItems.length !== 0 ? (
              cartItems.map((product) => {
                return (
                  <div
                    className={style.cart_items + " row"}
                    key={product.productId}
                  >
                    <p className="col-2">
                      <img src={product.productImage} alt={product.name} />
                    </p>
                    <p className="col-2">{product.productName}</p>
                    <p className="col-2">₹ {product.productPrice}</p>
                    <p className="col-2">
                      <button
                        className={style.qtyBtn}
                        onClick={() =>
                          updateQuantity(
                            product.quantity - 1,
                            product.productId
                          )
                        }
                      >
                        -
                      </button>
                      <span className="px-2">{product.quantity}</span>
                      <button
                        className={style.qtyBtn}
                        onClick={() =>
                          updateQuantity(
                            product.quantity + 1,
                            product.productId
                          )
                        }
                      >
                        +
                      </button>
                    </p>
                    <p className="col-2">
                      ₹ {product.productPrice * product.quantity}
                    </p>
                    <p className="col-2">
                      <span onClick={() => removerFromCart(product.productId)}>
                        <img
                          className={style.cross_btn2}
                          src={cross}
                          alt="cross btn"
                        />
                      </span>
                    </p>
                  </div>
                );
              })
            ) : (
              <div className={style.emptyCart}>Cart is empty</div>
            )}
          </div>
          <div className="row justify-content-between py-4">
            <div className="col-5">
              <div className={style.cart_total}>
                <h4>Cart Totals</h4>
                <div className={style.cart_total_datails}>
                  <div className={style.cart_total_item}>
                    <span>Subtotal</span>
                    <span>₹{getTotalCartAmount()}</span>
                  </div>
                  <div className={style.cart_total_item}>
                    <span>Delivery fee</span>
                    <span>₹{59}</span>
                  </div>
                  <div className={style.cart_total_item}>
                    <span>Total</span>
                    <span>₹{getTotalCartAmount() + 59}</span>
                  </div>
                </div>
                {cartItems.length !== 0 && (
                  <Link to="/order" className={style.payment_btn}>
                    Proceed to Payment
                  </Link>
                )}
              </div>
            </div>
            <div className="col-5">
              <div>
                <p className={style.promocode_para}>
                  If you have promo code. Enter it here
                </p>
                <div className={style.promo_input}>
                  <input type="text" placeholder="Enter promocode" />
                  <button className={style.promo_submit}>submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cart;
