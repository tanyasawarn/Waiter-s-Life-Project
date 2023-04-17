import React, { useState, useEffect } from "react";

import './Form.css';

function Form() {
    const [uniqueOrderId, setuniqueOrderId] = useState("");
  const [price, setPrice] = useState("");
  const [dish, setDish] = useState("");
  const [table, setTable] = useState("");
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

  const handleOrderIdChange = (event) => {
    setuniqueOrderId(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDishChange = (event) => {
    setDish(event.target.value);
  };

  const handleTableChange = (event) => {
    setTable(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newOrder = {
      orderId: uniqueOrderId,
      price: price,
      dish: dish,
      table: table,
    };
    setSavedOrders([...savedOrders, newOrder]);
    setuniqueOrderId("");
    setPrice("");
    setDish("");
    setTable("");
  };

  const handleDelete = (index) => {
    const updatedOrders = [...savedOrders];
    updatedOrders.splice(index, 1);
    setSavedOrders(updatedOrders);
  };

  return (
    <div>
      <h1>Waiter's Life</h1>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="orderId">Unique Order ID:</label>
          <input
            type="text"
            id="orderId"
            value={uniqueOrderId}
            onChange={handleOrderIdChange}
          />
        </div>
        <div>
          <label htmlFor="price">Choose Price:</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={handlePriceChange}
          />
        </div>
        <div>
          <label htmlFor="dish">Choose Dish:</label>
          <input
            type="text"
            id="dish"
            value={dish}
            onChange={handleDishChange}
          />
        </div>
        <div>
          <label htmlFor="table">Choose a Table:</label>
          <select id="table" value={table} onChange={handleTableChange}>
            <option value="">-- Please Choose a Table --</option>
            <option value="Table 1">Table 1</option>
            <option value="Table 2">Table 2</option>
            <option value="Table 3">Table 3</option>
          </select>
        </div>
        <button type="submit">Add Bill</button>
      </form>
      <div>
        <h2>Orders:</h2>
        <ul>
          {savedOrders.map((order, index) => (
            <li key={order.orderId}>
              <div>Order ID: {order.orderId}</div>
              <div>Price: {order.price}</div>
              <div>Dish: {order.dish}</div>
              <div>Table: {order.table}</div>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Form;
