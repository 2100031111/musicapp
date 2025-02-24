import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, ListGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load saved favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  // Remove song from favorites
  const removeFavorite = (trackId) => {
    const updatedFavorites = favorites.filter((track) => track.id !== trackId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <Container>
      <h2>❤️ Favorite Songs</h2>
      {favorites.length > 0 ? (
        <ListGroup>
          {favorites.map((track) => (
            <ListGroup.Item key={track.id} className="d-flex justify-content-between align-items-center">
              {track.name}
              <div>
                <Button variant="link" href={track.external_urls.spotify} target="_blank">
                  Play
                </Button>
                <Button variant="danger" size="sm" onClick={() => removeFavorite(track.id)}>
                  ❌ Remove
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>No favorite songs added yet.</p>
      )}
      <Button variant="secondary" className="mt-3" onClick={() => navigate("/search")}>
        ⬅ Back to Search
      </Button>
    </Container>
  );
};

export default Favorites;
