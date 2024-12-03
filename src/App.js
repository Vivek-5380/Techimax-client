// src/App.js

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import ImageDisplay from './components/ImageDisplay';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setImages(null);

    try {
      const response = await axios.post('https://techimax-server-production.up.railway.app/api/generate', {
        content: prompt,
      });

      setImages(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to generate images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Paragraph to Image Generator</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt..."
          rows="5"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Images'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {images && (
        <div className="results">
          <h2>Paragraph Images</h2>
          {images.paragraphImages.map((image, index) => (
            <ImageDisplay
              key={index}
              paragraph={image.paragraph}
              imageUrl={image.imageUrl}
            />
          ))}

          <h2>Overall Image</h2>
          <img
            src={images.overallImage}
            alt="Overall"
            className="overall-image"
          />
        </div>
      )}
    </div>
  );
};

export default App;
