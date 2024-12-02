import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { jsPDF } from "jspdf";

function BookedStatus() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("Location state:", location.state);
  // Destructure the state values from location.state
  const { payment_status, amount, movieName, theatre, location:movieLocation, date, time } = location.state || {};
  console.log(movieLocation)
  // Provide default values in case any data is missing
  const formattedMovieName = movieName || "Unknown Movie";
  const formattedTheatre = theatre || "Unknown Theatre";
  const formattedLocation = movieLocation || "Unknown Location";
  const formattedDate = date || "N/A";
  const formattedTime = time || "N/A";

  // Function to generate and download the invoice as PDF
  const downloadInvoice = () => {
    const doc = new jsPDF();

    // Title and Header
    doc.setFontSize(20);
    doc.text("Invoice", 20, 20);
    
    // Movie and booking details
    doc.setFontSize(14);
    doc.text(`Movie: ${formattedMovieName}`, 20, 40);
    doc.text(`Theatre: ${formattedTheatre}`, 20, 50);
    doc.text(`Location: ${formattedLocation}`, 20, 60);
    doc.text(`Date: ${formattedDate}`, 20, 70);
    doc.text(`Time: ${formattedTime}`, 20, 80);

    // Payment details
    doc.text(`Amount: ₹${amount}`, 20, 100);
    doc.text(`Status: ${payment_status === "success" ? "Payment Successful" : "Payment Failed"}`, 20, 110);

    // Footer
    doc.setFontSize(10);
    doc.text("Thank you for your purchase!", 20, 130);

    // Save the PDF to the file system
    doc.save(`Invoice_${formattedMovieName}_${new Date().getTime()}.pdf`);
  };

  return (
    <div className="booked-status">
      <h2>Booking Status</h2>
      <div className={`payment-status ${payment_status === "success" ? "success" : "failed"}`}>
        {payment_status === "success" ? (
          <div className="icon">
            <FaCheckCircle size={40} />
          </div>
        ) : (
          <div className="icon">
            <FaTimesCircle size={40} />
          </div>
        )}
        <strong>{payment_status === "success" ? "Payment Successful!" : "Payment Failed"}</strong>
      </div>
      <p>Amount: ₹{amount}</p>
      <button onClick={() => navigate("/")}>Go Back to Home</button>

      {/* Add a button to download the invoice */}
      <button onClick={downloadInvoice} style={{ marginTop: "20px", backgroundColor: "#4CAF50", color: "white", padding: "10px 20px", borderRadius: "5px" }}>
        Download Invoice
      </button>
    </div>
  );
}

export default BookedStatus;
