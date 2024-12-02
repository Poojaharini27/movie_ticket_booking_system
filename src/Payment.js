import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure the passed data from location state
  const { movieName, date, time, email, seats, totalAmount, theatre, location: movieLocation } = location.state || {};

  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!stripe) {
      return;
    }
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Validate amount and email
    if (typeof totalAmount !== "number" || isNaN(totalAmount) || totalAmount <= 0) {
      setMessage("Invalid total amount.");
      return;
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      setMessage("Invalid email address.");
      return;
    }

    console.log("Payment Request Data:", { amount: totalAmount, email });

    try {
      const { data } = await axios.post('http://localhost:3001/payment', {
        amount: totalAmount * 100, // Convert to smallest unit (paise)
        email, // Pass user's email
      });

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setMessage("Payment Successful!");
      }
    } catch (error) {
      setMessage("Payment failed: " + error.message);
      console.error("Payment Request Error:", error);
    }
  };

  const handlePaymentMethod = (method) => {
    // Pass movie details, location, theatre, and selected payment method to the respective page
    navigate(`/payment/${method}`, { state: { movieName, date, time, email, seats, totalAmount, theatre, location: movieLocation } });
  };

  return (
    <div className="payment acc">
  <h2>Movie Ticket Payment</h2>
  <p><strong>Movie:</strong> {movieName}</p>
  <p><strong>Date:</strong> {date}</p>
  <p><strong>Time:</strong> {time}</p>
  <p><strong>Email:</strong> {email}</p>
  <p><strong>Seats Selected:</strong> {seats?.join(", ")}</p>
  <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
  <p><strong>Theatre:</strong> {theatre}</p>
  <p><strong>Location:</strong> {movieLocation}</p>

  <button onClick={() => handlePaymentMethod('card')}>Pay via Card</button>
  {/* <button onClick={() => handlePaymentMethod('upi')}>Pay via UPI</button> */}
  {/* <button onClick={() => handlePaymentMethod('netbanking')}>Pay via Net Banking</button> */}

  {message && <p>{message}</p>}
</div>

  );
}

export default Payment;
