import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

function CardPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAmount, email, seats, date, time, movieName ,theatre,location:movieLocation} = location.state || {};

  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isCardValid, setIsCardValid] = useState(false); // Track CardElement validation
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (!stripe) return;

    // Validate form fields (excluding CardElement, handled separately)
    const isFormValid =
      typeof totalAmount === "number" &&
      !isNaN(totalAmount) &&
      totalAmount > 0 &&
      typeof email === "string" &&
      email.includes("@");

    setIsFormValid(isFormValid);
  }, [totalAmount, email, stripe]);

  // Format the date for database use
  const dateParts = date ? date.split('/') : [];
  const formattedDate = dateParts.length === 3 ? `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}` : '';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
        setMessage("Stripe is not initialized yet.");
        return;
    }

    try {
        // Request to create payment intent
        const { data } = await axios.post("http://localhost:3001/payment", {
            amount: totalAmount * 100,
            email,
        });

        // Confirm the card payment using the client secret
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

        // Send payment details to backend
        const response = await axios.post("http://localhost:3001/payment_status", {
            email,
            seats,
            date: formattedDate,
            time,
            movieName,
            payment_status: "Success",
            amount: totalAmount,
            payment_type: "Card",
            theatre,
            location: movieLocation, // Pass location
        });

        navigate("/bookedstatus", {
          state: {
            payment_status: "success",
            amount: totalAmount,         
            movieName: movieName,
            theatre: theatre,
            location: movieLocation,
            date: formattedDate,
            time: time
          }
          });
    } catch (error) {
        setMessage("Payment failed: " + error.message);
        console.error("Payment Request Error:", error);

        await axios.post("http://localhost:3001/payment_status", {
            email,
            seats,
            date: formattedDate,
            time,
            movieName,
            payment_status: "Failed",
            amount: totalAmount,
            payment_type: "Card",
            theatre,
            location: movieLocation,
        });

        navigate("/bookedstatus", {
          state: {
            payment_status: "success",
            amount: totalAmount,         
            movieName: movieName,
            theatre: theatre,
            location: movieLocation,
            date: formattedDate,
            time: time
            
          }
        });
        
    }
};


  const handleCardChange = (event) => {
    // Update card validity based on Stripe's validation
    setIsCardValid(event.complete); // 'complete' indicates card input is valid
    if (event.error) {
      setMessage(event.error.message);
    } else {
      setMessage("");
    }
  };

  return (
    <div className="card-payment">
  <h2>Card Payment</h2>
  <form onSubmit={handleSubmit}>
    <CardElement onChange={handleCardChange} />
    <button
      type="submit"
      disabled={!isFormValid || !isCardValid} // Ensure both form and card are valid
    >
      Pay ₹{totalAmount}
    </button>
  </form>

  {message && <p className={message.includes("Success") ? "success" : ""}>{message}</p>}
</div>

  );
}

export default CardPayment;
