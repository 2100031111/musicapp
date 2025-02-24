import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, InputGroup, FormControl, Button, Row, Card, ListGroup } from "react-bootstrap";

const CLIENT_ID = "1b49839c4c544b14a57c1a8976b68e77";
const CLIENT_SECRET = "9c5f36210a904171a08e9679d5b68686";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [artistData, setArtistData] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [playingTrack, setPlayingTrack] = useState(null); // Store track for embedding

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
        });

        const data = await response.json();
        setAccessToken(data.access_token);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();

    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  async function search() {
    if (!searchInput) return;

    console.log("Searching for:", searchInput);

    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = await response.json();
      if (data.artists.items.length === 0) {
        console.log("No artist found");
        setArtistData(null);
        setAlbums([]);
        return;
      }

      const artist = data.artists.items[0];
      setArtistData(artist);

      const albumsResponse = await fetch(
        `https://api.spotify.com/v1/artists/${artist.id}/albums?include_groups=album&limit=10`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const albumsData = await albumsResponse.json();
      setAlbums(albumsData.items);
    } catch (error) {
      console.error("Error fetching artist or albums:", error);
    }
  }

  async function fetchTracks(albumId) {
    if (!tracks[albumId]) {
      try {
        const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const data = await response.json();
        console.log("Fetched Tracks for Album:", albumId, data.items);

        if (data.items) {
          setTracks((prevTracks) => ({ ...prevTracks, [albumId]: data.items }));
        }
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    }
  }

  function toggleFavorite(track) {
    let savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isAlreadyFavorite = savedFavorites.some((fav) => fav.id === track.id);

    if (isAlreadyFavorite) {
      savedFavorites = savedFavorites.filter((fav) => fav.id !== track.id);
    } else {
      savedFavorites.push({
        id: track.id,
        name: track.name,
        external_urls: track.external_urls,
      });
    }

    setFavorites(savedFavorites);
    localStorage.setItem("favorites", JSON.stringify(savedFavorites));
  }

  return (
    <div className="App">
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="Search for artist"
            type="input"
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                search();
              }
            }}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <Button onClick={search}>Search</Button>
        </InputGroup>
      </Container>

      {artistData && (
        <Container>
          <Card className="mb-9">
            <Card.Img
              variant="top"
              src={artistData.images.length > 0 ? artistData.images[0].url : "https://via.placeholder.com/150"}
              alt={artistData.name}
            />
            <Card.Body>
              <Card.Title>{artistData.name}</Card.Title>
              <p>Followers: {artistData.followers.total.toLocaleString()}</p>
              <p>Popularity: {artistData.popularity}/100</p>
            </Card.Body>
          </Card>
        </Container>
      )}

      <Container>
        <h2>Albums</h2>
        <Row className="mx-2 row-cols-4">
          {albums.length > 0 ? (
            albums.map((album) => (
              <Card key={album.id} className="mb-3">
                <Card.Img src={album.images.length > 0 ? album.images[0].url : "https://via.placeholder.com/150"} />
                <Card.Body>
                  <Card.Title>{album.name}</Card.Title>
                  <p>Release Date: {album.release_date}</p>
                  <Button variant="secondary" className="mt-2" onClick={() => fetchTracks(album.id)}>
                    View Songs
                  </Button>

                  {tracks[album.id] && tracks[album.id].length > 0 && (
                    <ListGroup className="mt-2">
                      {tracks[album.id].map((track) => (
                        <ListGroup.Item key={track.id} className="d-flex justify-content-between align-items-center">
                          {track.name}
                          <div>
                            {/* Play in Embed Player */}
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => setPlayingTrack(track.id)}
                              style={{ marginLeft: "10px" }}
                            >
                              ▶ Play
                            </Button>

                            {/* Favorite Button */}
                            <Button
                              variant={favorites.some((fav) => fav.id === track.id) ? "danger" : "outline-danger"}
                              size="sm"
                              onClick={() => toggleFavorite(track)}
                              style={{ marginLeft: "10px" }}
                            >
                              ❤️
                            </Button>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No albums found</p>
          )}
        </Row>
      </Container>

      {/* Spotify Embed Player */}
      {playingTrack && (
        <Container className="mt-4">
          <h3>Now Playing:</h3>
          <iframe
            src={`https://open.spotify.com/embed/track/${playingTrack}`}
            width="100%"
            height="80"
            frameBorder="0"
            allow="encrypted-media"
            style={{ borderRadius: "10px", marginTop: "10px" }}
          ></iframe>
        </Container>
      )}
    </div>
  );
};

export default Search;
