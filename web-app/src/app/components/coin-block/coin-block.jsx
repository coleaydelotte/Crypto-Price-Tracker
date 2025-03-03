import { Box, Typography } from '@mui/material';
import './coin-block.css';

export default function CoinBlock(props) {
    function formatNumber(num) {
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const name = props.name;
    const price = formatNumber(parseFloat(props.price).toFixed(2));
    const marketCap = formatNumber(parseFloat(props.marketCap).toFixed(2));
    const volume = formatNumber(parseFloat(props.volume).toFixed(2));

    return (
        <Box className="coin-block">
            <Typography className={"title"} fontFamily={'monospace'} fontSize={20} fontWeight={700}>
                {name}
            </Typography>
            <br/>
            <Typography className={"desc"} fontFamily={'monospace'}>
                Price: ${price}
            </Typography>
            <Typography className={"desc"} fontFamily={'monospace'}>
                Market Cap: ${marketCap}
            </Typography>
            <Typography className={"desc"} fontFamily={'monospace'}>
                Volume (24h): ${volume}
            </Typography>
        </Box>
    );
}