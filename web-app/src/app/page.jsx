"use client";
import { useEffect, useState } from 'react';
import './page.css';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import retrieveCoins from './api/fetch/route';
import CoinBlock from './components/coin-block/coin-block';

export default function Home() {

  const [coins, setCoins] = useState([]);

  const fetchCoins = async () => {
    console.log('Fetching coins...');
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['coins'],
    queryFn: retrieveCoins,
  });

  useEffect(() => {
    document.body.style.cursor = isLoading ? 'wait' : 'default';
  }, [isLoading]);

  return (
    <Box className='main'>
      <h1>Welcome to the Coin Tracker App!</h1>
      <button onClick={fetchCoins} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Fetch Coins'}
      </button>
      <ul>
        {coins.map((coin, index) => (
          <li key={index}>{coin.name} - ${coin.price}</li>
        ))}
      </ul>
      <br/>
      <CoinBlock
        name="Bitcoin"
        price="50000"
        marketCap="900B"
        volume="50B"
      />
      {console.log(data)}
    </Box>
  );
}
