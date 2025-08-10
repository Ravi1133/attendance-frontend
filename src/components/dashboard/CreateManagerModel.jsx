import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'

export default function CreateManagerModel({setopenForManager}) {
    const [state,setstate]=useState({
        name:"",
        address:"",
        mobile:"",
        email:""
    })
    return (
        <div className='border border-gray-300 rounded shadow'>
            <Typography fontSize={22} className=' text-center p-4'>Add Manager</Typography>
            <div className='my-2 w-full px-5' >
                <TextField id="outlined-basic" className='w-full' name="name" label="Name" variant="outlined" />
            </div>
            <div className='my-2 px-5'>
                <TextField id="outlined-basic" className='w-full' name="address" label="Address" variant="outlined" />
            </div>
            <div className='my-2 px-5'>
                <TextField id="outlined-basic" className='w-full' name="mobile" label="Mobile" variant="outlined" />
            </div>
            <div className='my-2 px-5'>
                <TextField id="outlined-basic" className='w-full' name="email" label="email" variant="outlined" />
            </div>
            <div className='px-5 my-3' style={{display:"flex",justifyContent:"center"}}>
                <Button variant="contained" className='mx-auto'>Submit</Button>
                <Button variant="contained" className='mx-auto' sx={{marginLeft:"20px"}} onClick={()=>setopenForManager(false)}>Close</Button>
            </div>
        </div>
    )
}
