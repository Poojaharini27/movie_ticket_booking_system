import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const fetchData = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      const userEmail = storedUser ? JSON.parse(storedUser).emailid : null;

      if (userEmail) {
        const response = await axios.get('http://localhost:3001/profile', {
          params: { email: userEmail }
        });

        // Format the date before setting the user state
        const formattedUser = {
          ...response.data,
          dob: new Date(response.data.dob).toLocaleDateString() // Format the date here
        };

        setUser(formattedUser);
      } else {
        console.error("No email found in localStorage");
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchData(); // Call the function when the component mounts
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile">
      <h2>{user.name}</h2>
      <p>Email: {user.emailid}</p>
      <p>Gender: {user.gender}</p>
      <p>Date of Birth: {user.dob}</p> {/* This will now display the formatted date */}
      <p>Address: {user.address}</p>
      <p>City: {user.city}</p>
      <p>State: {user.state}</p>
    </div>
  );
}

export default Profile;
