import { Modal, Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const Popup = ({parameters}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (parameters.open && parameters.open == true) {
            handleOpen();
        }
    }, [parameters.open]);

    if (open == false) {
        if (parameters) {
            parameters.setOpen(false);
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    { parameters.titleText }
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    { parameters.descriptionText }
                </Typography>
            </Box>
        </Modal>
    );
};
