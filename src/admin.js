import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Admin() { 
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');  // Redirect to the signin page after logout
  };

  return (
    <div className='admin'>
      {/* Header section with username and logout button */}
      <div className="admin-header">
        <div className="admin-username">
          <Link to ='/profile'><p className="name_admin">{user ? ` ${user.name}` : ' User'} </p></Link> {/* Added check for user */}
        </div>
        <div className="admin-logout">
          <button className="admin-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Admin options */}
      <div className="option">
        <div className="category">
          <button className='admin-btn'>
            <Link to="/addmovie">Add Movie</Link>
          </button>
        </div>
        <div className="category">
          <button className='admin-btn'>
            <Link to="/movielist">Update/Delete movie</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
