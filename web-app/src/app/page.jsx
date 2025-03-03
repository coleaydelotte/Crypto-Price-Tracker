"use client";
import { useEffect, useState } from 'react';
import './page.css';
import { Box, Typography, Stack, Modal } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import retrieveCoins from './api/fetch/route';
import CoinBlock from './components/coin-block/coin-block';
import LoadingModal from './components/loading-modal/loading-modal';

export default function Home() {

  const [coins, setCoins] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const queryClient = useQueryClient();

  const fetchCoins = async () => {
    console.log('Fetching coins...');
    queryClient.invalidateQueries(['coins']);
  }

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ['coins'],
    queryFn: retrieveCoins,
    staleTime: 1000 * 60 * 5
  });

  useEffect(() => {
    if (error) {
      setErrorMsg(error.message);
    }
  }, [error]);

  useEffect(() => {
    console.log('Loading state:', isFetching);
  }, [isFetching]);

  useEffect(() => {
    if (data) {
      const dataObj = data.data.slice(0, 5);
      setCoins(dataObj);
    }
  }
  , [data]);

  return (
    <Box className='main'>
      {errorMsg && <h1 className={"error-msg"}>{errorMsg}</h1>}
      <LoadingModal open={isFetching} sx={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}/>
      <a className='header' fontFamily={'monospace'}>
        Welcome to the Coin Tracker App!
      </a>
      <button className={"refresh-button"} onClick={fetchCoins} disabled={isFetching}>
        <Typography fontFamily={'monospace'} fontWeight={700}>
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
