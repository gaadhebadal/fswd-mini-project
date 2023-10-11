import './styles.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const serverUrl = 'http://localhost:4000';

const PhotoGallery = () => {
  const [imageFilenames, setImageFilenames] = useState([]);

  useEffect(() => {
    const fetchImageFilenames = async () => {
      try {
        const response = await axios.get(`${serverUrl}/uploads/filenames`);
        setImageFilenames(response.data);
      } catch (error) {
        console.error('Error fetching image filenames:', error);
      }
    };

    fetchImageFilenames();
  }, []);

  return (
    <div className='PhotoGallery'>
      <h2>Photo Gallery</h2>
      <div className="gallery">
        {imageFilenames.map((filename, index) => (
          <div key={index} className="gallery-item">
            <div className="image-container">
              <img src={`${serverUrl}/uploads/${filename}`} alt={`Image ${index}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
