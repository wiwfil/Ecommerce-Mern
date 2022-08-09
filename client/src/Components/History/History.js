import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../Store/features/order/orderSlice";
import { Navigate } from "react-router-dom";
import "./History.css";
import HistorySkeleton from "./HistorySkeleton.js";

const History = () => {
  const dispatch = useDispatch();

  const ordersState = useSelector((state) => state.order);

  const [isLoading, setIsLoading] = useState(true);

  let user = JSON.parse(window.sessionStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      dispatch(getOrders(user._id)).then(() => {
        setIsLoading(false);
      });
    }
  }, [isLoading, dispatch]);

  return user ? (
    <div className="history">
      {!isLoading ? (
        <>
          {ordersState.userOrders.length > 0 ? (
            <>
              <h1>Order History</h1>
              {ordersState.userOrders.map((order, i) => (
                <div key={i} className="history__order">
                  <div className="history__orderid">
                    <span>Order ID:</span>
                    <p>{order._id}</p>
                  </div>

                  <div className="history__orderid">
                    <span>Date:</span>
                    <p>{order.createdAt.split("T")[0]}</p>
                  </div>

                  <div className="history__orderid">
                    <span>Total:</span>
                    <p>${order.amount}</p>
                  </div>
                  <div className="history__products__wrapper">
                    <span>Products:</span>
                    <div className="history__products">
                      {order.products.map((product, index) => (
                        <div key={index}>
                          <hr className="line" />
                          <div key={index} className="history__product">
                            <img src={product.productImgs[0]} alt="" />
                            <p>{product.productTitle}</p>
                            <div className="history__product__row">
                              <span>Quantity : </span>
                              <p>{product.quantity}</p>
                            </div>
                            <div className="history__product__row">
                              <span>Price : </span>
                              <p>${product.productPrice}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <h1>No Order Found</h1>
          )}
        </>
      ) : (
        <HistorySkeleton orders={3} />
      )}
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default History;
