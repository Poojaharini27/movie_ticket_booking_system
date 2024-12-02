import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";

const TheatreList = () => {
  const location = useLocation();
  const { movie } = location.state; // Access movie details
  const [selectedLocation, setSelectedLocation] = useState(""); // State for location

  // Updated locations
  const locations = [
    "Madurai",
    "Chennai",
    "Coimbatore",
    "Bengaluru",
    "Vijayawada",
    "Mumbai",
    "Delhi",
    "Kochi",
  ];

  // Updated theaters list
  const theaters = [
    { name: "Vetri Cinemas (Maattuthavani) Dolby Atmos", location: "Madurai" },
    { name: "INOX: Vishaal De Mall", location: "Madurai" },
    { name: "Gopuram Cinemas ATMOS and Laser Projector", location: "Madurai" },
    { name: "SPI Cinemas", location: "Chennai" },
    { name: "PVR VR Mall", location: "Chennai" },
    { name: "AGS Cinemas OMR", location: "Chennai" },
    { name: "Carnival Cinemas", location: "Coimbatore" },
    { name: "The Cinema Brookefields", location: "Coimbatore" },
    { name: "INOX Prozone Mall", location: "Coimbatore" },
    { name: "Orion Mall IMAX", location: "Bengaluru" },
    { name: "PVR Forum Mall", location: "Bengaluru" },
    { name: "Cinepolis ETA Mall", location: "Bengaluru" },
    { name: "Raghava Cinemas", location: "Vijayawada" },
    { name: "PVR Trendset Mall", location: "Vijayawada" },
    { name: "Cinepolis Vijayawada", location: "Vijayawada" },
    { name: "Cinepolis Andheri", location: "Mumbai" },
    { name: "PVR Oberoi Mall", location: "Mumbai" },
    { name: "Carnival Cinemas Borivali", location: "Mumbai" },
    { name: "INOX Connaught Place", location: "Delhi" },
    { name: "PVR Pacific Mall", location: "Delhi" },
    { name: "Cinepolis DLF Place", location: "Delhi" },
    { name: "Lulu Mall Cinemas", location: "Kochi" },
    { name: "PVR Oberon Mall", location: "Kochi" },
    { name: "Cinepolis Centre Square Mall", location: "Kochi" },
  ];

  const filteredTheaters = theaters.filter(
    (theater) => theater.location === selectedLocation
  );

  return (
    <div className="theatre-list-container">
      <h1 className="theatre-list-title">Select Location</h1>
      <select
        className="theatre-list-select"
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
      >
        <option value="">-- Select a Location --</option>
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      {selectedLocation && (
        <>
          <h1 className="theatre-list-subtitle">Theaters in {selectedLocation}</h1>
          {filteredTheaters.length > 0 ? (
            <div className="theatre-grid">
              {filteredTheaters.map((theater) => (
                <div key={theater.name} className="theatre-card">
                  <h2 className="theatre-name">{theater.name}</h2>
                  <Link
                    to="/bookticket"
                    state={{
                      movie,
                      theatre: theater.name,
                      location: selectedLocation,
                    }}
                  >
                    <button className="theatre-book-btn">Book Tickets</button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-theatres-message">No theaters available in this location.</p>
          )}
        </>
      )}
    </div>
  );
};

export default TheatreList;
