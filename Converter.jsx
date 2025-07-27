import React, { useState, useEffect } from "react";

const currencyList = ["USD", "EUR", "INR", "JPY", "GBP", "CAD", "AUD", "CNY","SGD"];

const Converter = () => {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [result, setResult] = useState("");

  const convert = async () => {
    if (isNaN(amount) || !amount) {
      setResult("Please enter a valid amount.");
      return;
    }

    try {
      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
      const data = await res.json();
      const rate = data.rates[to];
      const converted = (amount * rate).toFixed(2);
      setResult(`${amount} ${from} = ${converted} ${to}`);
    } catch (err) {
      setResult("Conversion failed. Try again later.");
    }
  };

  return (
    <div className="card">
      <h2 className="title">Currency Converter</h2>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div className="dropdowns">
        <select value={from} onChange={(e) => setFrom(e.target.value)}>
          {currencyList.map((cur) => (
            <option key={cur}>{cur}</option>
          ))}
        </select>
        <span>→</span>
        <select value={to} onChange={(e) => setTo(e.target.value)}>
          {currencyList.map((cur) => (
            <option key={cur}>{cur}</option>
          ))}
        </select>
      </div>
      <button onClick={convert}>Convert</button>
      <p className="result">{result}</p>
    </div>
  );
};

export default Converter;
