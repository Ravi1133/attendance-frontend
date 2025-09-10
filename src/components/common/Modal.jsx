import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

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

export default function BasicModal({ openModel, setopenModel, actionbtn }) {

    const [password,setPassword] =React.useState("")
    return (
        <div>
            <Modal
                open={openModel}
                onClose={() => setopenModel(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2 className='font-semibold text-[24px]'>Reset Password</h2>

                    <TextField type='outline' className='w-full' onChange={(e)=>setPassword(e.target.value)} />
                    <div className='p-4 flex justify-between'>
                        <Button variant='contained' onClick={() =>actionbtn(password)}>Submit</Button>

                        <Button variant='contained' className='ml-[10px]'>Close</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}