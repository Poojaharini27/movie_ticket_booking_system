// import React, { useEffect, useCallback } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";

// const UpiPaymentPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const {
//     totalAmount,
//     email,
//     seats,
//     date,
//     time,
//     movieName,
//     theatre,
//     location: venueLocation,
//   } = location.state || {};

//   const handleBookingStatus = useCallback(
//     async (status) => {
//       console.log("handleBookingStatus called with status:", status);
//       try {
//         await axios.post("http://localhost:3001/payment_status", {
//           email,
//           seats,
//           date,
//           time,
//           movieName,
//           theatre,
//           location: venueLocation,
//           payment_status: status,
//           amount: totalAmount,
//           payment_type: "UPI",
//         });

//         navigate("/bookedstatus", {
//           state: {
//             email,
//             seats,
//             date,
//             time,
//             movieName,
//             theatre,
//             location: venueLocation,
//             payment_status: status,
//             amount: totalAmount,
//           },
//         });
//       } catch (error) {
//         console.error("Error updating booking status:", error);
//       }
//     },
//     [email, seats, date, time, movieName, theatre, venueLocation, totalAmount, navigate]
//   );

//   const createOrder = useCallback(async () => {
//     console.log("createOrder called");
//     try {
//       const response = await axios.post("http://localhost:3001/create-order", {
//         amount: totalAmount,
//       });
//       console.log(response.data.orderID);
//       return response.data.orderID;
//     } catch (error) {
//       console.error("Error creating order:", error);
//       throw error;
//     }
//   }, [totalAmount]);

//   const onApprove = useCallback(
//     async (data, actions) => {
//       console.log("onApprove called with data:", data);
//       try {
//         await actions.order.capture();
//         await handleBookingStatus("SUCCESS");
//       } catch (error) {
//         console.error("Error capturing transaction:", error);
//         await handleBookingStatus("FAILED");
//       }
//     },
//     [handleBookingStatus]
//   );

//   const onError = useCallback(
//     (error) => {
//       console.log("onError called with error:", error);
//       console.error("Error with PayPal Payment:", error);
//       handleBookingStatus("FAILED");
//     },
//     [handleBookingStatus]
//   );

//   useEffect(() => {
//     console.log("useEffect called to load PayPal SDK");

//     if (!document.querySelector("script[src*='https://www.paypal.com/sdk/js']")) {
//       const script = document.createElement("script");
//       script.src = "https://www.paypal.com/sdk/js?client-id=AY2ILs6xIglGH5FvUblFJeDmzAGtEtNgIt6CAbpvyhy8pDH7S7Fg8Mp0TtBGQzdyEAhg3hNHaHWRFIHu&components=buttons";
//       script.async = true;

//       script.onload = () => {
//         if (window.paypal) {
//           window.paypal.Buttons({
//             createOrder,
//             onApprove,
//             onError,
//           }).render("#paypal-button-container");
//         }
//       };

//       document.body.appendChild(script);
//     }

//     return () => {
//       const existingScript = document.querySelector("script[src*='https://www.paypal.com/sdk/js']");
//       if (existingScript) {
//         document.body.removeChild(existingScript);
//       }
//     };
//   }, [createOrder, onApprove, onError]);

//   return (
//     <div>
//       <h2>UPI Payment (via PayPal)</h2>
//       <p>
//         Movie: <strong>{movieName}</strong><br />
//         Theatre: <strong>{theatre}</strong><br />
//         Location: <strong>{venueLocation}</strong><br />
//         Date: <strong>{date}</strong><br />
//         Time: <strong>{time}</strong><br />
//         Total Amount: <strong>₹{totalAmount}</strong><br />
//       </p>
//       <div id="paypal-button-container"></div>
//     </div>
//   );
// };

// export default UpiPaymentPage;
