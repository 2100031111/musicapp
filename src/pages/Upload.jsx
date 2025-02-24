import React, { useState, useEffect } from "react";
import axios from "axios";

const Upload = () => {
    const [video, setVideo] = useState(null);
    const [videos, setVideos] = useState([]);

    // Fetch videos from backend
    useEffect(() => {
        axios.get("http://localhost:3000/videos")
            .then(res => setVideos(res.data))
            .catch(err => console.error(err));
    }, []);

    // Handle file selection
    const handleFileChange = (e) => {
        setVideo(e.target.files[0]);
    };

    // Handle video upload
    const handleUpload = async () => {
        if (!video) {
            alert("Please select a video first!");
            return;
        }

        const formData = new FormData();
        formData.append("video", video);

        try {
            const res = await axios.post("http://localhost:5000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            alert("Video uploaded successfully!");
            setVideos([...videos, res.data.video]); // Update state
        } catch (error) {
            console.error(error);
            alert("Error uploading video");
        }
    };

    return (
        <div>
            <h2>Upload Video</h2>
            <input type="file" accept="video/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>

            <h3>Uploaded Videos</h3>
            <div>
                {videos.map((vid) => (
                    <video key={vid._id} width="300" controls>
                        <source src={`http://localhost:5000/${vid.filepath}`} type="video/mp4" />
                        <source src={`http://localhost:5000/uploads/${vid.filename}`} type="video/webm" />

                    </video>
                ))}
            </div>
        </div>
    );
};

export default Upload;
