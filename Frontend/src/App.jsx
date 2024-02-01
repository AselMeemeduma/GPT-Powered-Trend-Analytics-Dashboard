import { useState } from 'react'
import axios from 'axios'
import SearchBar from './Components/SearchBar'
import TrendingCards from './Components/TrendingCards';
import Gif from './gif/loading.gif';

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);  // New state variable for loading status

  const handleSearch = async (searchInput) => {
    setIsLoading(true);  // Set loading status to true before making the request
    const response = await axios.post('http://localhost:5000/api/search', { searchInput });
    const text = response.data.choices[0].text;
    const jsontext = JSON.parse(text);
    setData(jsontext.trendings);
    setIsLoading(false);  // Set loading status to false after the request is complete
  };

  return (
    <>
      <SearchBar handleSearch={handleSearch} />
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <img src={Gif} style={{ width: '800px', height: '800px' }} />  
        </div>
      ) : (
        <TrendingCards trendings={data} />
      )}
    </>
  )
}

export default App