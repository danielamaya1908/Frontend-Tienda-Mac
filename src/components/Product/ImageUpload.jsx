import React, { useState } from 'react';

const ImageUpload = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    const imageUrls = imageFiles.map(file => URL.createObjectURL(file));

    setImages([...images, ...imageUrls]);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <div className="mb-3">
      <label htmlFor="image" className="form-label">Imágenes:</label>
      <input type="file" id="image" name="image" className="form-control" onChange={handleImageChange} multiple />
      {images.map((image, index) => (
        <div key={index} className="mt-2">
          <img src={image} alt={`Imagen ${index + 1}`} style={{ width: '100px', height: 'auto' }} />
          <button type="button" className="btn btn-danger ms-2" onClick={() => handleRemoveImage(index)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default ImageUpload;
