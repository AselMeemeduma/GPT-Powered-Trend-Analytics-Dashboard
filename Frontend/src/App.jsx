import { useState } from 'react'
import axios from 'axios'
import SearchBar from './Components/SearchBar'
import TrendingCards from './Components/TrendingCards';

function App() {
  const [data, setData] = useState(null);

  const handleSearch = async (searchInput) => {
    const response = await axios.post('http://localhost:5000/api/search', { searchInput });
    console.log(response.data);
    const text = response.data.choices[0].text;
    const jsontext = JSON.parse(text);
    console.log(jsontext);
    setData(jsontext.trendings);
  };

  return (
    <>
      <SearchBar handleSearch={handleSearch} />
      <TrendingCards trendings={data} />
    </>
  )
}

export default App