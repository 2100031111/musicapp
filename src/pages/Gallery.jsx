import React, { useState, useEffect } from "react";
import axios from "axios";

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/images")
      .then(response => {
        if (response.data.length > 0) {
          setImages(response.data.flatMap(item => item.images)); // Flatten the array
        }
      })
      .catch(error => console.error("Error fetching images:", error));
  }, []);

  return (
    <div>
      <h2>Uploaded Images</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {images.length > 0 ? images.map((img, index) => (
          <img key={index} src={img} alt="Uploaded" style={{ width: "200px", height: "150px", objectFit: "cover" }} />
        )) : <p>No images found</p>}
      </div>
    </div>
  );
};

export default Gallery;
