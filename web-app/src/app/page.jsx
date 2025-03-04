"use client";
import { useEffect, useState } from 'react';
import './page.css';
import { Box, Typography, Stack, Modal, TextField } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import retrieveCoins from './api/fetch/route';
import CoinBlock from './components/coin-block/coin-block';
import LoadingModal from './components/loading-modal/loading-modal';

export default function Home() {

  const [coins, setCoins] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [filterState, setFilterState] = useState("");
  const queryClient = useQueryClient();

  const fetchCoins = async () => {
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
    if (data) {
      const dataObj = data.data.slice(0, 5);
      setCoins(dataObj);
    }
  }
  , [data]);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(filterState.toLowerCase())
  );

  return (
    <Box className='main'>
      <Modal open={errorMsg}><h1 className={"error-msg"}>Error: {errorMsg}</h1></Modal>
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
       {filteredCoins.map((coin, index) => (
          <CoinBlock
            key={index}
            name={coin.name}
            price={coin.priceUsd}
            marketCap={coin.marketCapUsd}
            volume={coin.volumeUsd24Hr}
          />
        ))}
      </Stack>
      <TextField
        className='text-field'
        label="Filter Coin Names"
        variant="outlined"
        onChange={(e) => setFilterState(e.target.value)}
        sx={{
          "& label": { color: "rgb(255, 255, 255)" },
          "& label.Mui-focused": { color: "rgb(255, 255, 255)" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "rgba(240, 46, 170, 1)" },
            "&:hover fieldset": { borderColor: "rgba(240, 46, 170, 1)" },
            "&.Mui-focused fieldset": { borderColor: "rgba(240, 46, 170, 1)" },
          },
          "& .MuiInputBase-input": {
            color: "rgb(255, 255, 255)",
            caretColor: "rgb(255, 255, 255)",
            fontWeight: "bold",
          }
        }}
      />
      <br/>
    </Box>
  );
}
