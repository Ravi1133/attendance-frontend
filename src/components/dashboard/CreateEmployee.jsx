import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { useEffect, useState } from 'react'
import { createUser } from '../../service/apicall'
import { toast } from 'react-toastify'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { localUserData } from '../../utils'

let initialState={
        name: "",
        address: "",
        mobile: "",
        email: "",
        roleId: "",
        adhar: ""
    }
export default function CreateEmployee({ setopenForManager, roles, employee,getAllEmployeeUserFunc }) {
    const [state, setstate] = useState(initialState)
    console.log("state", state)
    let filterRoles = roles.filter((item) => item.roleName == "employee")
    console.log("filterRoles", filterRoles)
    console.log("role", roles)
    const createUserFunc = async (data) => {
        let payload = {
            name: state.name,
            roleId: state.roleId || filterRoles[0]._id,
            mobile: state.mobile,
            email: state.email,
            address: state.address,
            adhar: state.adhar,
            pincode: "110044"
        }
        let response = await createUser(payload)
        console.log("response", response)

        if (response.status==200) {
            toast.success("Added successfull")
            setstate(initialState)
            getAllEmployeeUserFunc()
        } else {

        }

    }

    useEffect(() => {
        // toast.error("Added successfull")
    }, [])

    const submitHandle = (e) => {
        debugger
        e.preventDefault()
        createUserFunc()
    }
    let userData = localUserData()

    const  RoleDiv = () => {
        // let rolesArr=roles.filter((item)=>item.roleName)
        return <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Role"
                value={state.roleId}
                className='w-full text-start'
                onChange={(e) => setstate((state) => { return { ...state, roleId: e.target.value } })}
            >
                {
                    roles?.map((item) => {
                        return <MenuItem value={item._id}>{item.roleName}</MenuItem>
                    })
                }

            </Select>
        </FormControl>
    }

    return (
        <div className='border border-gray-300 rounded shadow'>
            <form onSubmit={submitHandle}>
                <Typography fontSize={22} className=' text-center p-4'>Add Employee</Typography>

                <div className='my-2 w-full px-5' >
                    <TextField required id="outlined-basic" value={state.name} onChange={(e) => setstate((state) => { return { ...state, [e.target.name]: e.target.value } })} className='w-full' name="name" label="Name" variant="outlined" />
                </div>
                {userData.roleId.roleName=="admin"&&<div className='my-2 w-full px-5' >
                    <RoleDiv/>
                </div>}
                <div className='my-2 px-5'>
                    <TextField  id="outlined-basic" value={state.address} onChange={(e) => setstate((state) => { return { ...state, [e.target.name]: e.target.value } })} className='w-full' name="address" label="Address" variant="outlined" />
                </div>
                <div className='my-2 px-5'>
                    <TextField  id="outlined-basic" value={state.adhar} onChange={(e) => setstate((state) => { return { ...state, [e.target.name]: e.target.value } })} className='w-full' name="adhar" label="Adhar" variant="outlined" inputProps={{ maxLength: "12" }} />
                </div>
                <div className='my-2 px-5'>
                    <TextField required id="outlined-basic" value={state.mobile} onChange={(e) => setstate((state) => { return { ...state, [e.target.name]: e.target.value } })} className='w-full' inputProps={{ maxLength: "10", pattern: "^[0-9]{10}$" }} name="mobile" label="Mobile" variant="outlined" />
                </div>
                <div className='my-2 px-5'>
                    <TextField type='email'  id="outlined-basic" value={state.email} onChange={(e) => setstate((state) => { return { ...state, [e.target.name]: e.target.value } })} className='w-full' name="email" inputProps={{
                        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", // Notice the double backslashes in JSX
                    }} label="email" variant="outlined" />
                </div>
                <div className='px-5 my-3' style={{ display: "flex", justifyContent: "center" }}>
                    <Button type='submit' variant="contained" className='mx-auto'>Submit</Button>
                    {/* <Button variant="contained" className='mx-auto' sx={{ marginLeft: "20px" }} onClick={() => setopenForManager(false)}>Close</Button> */}
                </div>
            </form>
        </div>
    )
}
