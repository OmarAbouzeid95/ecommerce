import { getOrders } from "../scripts/crudFunctions";
import { useEffect, useState, useContext } from "react";
import { loggedUser } from "../context";
import * as randomId from "random-id";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { user } = useContext(loggedUser);

  console.log("orders: ", orders);

  useEffect(() => {
    getOrders(user)
      .then((orders) => setOrders(orders))
      .catch((error) => {
        console.log("Error loading orders.");
      });
  }, []);

  useEffect(() => {
    const windowResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", windowResize);
    return () => window.removeEventListener("resize", windowResize);
  }, []);

  return (
    <div className="bagItemsContainer">
      <h2 className="bagItemsCost-br">Your orders</h2>
      {orders.length > 0 && (
        <div style={{ marginTop: "1.5em" }}>
          <div className="flex-sb">
            <h3>Order ID</h3>
            <p>{randomId(15, "A0")}</p>
          </div>
          <div className="flex-sb">
            <h3>Status</h3>
            <p>Pending</p>
          </div>
        </div>
      )}
      {orders.length === 0 && (
        <h2 style={{ textAlign: "center", marginTop: "3em" }}>
          You don't have any orders, jump back in and{" "}
          <Link to="/" style={{ color: "black" }}>
            start shopping
          </Link>
        </h2>
      )}
      {orders.map((order, index) => {
        return (
          <div className="orderProductContainer" key={index}>
            <img className="bagProductImg" src={order.img} alt="bag product" />
            <div className="bagProductInfo">
              <div>
                <h3>{order.name}</h3>
                <div className="flex-sb">
                  <p>Price</p>
                  <p className="bagProductPrice">${order.price}</p>
                </div>
                {windowWidth > 410 && (
                  <div className="flex-sb">
                    <p>Size</p>
                    <p
                      style={{
                        textTransform: "uppercase",
                        paddingRight: "9px",
                      }}>
                      {order.size}
                    </p>
                  </div>
                )}
                {windowWidth > 410 && (
                  <div className="productQuantity">
                    <p>Quantity</p>
                    <p style={{ paddingRight: "9px" }}>{order.quantity}</p>
                  </div>
                )}
              </div>
              {windowWidth <= 410 && (
                <div className="flex-sb">
                  <p>Size</p>
                  <p
                    style={{ textTransform: "uppercase", paddingRight: "9px" }}>
                    {order.size}
                  </p>
                </div>
              )}
              {windowWidth <= 410 && (
                <div className="productQuantity">
                  <p>Quantity</p>
                  <p style={{ paddingRight: "9px" }}>{order.quantity}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
