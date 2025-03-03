"use client";
import { useEffect, useState } from 'react';
import './page.css';
import { Box, Typography, Stack } from '@mui/material';
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

  useEffect(() => {
    if (data) {
      setCoins(data.data);
    }
  }
  , [data]);

  return (
    <Box className='main'>
      <h1>Welcome to the Coin Tracker App!</h1>
      <button className={"refresh-button"} onClick={fetchCoins} disabled={isLoading}>
        <Typography fontFamily={'monospace'} fontSize={20} fontWeight={700}>
          {isLoading ? 'Loading...' : 'Refresh Coins'}
        </Typography>
      </button>
      <Stack className='coin-grid'>
       {coins.map((coin, index) => (
          <CoinBlock
            key={index}
            name={coin.name}
            price={coin.priceUsd}
            marketCap={coin.marketCapUsd}
            volume={coin.volumeUsd24Hr}
          />
        ))}
      </Stack>
      <br/>
    </Box>
  );
}
