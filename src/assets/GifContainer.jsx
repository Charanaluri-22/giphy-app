import  { useState } from 'react';
import "./App.css"
import API_KEY  from './config';
import SwalModal from 'sweetalert2';


const GifContainer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [limitTerm,setLimitTerm] = useState('');
  const [gifs, setGifs] = useState([]);

  const searchGIFs = () => {
    const apiKey = API_KEY
    if(limitTerm && searchTerm)
    {
      
    // Clear previous GIFs
    setGifs([]);

    // Make API request
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=${limitTerm}`)
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
    }
    else{
      SwalModal.fire({
        title: "Error",
        text: "please enter both search and limit term",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };
  const deleteGIFS = ()=>
  {
    setSearchTerm("");
    setLimitTerm("");
    setGifs([]);
  }
  return (
    <div className="container">
  <div className='formcontainer'>
    <h1 className="heading">GIPHY GIF Search</h1>

    <label htmlFor="searchInput"><h3>Search Term:</h3></label>
    <input
      type="text"
      id="searchInput"
      required
      placeholder="Enter a word"
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
    /><br/>
    <label htmlFor="limitInput"><h3>Limit term:</h3></label>
    <input
      type="text"
      id="limitInput"
      required
      placeholder="Enter no of gifs you want"
      value={limitTerm}
      onChange={e => setLimitTerm(e.target.value)}
    /><br/>


    <div className='inputcontainer'>
      <button onClick={searchGIFs} className="btn">Search</button>
      <button onClick={deleteGIFS} className="btn">Delete Search</button>
    </div>
  </div>

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
