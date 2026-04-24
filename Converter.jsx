import React, { useEffect, useState } from "react";

function Converter() {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [result, setResult] = useState(0);
  const [error, setError] = useState("");

  
  useEffect(() => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
      .then((res) => res.json())
      .then((data) => {
        setRates(data.rates);
        setError("");
      })
      .catch(() => setError("Error fetching data"));
  }, [from]);

  
  useEffect(() => {
    if (rates[to]) {
      setResult((amount * rates[to]).toFixed(2));
    }
  }, [amount, to, rates]);

  return (
    <div className="converter">
  {error && <p>{error}</p>}

  <input
    type="number"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
  />

  <div>
    <select value={from} onChange={(e) => setFrom(e.target.value)}>
      <option>USD</option>
      <option>INR</option>
      <option>EUR</option>
      <option>GBP</option>
    </select>

    <span> → </span>

    <select value={to} onChange={(e) => setTo(e.target.value)}>
      <option>INR</option>
      <option>USD</option>
      <option>EUR</option>
      <option>GBP</option>
    </select>
  </div>

  <h3>Result: {result} {to}</h3>
  <p>Rate: 1 {from} = {rates[to]} {to}</p>
</div>
  );
}

export default Converter;