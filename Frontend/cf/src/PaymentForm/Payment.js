import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./Payment.css";
const PaymentPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const campaignName = queryParams.get('campaignName');

  const [amount, setAmount] = useState('');

  const handlePayment = async () => {
    try {
      const response = await fetch('http://localhost:5000/campaigns/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaignName, amount }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Payment successful!');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('An error occurred during payment.');
    }
  };

  return (
    <div className='combo'>
      <div>
      <h1>Make a Payment</h1>
      <p>Campaign: {campaignName}</p>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      </div>
      <button onClick={handlePayment}>Submit Payment</button>
    </div>
  );
};

export default PaymentPage;
