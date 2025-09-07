import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getAllRoles, loginUser } from '../../service/apicall';
import { toast } from "react-toastify"
import TextField from '@mui/material/TextField';
import "./style.css"
import { FaRegCircleUser } from "react-icons/fa6";
import Button from '@mui/material/Button';
import { useState } from 'react';
import  {useNavigate} from "react-router-dom" 
 let stickyRoles=[
    {
        "permissions": {
            "client": [
                "create",
                "update",
                "delete"
            ],
            "manager": [
                "create",
                "update",
                "delete"
            ],
            "employee": [
                "create",
                "update",
                "delete"
            ]
        },
        "_id": "688f3aff02d4f58f5dbd6a41",
        "roleName": "admin",
        "createdAt": "2025-08-03T10:33:35.923Z",
        "updatedAt": "2025-08-03T10:33:35.923Z",
        "__v": 0
    },
    {
        "permissions": {
            "client": [],
            "manager": [
                "update"
            ],
            "employee": [
                "create",
                "update"
            ]
        },
        "_id": "688f3d1c02d4f58f5dbd6a43",
        "roleName": "manager",
        "createdAt": "2025-08-03T10:42:36.313Z",
        "updatedAt": "2025-08-03T10:42:36.313Z",
        "__v": 0
    },
    {
        "permissions": {
            "client": [],
            "manager": [],
            "employee": [
                "update"
            ]
        },
        "_id": "688f56226bf1aeba4d2938dc",
        "roleName": "employee",
        "createdAt": "2025-08-03T12:29:22.515Z",
        "updatedAt": "2025-08-03T12:29:22.515Z",
        "__v": 0
    }
]
export default function LoginPage() {
  const [age, setAge] = React.useState('');
  const [role, setrole] = useState(stickyRoles)
  const [roles, setRoles] = React.useState([])
  const [mobile, setmobile] = React.useState("")
  const [password, setpassword] = React.useState("")
  const navigate=useNavigate()

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const getAllRolesFunc = async () => {

    let response = await getAllRoles()
    console.log("response", response)
    if (response.status == 200) {
      setRoles(response.data?.roles)
    } else {
      toast.error("Something went wrong")
    }
  }

  const loginFunc = async (e) => {
    e.preventDefault()
    if(!mobile || !password ||!role){
      toast.error("Check Credentials")
      return
    }
    let payload = {
      mobile: mobile,
      password: password
    }
    let response = await loginUser(payload)
    console.log("response", response)
    if (response.status == 200) {
      toast.success("Login Successfully")
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("userData",JSON.stringify(response.data.userData))
      navigate("/")
    }
  }
  React.useEffect(() => {
    getAllRolesFunc()
  }, [])

  console.log(roles, "roles")
 

  return (
    <div className=' h-[100%] flex bg-[#f1f4f9]'>
    <Box className="bg-white rounded-lg" sx={{ maxWidth:700,width:500, minWidth: 240,height:430, padding: "30px",margin:"auto" }}>
      <div className=''> <FaRegCircleUser size={55} className='mx-auto' /></div>
      <p className='text-[28px] font-semibold'>Welcome to Attendify</p>
      <p className='text-[16px] text-gray-600'>Please select your role to continue</p>
      <form onSubmit={loginFunc} className='mt-3'>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role}
          className='text-start'
          label="Age"
          onChange={(e) => setrole(e.target.value)}
        >
          {
            roles.filter((item) => item.roleName !== "employee")?.map((item) => {
              return <MenuItem value={item._id}>{item.roleName}</MenuItem>
            })
          }

        </Select>

        <TextField required id="outlined-basic" sx={{ marginY: "10px" }} onChange={(e) => setmobile(e.target.value)} inputProps={{ maxLength: "10" }} className='textFeild' label="mobile" variant="outlined" />
        <TextField required id="outlined-basic" className='textFeild' onChange={(e) => setpassword(e.target.value)} type="password" label="Password" variant="outlined" />
        <Button variant="contained" type='submit' onClick={loginFunc} sx={{ marginY: "10px" }}>Login</Button>
      </FormControl>
      </form>
    </Box>
    </div>
  );
}