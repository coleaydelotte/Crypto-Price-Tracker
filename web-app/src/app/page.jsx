"use client";
import { useEffect, useState } from 'react';
import './page.css';
import { Box, Typography } from '@mui/material';
const axios = require('axios');

export default function Home() {

  const [isLoading, setIsLoading] = useState(false);
  const [coins, setCoins] = useState([]);

  const fetchCoins = async () => {
    setIsLoading(true);
    const response = await fetch('/api/coins');
    const data = await response.json();
    setCoins(data);
    setIsLoading(false);
  }

  useEffect(() => {
    document.body.style.cursor = isLoading ? 'wait' : 'default';
  }, [isLoading]);

  return (
    <Box className='main'>
      <Typography>
        <h1>Welcome to the Coin Tracker App!</h1>
        <button onClick={fetchCoins} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Fetch Coins'}
        </button>
        <ul>
          {coins.map((coin, index) => (
            <li key={index}>{coin.name} - ${coin.price}</li>
          ))}
        </ul>
      </Typography>
    </Box>
  );
}
