import { Modal } from '@mui/material';
import './loading-modal.css';

export default function LoadingModal(props) {
    return(
        <Modal
            className={"modal"}
            open={props.open}
            sx={props.sx}
        >
            <div className={"loader"}/>
        </Modal>
    );
}