import React, { useState, useEffect } from "react";

const CLIENT_ID = "1b49839c4c544b14a57c1a8976b68e77";
const CLIENT_SECRET = "9c5f36210a904171a08e9679d5b68686";

const Podcast = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState("");

    // Fetch Spotify Access Token
    useEffect(() => {
        const getSpotifyToken = async () => {
            try {
                const response = await fetch("https://accounts.spotify.com/api/token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
                });
                const data = await response.json();
                setToken(data.access_token);
            } catch (err) {
                console.error("Error fetching token:", err);
            }
        };
        getSpotifyToken();
    }, []);

    // Fetch Podcasts
    const searchPodcasts = async () => {
        if (!searchQuery) return alert("Please enter a search term!");
        setLoading(true);
        setError(null);

        if (!token) {
            setError("Spotify authentication failed. Please refresh the page.");
            return;
        }

        try {
            const response = await fetch(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=show&limit=5`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (!response.ok) throw new Error("Failed to fetch podcasts");

            const data = await response.json();
            setPodcasts(data.shows?.items || []);
        } catch (err) {
            setError("Error fetching podcasts. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Search for Spotify Podcasts</h2>
            <input
                type="text"
                placeholder="Enter podcast name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.input}
            />
            <button onClick={searchPodcasts} style={styles.button}>Search</button>

            {loading && <p>Loading podcasts...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div style={styles.results}>
    {podcasts.length === 0 && !loading && <p>No results found.</p>}
    {podcasts.map((podcast) => (
        <div key={podcast.id} style={styles.podcastCard}>
            <img src={podcast.images[0]?.url} alt={podcast.name} style={styles.image} />
            <h3>{podcast.name}</h3>
            <p>{podcast.publisher}</p>

            {/* Spotify Embed Player (Full Podcast) */}
            {podcast.external_urls?.spotify && (
                <iframe 
                    src={`https://open.spotify.com/embed/show/${podcast.id}`}
                    width="100%" 
                    height="152" 
                    frameBorder="0"
                    allow="encrypted-media"
                    style={{ borderRadius: "10px", marginTop: "10px" }}
                ></iframe>
            )}
        </div>
    ))}
</div>

        </div>
    );
};

// Styles
const styles = {
    container: { textAlign: "center", padding: "20px" },
    input: { padding: "10px", width: "60%", margin: "10px", fontSize: "16px" },
    button: { padding: "10px 20px", background: "blue", color: "white", border: "none", cursor: "pointer" },
    results: { marginTop: "20px" },
    podcastCard: {
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "15px",
        width: "60%",
        margin: "auto",
        textAlign: "left",
    },
    image: { width: "100px", borderRadius: "10px" },
    spotifyButton: {
        display: "inline-block",
        marginTop: "10px",
        padding: "8px 15px",
        background: "#1DB954",
        color: "white",
        textDecoration: "none",
        borderRadius: "5px",
        fontWeight: "bold",
    },
};

export default Podcast;
