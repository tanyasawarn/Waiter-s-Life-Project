import React, { useState, useEffect } from "react";
import DeleteButton from "./DeleteButton";

function OrderList() {
  const [savedOrders, setSavedOrders] = useState([]);

  useEffect(() => {
    const savedOrdersFromLocalStorage = localStorage.getItem("savedOrders");
    if (savedOrdersFromLocalStorage) {
      setSavedOrders(JSON.parse(savedOrdersFromLocalStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("savedOrders", JSON.stringify(savedOrders));
  }, [savedOrders]);

  const handleDelete = (index) => {
    const updatedOrders = [...savedOrders];
    updatedOrders.splice(index, 1);
    setSavedOrders(updatedOrders);
  };

  const addOrder = (newOrder) => {
    setSavedOrders([...savedOrders, newOrder]);
};

return (
<div>
<h2>Orders:</h2>
<ul>
{savedOrders.map((order, index) => (
<li key={order.orderId}>
<div>Order ID: {order.orderId}</div>
<div>Price: {order.price}</div>
<div>Dish: {order.dish}</div>
<div>Table: {order.table}</div>
<DeleteButton handleDelete={() => handleDelete(index)} />
</li>
))}
</ul>
</div>
);
}

export default OrderList;
