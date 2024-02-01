import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

function SearchBar({ handleSearch }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchInput);
  };

  return (
    <>
      <Typography variant="body2" sx={{ fontSize: '3.5rem', textAlign: 'center'  }}>
          <strong>GPT-Powered Trend Analytics Dashboard</strong>
      </Typography>
      <Box component="form" onSubmit={handleSubmit} display="flex" justifyContent="center" alignItems="center">
        <TextField 
          label="Enter a keyword to search for trends" 
          variant="outlined" 
          value={searchInput} 
          onChange={(e) => setSearchInput(e.target.value)} 
          sx={{ width: '50%', mr: 1 }}
          //InputLabelProps={{ style: { fontSize: '1.5rem' } }} 
          inputProps={{ style: { fontSize: '1.8rem' } }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ minHeight: '75px', minWidth: '70px', fontSize: '1.8rem' }} >
          Submit
        </Button>
      </Box>
    </>
    
  );
}

export default SearchBar;