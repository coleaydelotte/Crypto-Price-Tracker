import { Box, Typography, Stack, Grid2 } from '@mui/material';
import './coin-block.css';
export default function CoinBlock(props) {

    function formatNumber(num) {
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas to number
    }

    function abbreviateNumber(num) {
        if (num >= 1_000_000_000) {
            return (num / 1_000_000_000).toFixed(2) + 'B';
        } else if (num >= 1_000_000) {
            return (num / 1_000_000).toFixed(2) + 'M';
        } else if (num >= 1_000) {
            return (num / 1_000).toFixed(2) + 'K';
        } else {
            return num.toFixed(2);
        }
    }

    const name = props.name;
    const price = formatNumber(parseFloat(props.price).toFixed(2));
    const marketCap = abbreviateNumber(parseFloat(props.marketCap));
    const volume = abbreviateNumber(parseFloat(props.volume));

    return (
        <Box className="coin-block">
            <Grid2 className={"grid"} spacing={2}>
                <Box className={"item-box"}>
                    <Typography className={"title"} fontFamily={'monospace'}>
                        {name}
                    </Typography>
                </Box>
                <Box className={"item-box"}>
                    <Typography className={"desc"} fontFamily={'monospace'}>
                        Price: ${price}
                    </Typography>
                </Box>
                <Box className={"item-box"}>
                    <Typography className={"desc"} fontFamily={'monospace'}>
                        MC: ${marketCap}
                    </Typography>
                </Box>
                <Box className={"item-box"}>
                    <Typography className={"desc"} fontFamily={'monospace'}>
                        Vol: ${volume}
                    </Typography>
                </Box>
            </Grid2>
        </Box>
    );
}