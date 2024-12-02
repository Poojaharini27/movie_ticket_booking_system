import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UploadWidget from './components/UploadWidget';

const Addmovie = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [releasedate, setReleasedate] = useState("");
  const [poster, setPoster] = useState("");
  const [director, setDirector] = useState("");
  const [musicdirector, setMusicdirector] = useState("");
  const [actor1, setActor1] = useState("");
  const [actor2, setActor2] = useState("");
  const [actor3, setActor3] = useState("");
  const [actor4, setActor4] = useState("");
  const [actor1_img, setActor1_img] = useState("");
  const [actor2_img, setActor2_img] = useState("");
  const [actor3_img, setActor3_img] = useState("");
  const [actor4_img, setActor4_img] = useState("");
  const [language, setLanguage] = useState(""); // New state for language
  const [imagesUploaded, setImagesUploaded] = useState({
    poster: false,
    actor1_img: false,
    actor2_img: false,
    actor3_img: false,
    actor4_img: false,
  }); // Track image upload status

  const navigate = useNavigate();

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const missingFields = [];
    if (!title) missingFields.push("Title");
    if (!genre) missingFields.push("Genre");
    if (!description) missingFields.push("Description");
    if (!releasedate) missingFields.push("Release Date");
    if (!poster) missingFields.push("Poster");
    if (!director) missingFields.push("Director");
    if (!musicdirector) missingFields.push("Music Director");
    if (!actor1 || !actor1_img) missingFields.push("Actor 1 and Image");
    if (!actor2 || !actor2_img) missingFields.push("Actor 2 and Image");
    if (!actor3 || !actor3_img) missingFields.push("Actor 3 and Image");
    if (!actor4 || !actor4_img) missingFields.push("Actor 4 and Image");
    if (!language) missingFields.push("Language");
  
    // Proceed only if there are no missing fields
    if (missingFields.length > 0) {
      return; // Don't proceed further if any field is missing
    }
  
    const movieData = {
      title,
      genre,
      description,
      releasedate,
      poster,
      director,
      musicdirector,
      actor1,
      actor2,
      actor3,
      actor4,
      actor1_img,
      actor2_img,
      actor3_img,
      actor4_img,
      language, // Include language in movie data
    };
  
    axios
      .post("http://localhost:3001/addmovie", movieData)
      .then((res) => {
        console.log("Movie added successfully!");
        if (res.data && res.data.movieData) {
          localStorage.setItem("movie_info", JSON.stringify(res.data.movieData));
        } else {
          console.error("movieData is missing in the response");
        }
        navigate("/admin"); 
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };
  
  // Update image upload status
  const handleImageUpload = (field) => {
    setImagesUploaded((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };

  return (
    <div className="addmovie-container">
      <form onSubmit={handleSubmit}>
        <p className="addmovie-title">Add Movie</p>

        {/* Title Field */}
        <div className="addmovie-form-col">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Enter Movie Name"
            className="addmovie-form-field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Genre Field */}
        <div className="addmovie-form-col">
          <label htmlFor="genre">Genre</label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          >
            <option value="">Select Genre</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Romance">Romance</option>
            <option value="Sci-fi">Science fiction</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Horror">Horror</option>
          </select>
        </div>

        {/* Description Field */}
        <div className="addmovie-form-col">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            placeholder="Enter Description"
            className="addmovie-form-field"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Release Date Field */}
        <div className="addmovie-form-col">
          <label htmlFor="releasedate">Release Date</label>
          <input
            type="date"
            placeholder="dd-mm-yyyy"
            className="addmovie-form-field"
            value={releasedate}
            onChange={(e) => setReleasedate(e.target.value)}
            required
          />
        </div>

        {/* Poster Image Upload */}
        <div className="addmovie-form-col">
          <label htmlFor="poster">Poster</label>
          <UploadWidget 
            setImage={setPoster} 
            onUpload={() => handleImageUpload("poster")} // Update status after upload
          />
          {imagesUploaded.poster && <span>✅</span>}
        </div>

        {/* Director Field */}
        <div className="addmovie-form-col">
          <label htmlFor="director">Director</label>
          <input
            type="text"
            placeholder="Enter director"
            className="addmovie-form-field"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
          />
        </div>

        {/* Music Director Field */}
        <div className="addmovie-form-col">
          <label htmlFor="musicdirector">Music Director</label>
          <input
            type="text"
            placeholder="Enter Music Director"
            className="addmovie-form-field"
            value={musicdirector}
            onChange={(e) => setMusicdirector(e.target.value)}
          />
        </div>

        {/* Actor Fields */}
        <div className="addmovie-form-col">
          <label htmlFor="actor1">Actor1</label>
          <input
            type="text"
            placeholder="Enter actor1"
            className="addmovie-form-field"
            value={actor1}
            onChange={(e) => setActor1(e.target.value)}
          />
        </div>
        <div className="addmovie-form-col">
          <label htmlFor="actor2">Actor2</label>
          <input
            type="text"
            placeholder="Enter Actor2"
            className="addmovie-form-field"
            value={actor2}
            onChange={(e) => setActor2(e.target.value)}
          />
        </div>
        <div className="addmovie-form-col">
          <label htmlFor="actor3">Actor3</label>
          <input
            type="text"
            placeholder="Enter Actor3"
            className="addmovie-form-field"
            value={actor3}
            onChange={(e) => setActor3(e.target.value)}
          />
        </div>
        <div className="addmovie-form-col">
          <label htmlFor="actor4">Actor4</label>
          <input
            type="text"
            placeholder="Enter Actor4"
            className="addmovie-form-field"
            value={actor4}
            onChange={(e) => setActor4(e.target.value)}
          />
        </div>

        {/* Actor Image Upload Fields */}
        <div className="addmovie-form-col">
          <label htmlFor="actor1_img">Actor1 Image</label>
          <UploadWidget 
            setImage={setActor1_img} 
            onUpload={() => handleImageUpload("actor1_img")}
          />
          {imagesUploaded.actor1_img && <span>✅</span>}
        </div>
        <div className="addmovie-form-col">
          <label htmlFor="actor2_img">Actor2 Image</label>
          <UploadWidget 
            setImage={setActor2_img} 
            onUpload={() => handleImageUpload("actor2_img")}
          />
          {imagesUploaded.actor2_img && <span>✅</span>}
        </div>
        <div className="addmovie-form-col">
          <label htmlFor="actor3_img">Actor3 Image</label>
          <UploadWidget 
            setImage={setActor3_img} 
            onUpload={() => handleImageUpload("actor3_img")}
          />
          {imagesUploaded.actor3_img && <span>✅</span>}
        </div>
        <div className="addmovie-form-col">
          <label htmlFor="actor4_img">Actor4 Image</label>
          <UploadWidget 
            setImage={setActor4_img} 
            onUpload={() => handleImageUpload("actor4_img")}
          />
          {imagesUploaded.actor4_img && <span>✅</span>}
        </div>

        {/* Language Field */}
        <div className="addmovie-form-col">
  <label htmlFor="language">Language</label>
  <select
    className="addmovie-form-field"
    value={language}
    onChange={(e) => setLanguage(e.target.value)}
    required
  >
    <option value="">All Languages</option>
    <option value="English">English</option>
    <option value="Hindi">Hindi</option>
    <option value="Malayalam">Malayalam</option>
    <option value="Kannada">Kannada</option>
    <option value="Tamil">Tamil</option>
    <option value="Telugu">Telugu</option>
  </select>
</div>


        {/* Submit Button */}
        <div className="addmovie-form-col">
          <button type="submit" className="addmovie-submit-btn">
            Add Movie
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addmovie;
