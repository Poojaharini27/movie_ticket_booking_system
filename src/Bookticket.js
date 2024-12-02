import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Booktickets = () => {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  const cols = [1, 2, 3, 4, 5, 6, 7];
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [blockedSeats, setBlockedSeats] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  const location = useLocation();
  const { movie, theatre, location: movieLocation } = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    // Generate the next 7 days
    const today = new Date();
    const nextSevenDays = [];
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      nextSevenDays.push(nextDate.toLocaleDateString());
    }
    setDates(nextSevenDays);

    const user = localStorage.getItem("user");
    setIsUserLoggedIn(!!user);
  }, []);

  const formatDate = (date) => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`; // Convert to 'YYYY-MM-DD' format
  };

  useEffect(() => {
    // Fetch blocked seats when a date and time are selected
    if (selectedDate && selectedTime) {
      const formattedDate = formatDate(selectedDate);
      axios
        .get("http://localhost:3001/bookticket", {
          params: {
            movie: movie.title,
            date: formattedDate,
            time: selectedTime,
          },
        })
        .then((response) => {
          const bookedSeats = response.data.bookedSeats || [];
          setBlockedSeats(bookedSeats);
        })
        .catch((error) => {
          console.error("Error fetching blocked seats:", error);
        });
    }
  }, [selectedDate, selectedTime]);

  const handleSeatClick = (seat) => {
    if (!selectedDate || !selectedTime || blockedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedSeats([]); // Reset seats when date changes
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    setSelectedSeats([]); // Reset seats when time changes
  };

  const handleProceed = () => {
    if (!selectedDate || !selectedTime || selectedSeats.length === 0) {
      alert("Please select a date, time, and at least one seat.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("User not found. Please sign in.");
      return;
    }

    const userEmail = user.emailid;
    const seatCount = selectedSeats.length;
    const seatPrice = 300;

    const totalAmount = seatCount * seatPrice;

    const bookingDetails = {
      movieName: movie.title,
      date: selectedDate,
      time: selectedTime,
      email: userEmail,
      seats: selectedSeats,
      totalAmount,
      theatre, // Include theatre
      location: movieLocation, // Include location
    };

    navigate("/payment", { state: bookingDetails });
  };

  return (
    <div className="booktickets-container">
      {!isUserLoggedIn ? (
        <div className="user-message">
          <p>Please <Link to="/signin">sign in</Link> to book tickets.</p>
        </div>
      ) : (
        <>
          <div className="movie-details">
            <p><strong>Movie:</strong> {movie.title}</p>
            <p><strong>Theatre:</strong> {theatre}</p>
            <p><strong>Location:</strong> {movieLocation}</p>
          </div>
          <div className="date-selection">
            {dates.map((date, index) => (
              <div
                key={index}
                onClick={() => handleDateClick(date)}
                className={`date-item ${selectedDate === date ? "selected" : ""}`}
              >
                {date}
              </div>
            ))}
          </div>

          {selectedDate && (
            <div className="time-slot-selection">
              <p>Select a Time Slot:</p>
              <div className="date-selection">
                {["9:30 AM", "3:30 PM"].map((time) => (
                  <div
                    key={time}
                    onClick={() => handleTimeClick(time)}
                    className={`time-item ${selectedTime === time ? "selected" : ""}`}
                  >
                    {time}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="seat-grid">
            {selectedDate && selectedTime ? (
              <>
                <div></div>
                {cols.map((col) => (
                  <div key={col} className="seat">{col}</div>
                ))}
                {rows.map((row) => (
                  <React.Fragment key={row}>
                    <div className="seat">{row}</div>
                    {cols.map((col) => {
                      const seatId = `${row}${col}`;
                      return (
                        <div
                          key={seatId}
                          onClick={() => handleSeatClick(seatId)}
                          className={`seat ${blockedSeats.includes(seatId) ? "blocked" : ""} ${selectedSeats.includes(seatId) ? "selected" : ""}`}
                        ></div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </>
            ) : (
              <p className="select-message" style={{ color: "red", marginTop: "20px" }}>
  Please select a date and time slot to choose seats.
</p>

            )}
          </div>

          {selectedDate && selectedTime && selectedSeats.length > 0 && (
            <div >
              <button className="proceed-button"onClick={handleProceed}>Proceed to Payment</button>
            </div>
          )}
        </>
      )}
    </div>
  );

};

export default Booktickets;
