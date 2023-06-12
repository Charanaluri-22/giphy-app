import  { useState } from 'react';
import "./App.css"

const GifContainer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gifs, setGifs] = useState([]);

  const searchGIFs = () => {
    const apiKey = import.meta.env.VITE_APIKEY;

    // Clear previous GIFs
    setGifs([]);

    // Make API request
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=10`)
      .then(response => response.json())
      .then(data => {
        const processedGifs = data.data.map(gif => ({
          gifUrl: gif.images.fixed_height.url,
          gifTitle: gif.title
        }));
        setGifs(processedGifs);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="container">
      <h1 className="heading">GIPHY GIF Search</h1>
      <input
        type="text"
        placeholder="Enter a word"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button onClick={searchGIFs} className="btn">Search</button>
      <div className="gif-container">
        {gifs.map((gif, index) => (
          <div className="gif-item" key={index}>
            <img src={gif.gifUrl} alt={gif.gifTitle} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GifContainer;
