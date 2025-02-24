import React from "react";

function Music() {
  const musicImages = [
    "https://c.saavncdn.com/544/Sabdham-Telugu-2025-20250213230802-500x500.jpg",
    "https://c.saavncdn.com/245/Wherever-You-Go-From-Robinhood-Telugu-2025-20250214151702-500x500.jpg",
    "https://c.saavncdn.com/862/Priyathama-Telugu-2025-20250210201007-500x500.jpg",
    "https://c.saavncdn.com/508/Sankranthiki-Vasthunam-Telugu-2025-20250114191008-500x500.jpg",
    "https://c.saavncdn.com/454/Game-Changer-Telugu-Telugu-2025-20250204083253-500x500.jpg",
    "https://c.saavncdn.com/222/Kadhalikka-Neramillai-Telugu-Telugu-2025-20250213171003-500x500.jpg",
   'https://c.saavncdn.com/673/Maata-Vinaali-From-Hari-Hara-Veera-Mallu-Telugu-Telugu-2025-20250116140745-500x500.jpg',
  'https://c.saavncdn.com/605/Saami-Soodaraa-From-Baapu-Telugu-2025-20250218110052-500x500.jpg',
  'https://c.saavncdn.com/284/Shiva-Shiva-Shankaraa-From-Kannappa-Telugu-Telugu-2025-20250210171004-500x500.jpg',



  ];

  return (
    <div className="container text-center mt-4">
      <h1 className="mb-4">Music Gallery</h1>
      <div className="row">
        {musicImages.map((image, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div className="card shadow-sm">
              <img src={image} className="card-img-top" alt={`Music ${index + 1}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Music;
