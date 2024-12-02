import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    descript: "",
    release_date: "",
    director: "",
    musicdirector: "",
    actor_name1: "",
    actor_name2: "",
    actor_name3: "",
    actor_name4: "",
    language: "",
  });

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/movie_data/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/updatemovie/${id}`, formData);
      console.log("Movie updated successfully!");
      navigate("/admin");
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  return (
    <div className="addmovie-container">
      <h1 className="addmovie-title">Update Movie Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="addmovie-form-col">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Enter movie title"
            onChange={handleChange}
            className="addmovie-form-field"
          />
        </div>

        <div className="addmovie-form-col">
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            placeholder="Enter movie genre"
            onChange={handleChange}
            className="addmovie-form-field"
          />
        </div>

        <div className="addmovie-form-col">
          <label>Description:</label>
          <textarea
            name="descript"
            value={formData.descript}
            placeholder="Enter movie description"
            onChange={handleChange}
            className="addmovie-form-field"
          />
        </div>

        <div className="addmovie-form-col">
          <label>Release Date:</label>
          <input
            type="date"
            name="release_date"
            value={formData.release_date}
            onChange={handleChange}
            className="addmovie-form-field"
          />
        </div>

        <div className="addmovie-form-col">
          <label>Director:</label>
          <input
            type="text"
            name="director"
            value={formData.director}
            placeholder="Enter director name"
            onChange={handleChange}
            className="addmovie-form-field"
          />
        </div>

        <div className="addmovie-form-col">
          <label>Music Director:</label>
          <input
            type="text"
            name="musicdirector"
            value={formData.musicdirector}
            placeholder="Enter music director name"
            onChange={handleChange}
            className="addmovie-form-field"
          />
        </div>

        {["actor_name1", "actor_name2", "actor_name3", "actor_name4"].map((field, index) => (
          <div className="addmovie-form-col" key={field}>
            <label>{`Actor ${index + 1} Name:`}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              placeholder={`Enter actor ${index + 1} name`}
              onChange={handleChange}
              className="addmovie-form-field"
            />
          </div>
        ))}

        <div className="addmovie-form-col">
          <label>Language:</label>
          <input
            type="text"
            name="language"
            value={formData.language}
            placeholder="Enter language"
            onChange={handleChange}
            className="addmovie-form-field"
          />
        </div>

        <button type="submit" className="addmovie-submit-btn">Update Movie</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
