import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { useRef, useState } from 'react'
import { createClient } from '../../service/apicall'
import { toast } from 'react-toastify'

export default function CreateClientMode({ setOpen }) {
    const nameRef = useRef(null)
    const addressRef = useRef(null)
    const mobileRef = useRef(null)
    const emailRef = useRef(null)
    const pincodeRef = useRef(null)
    const gstRef = useRef(null)
    // console.log("ref",nameRef?.current?.value)
    // const [state, setstate] = useState({
    //     name: nameRef?.current?.value,
    //     address: addressRef?.current?.value,
    //     mobile: mobileRef?.current?.value,
    //     email: emailRef?.current?.value,
    //     pincode: pincodeRef?.current?.value,
    //     gst: gstRef?.current?.value,
    // })
    const resetFunction = () => {
        nameRef.current.value = ""
        addressRef.current.value = ""
        mobileRef.current.value = ""
        emailRef.current.value = ""
        pincodeRef.current.value = ""
    }
    const createClientFunc = async (e) => {
        e.preventDefault()
        debugger
        try {
            let payload = {
                name: nameRef?.current?.value,
                address: addressRef?.current?.value,
                mobile: mobileRef?.current?.value,
                email: emailRef?.current?.value,
                pincode: pincodeRef?.current?.value,
            }
            if (gstRef?.current?.value) {
                payload = { ...payload, gst: gstRef?.current?.value }

            }
            let data = await createClient(payload)
            console.log("data", data)
            if (data.status == 200) {
                toast.success("Added Success")
                resetFunction()
            }
        } catch (err) {
            console.log(err)
        }
    }

    // console.log("state", state)
    return (
        <div className='border border-gray-300 rounded shadow'>
            <Typography fontSize={22} className=' text-center p-4'>Add Client</Typography>
            <form onSubmit={createClientFunc}>
                <div className='my-2 w-full px-5' >
                    <TextField inputRef={nameRef} required inputProps={{ maxLenght: 70 }} id="outlined-basic" className='w-full' name="name" label="Name" variant="outlined" />
                </div>
                <div className='my-2 px-5'>
                    <TextField inputRef={addressRef} required inputProps={{ maxLenght: 70 }} id="outlined-basic" className='w-full' name="address" label="Address" variant="outlined" />
                </div>
                <div className='my-2 px-5'>
                    <TextField inputRef={pincodeRef} required inputProps={{ maxLenght: 70 }} id="outlined-basic" className='w-full' name="pincode" label="Pincode" variant="outlined" />
                </div>
                <div className='my-2 px-5'>
                    <TextField inputRef={mobileRef} required inputProps={{ maxLength: "10", pattern: "^[0-9]{10}$" }} id="outlined-basic" className='w-full' name="mobile" label="Mobile" variant="outlined" />
                </div>
                <div className='my-2 px-5'>
                    <TextField inputRef={emailRef} id="outlined-basic" required type='email' className='w-full' name="email" label="email" variant="outlined" inputProps={{
                        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", // Notice the double backslashes in JSX
                    }} />
                </div>
                <div className='my-2 px-5'>
                    <TextField inputRef={gstRef} id="outlined-basic" type='gst' className='w-full' name="gst" label="GST" variant="outlined" inputProps={{
                        pattern: "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$", // Notice the double backslashes in JSX
                    }} />
                </div>
                <div className='px-5 my-3' style={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" type='submit' className='mx-auto'>Submit</Button>
                    {/* <Button variant="contained" className='mx-auto' sx={{ marginLeft: "20px" }} onClick={() => setOpen(false)}>Close</Button> */}
                </div>
            </form>
        </div>
    )
}
