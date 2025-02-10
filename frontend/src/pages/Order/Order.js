import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import styles from "./Order.module.css";
import { useNavigate } from "react-router-dom";
function Order() {
  const [name, setName] = useState(localStorage.getItem("user"));
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
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
      });
  }, [token]);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const prod of cartItems) {
      totalAmount = totalAmount + prod.productPrice * prod.quantity;
    }
    return totalAmount;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      phone: phone,
      address: `${street}, ${city}, ${state}, ${pincode}`,
      products: cartItems,
      totalPrice: getTotalCartAmount() + 59,
    };
    axios
      .post("http://localhost:5001/api/order", data, {
        headers: {
          Authorization: `Barear ${token}`,
        },
      })
      .then((result) => {
        navigate("/ordersuccess");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };
  return (
    <div>
      <Navbar />
      <main>
        <form className={styles.checkoutContainer} onSubmit={handleSubmit}>
          <div className="container">
            <div className="row">
              <div className={`${styles.leftContainer} col-6`}>
                <h2 className={styles.checkoutTitle}>Shipping Information</h2>
                <div className={`${styles.formContainer} row`}>
                  <div className="col-6 mb-2">
                    <input
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      placeholder="Full Name"
                      className={styles.inputField}
                      required
                    />
                  </div>
                  <div className="col-6 mb-2">
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.inputField}
                      required
                    />
                  </div>
                  <div className="col-6 mb-2">
                    <input
                      type="text"
                      value={phone}
                      placeholder="Phone"
                      onChange={(e) => setPhone(e.target.value)}
                      className={styles.inputField}
                      required
                    />
                  </div>
                  <div className="col-6 mb-2">
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="Street Address"
                      className={styles.inputField}
                      required
                    />
                  </div>
                  <div className="col-6 mb-2">
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      className={styles.inputField}
                      required
                    />
                  </div>
                  <div className="col-6 mb-2">
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="State"
                      className={styles.inputField}
                      required
                    />
                  </div>
                  <div className="col-12 mb-2">
                    <input
                      type="text"
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Pin Code"
                      value={pincode}
                      className={styles.inputField}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className={`${styles.rightContainer} col-6`}>
                <h2 className={styles.checkoutTitle}>Order Summary</h2>
                <div className={styles.orderSummary}>
                  <div className={styles.products}>
                    {cartItems.map((product) => (
                      <div
                        className="d-flex justify-content-between"
                        key={product.productId}
                      >
                        <span className="d-block mb-1">
                          <img
                            className={styles.prodImage}
                            src={product.productImage}
                            alt="product.productName"
                          />
                          {product.productName}(x{product.quantity})
                        </span>
                        <span className="d-block mb-1">
                          ₹ {product.productPrice * product.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.orderDiv}>
                    <span>Subtotal</span>
                    <span>₹{getTotalCartAmount()}</span>
                  </div>
                  <div className={styles.orderDiv}>
                    <span>Shipping</span>
                    <span>₹59</span>
                  </div>

                  <div className={styles.orderDiv}>
                    <span>
                      <strong>Total</strong>
                    </span>
                    <span>
                      <strong>₹{getTotalCartAmount() + 59}</strong>
                    </span>
                  </div>
                </div>

                <div className={styles.paymentMethod}>
                  <label className="mb-2">Select Payment Method</label>
                  <div className={`${styles.radioContainer} row`}>
                    <label className="col-6 mb-2">
                      <input
                        type="radio"
                        value="creditCard"
                        checked={paymentMethod === "creditCard"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="me-1"
                      />
                      Credit Card
                    </label>
                    <label className="col-6 mb-2">
                      <input
                        type="radio"
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="me-1"
                      />
                      PayPal
                    </label>
                    <label className="col-6 mb-2">
                      <input
                        type="radio"
                        value="bankTransfer"
                        checked={paymentMethod === "bankTransfer"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="me-1"
                      />
                      Bank Transfer
                    </label>
                    <label className="col-6 mb-2">
                      <input
                        type="radio"
                        value="cashOnDelivery"
                        checked={paymentMethod === "cashOnDelivery"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="me-1"
                      />
                      Cash on Delivery
                    </label>
                  </div>
                </div>

                {paymentMethod === "creditCard" && (
                  <div className={styles.paymentDetails}>
                    <input
                      type="text"
                      placeholder="Card Number"
                      className={styles.inputField}
                    />
                    <input
                      type="text"
                      placeholder="Expiration Date"
                      className={styles.inputField}
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className={styles.inputField}
                    />
                  </div>
                )}

                {paymentMethod === "paypal" && (
                  <div className={styles.paymentDetails}>
                    <input
                      type="email"
                      placeholder="PayPal Email"
                      className={styles.inputField}
                    />
                  </div>
                )}

                {paymentMethod === "bankTransfer" && (
                  <div className={styles.paymentDetails}>
                    <input
                      type="text"
                      placeholder="Bank Account Number"
                      className={styles.inputField}
                    />
                    <input
                      type="text"
                      placeholder="Bank Name"
                      className={styles.inputField}
                    />
                  </div>
                )}

                <button type="submit" className={styles.placeOrderButton}>
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Order;
