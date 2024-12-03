// src/components/ImageDisplay.js

import React from 'react';
import './ImageDisplay.css';

const ImageDisplay = ({ paragraph, imageUrl }) => {
    return (
        <div className="image-display">
            <p>{paragraph}</p>
            <img src={imageUrl} alt="Generated" />
        </div>
    );
};

export default ImageDisplay;
