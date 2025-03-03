import { Box, Typography } from '@mui/material';
import './coin-block.css';

export default function CoinBlock(props) {
    return (
        <Box className="coin-block">
            <Typography fontFamily={'monospace'} fontSize={20} fontWeight={700}>
                {props.name}
            </Typography>
            <br/>
            <Typography fontFamily={'monospace'}>
                Price: ${props.price}
                Market Cap: ${props.marketCap}
                Volume (24h): ${props.volume}
            </Typography>
        </Box>
    );
}