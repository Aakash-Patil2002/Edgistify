import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MyOrders.module.css"; // Import the CSS Module
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [MyOrders, setMyOrders] = useState([]);
  const navigate=useNavigate();
  const token = localStorage.getItem("jwt");
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/order", {
        headers: {
          Authorization: `Barear ${token}`,
        },
      })
      .then((result) => {
        setMyOrders(result.data.myOrders);
      })
      .catch((error) => {
        if(error.response.data.message==="Invalid Token"){
          navigate('/login')
        }
      });
  }, [token,navigate]);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2 className={styles.myOrder}>My Orders</h2>
        <div className="row">
          {MyOrders.length !== 0 ? (
            MyOrders.map((order) => {
              return (
                <div className="col-6" key={order._id}>
                  <div className={styles.order}>
                    <div className="row">
                      <div className="col-12">
                        <h6 className={styles.orderItems}>Products:</h6>
                        <ul className={`list-group ${styles.productList}`}>
                          {order.products.map((product, index) => (
                            <li
                              key={index}
                              className={`list-group-item d-flex justify-content-between align-items-center ${styles.productItem}`}
                            >
                              <span>
                                <img
                                  src={product.productImage}
                                  alt={product.name}
                                  className={styles.prodImg}
                                />{" "}
                                {product.productName} (x
                                {product.quantity})
                              </span>
                              <span>
                                ₹{product.productPrice * product.quantity}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <p className={styles.total}>
                          <strong>Total Price:</strong> ₹{order.totalPrice}
                        </p>
                      </div>
                      <div className="col-12">
                        <h6 className={styles.orderItems}>Shipping Address:</h6>
                        <div className={styles.addDetails + " row"}>
                          <p className="col-6">
                            <strong>Name:</strong> {order.customerName}
                          </p>
                          <p className="col-6">
                            <strong>Phone:</strong> {order.customerPhone}
                          </p>
                          <p className="col-12">
                            <strong>Shipping Address:</strong>{" "}
                            {order.shippingAddress}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted my-2">
                      <small>
                        Order Placed On:{" "}
                        {new Date(order.createdAt).toLocaleString()}
                      </small>
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.emptyOrder}>
              No Order Yet. Order Something
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
