import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import CreateClientMode from './CreateClientMode';
import Modal from '@mui/material/Modal';
import CreateManagerModel from './CreateManagerModel';
import MarkAttendance from './MarkAttendance';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalculateIcon from '@mui/icons-material/Calculate';
import CreateEmployee from './CreateEmployee';
import "./style.css"
import { getAllRoles, getAllUsers, getAttendenceData, getClient } from '../../service/apicall';
import BasicTable from './Table';
import BasicClientTable from './ClientTable';
import AttandanceTable from './AttendanceTable';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { localUserData } from '../../utils';
import moment from 'moment';

export default function Dashboard() {
  const [open, setOpen] = React.useState(false)
  const [openForManager, setopenForManager] = React.useState(false)
  const [activeTab, setactiveTab] = React.useState(0)
  const [roles, setRoles] = React.useState([])
  const [employee, setemployee] = React.useState([])
  const [client, setclient] = React.useState([])
  const [attendanceData, setattendanceData] = React.useState([])
  const navigate = useNavigate()
  const handleClose = () => {
    setOpen(false)
    setopenForManager(false)
  }
  console.log("activeTab", activeTab)
  const getAllRolesFunc = async () => {

    let response = await getAllRoles()
    console.log("response", response)
    if (response.status == 200) {
      setRoles(response.data?.roles)
    } else {
      toast.error("Something went wrong")
    }
  }

  const getAllEmployeeUserFunc = async () => {

    if (roles.length) {

      let filterRoles = roles.filter((item) => ["employee", "manager"].includes(item.roleName))
      // let query= `?roleId=${filterRoles[0]._id}` 

      let query = "?page=1&pageSize=20"
      let payload={
        // pageSize:20
      }
      let data = await getAllUsers(query,payload)
      console.log(data, "data getAllUsers")
      if (data.status == 200) {
        setemployee(data.data.userData)
      }
    }
  }
  const getAllClientFunc = async () => {

    if (roles?.length) {

      let data = await getClient({})
      console.log(data, "data client")
      if (data.status == 200) {
        setclient(data?.data?.data)
      }
    }
  }
  const getAllAttendance = async (selectedClient, selectedEmployee, selectedDate,tab) => {
    let body = {}
    
    if(tab){
        tab=="Today"?body.date=moment().format("YYYY-MM-DD"):""
    }
    if (selectedClient) {
      body = { ...body, clientId: selectedClient }
    }
    if (selectedEmployee) {
      body = { ...body, userId: selectedEmployee }
    }
    if (selectedDate) {
      body = { ...body, date: selectedDate }
    }
    if (roles.length) {

      let data = await getAttendenceData(body)
      console.log(data, "data client")
      if (data?.status == 200) {
        setattendanceData(data.data.data)
      }
    }
  }

  console.log("client", client)

  React.useEffect(() => {
    if (!roles.length) {

      getAllRolesFunc()
    } else {
      getAllEmployeeUserFunc()
      getAllClientFunc()
      getAllAttendance("","","","Today")

    }

  }, [roles])
  console.log("employee", employee)
  console.log("client", client)

  const styleChipRed = {
    width: "fit-content",
    padding: "2px 4px",
    backgroundColor: "#EE204D",
    color: "white"
  }

  const logoutFunc = () => {
    localStorage.clear("token")
    toast.success("Logout Successfull")
    navigate("/login")
  }

  let userData=localUserData()

  const tabs = [{ name: "Mark Attendance", icon: AssignmentIcon }, { name: "Employee", icon: PersonAddAltIcon }, { name: "Client", icon: CalculateIcon }]
  return (
    <Box sx={{ flexGrow: 1 }} className="bg-[#f1f4f9]">
      <AppBar position="static" sx={{ maxWidth: "1256px", margin: "auto" }}>
        <Toolbar sx={{ width: "100%", backgroundColor: "white", color: "black", margin: "auto", display: "flex", justifyContent: "space-between" }}>

          <Typography sx={{ fontWeight: "bold", font: "22px" }}>Attendify</Typography>
          <Box sx={{ display: "flex", fontWeight: "bold" }}> <Typography>{userData.roleId?.roleName?.toUpperCase()||""}</Typography>
            <LogoutIcon onClick={logoutFunc} className='cursor-pointer' />
          </Box>

        </Toolbar>
      </AppBar>
      <div className='text-start max-w-[1256px]  mx-auto my-3'> <span className='text-[28px] px-4 md:text-[32px] font-bold '>{localUserData().name}</span> <span className='font-semibold'>({localUserData().roleId.roleName})</span></div>
      <div className='tabcss' >
        <div className="mt-4 grid grid-cols-3 p-1 bg-gray-200">
          {tabs.map((item, index) => (
            <div
              key={item.name}
              //  role="button"
              onClick={() => setactiveTab(index)}
              className={`cursor-pointer flex items-center justify-center col-span-1 p-2  transition-all duration-300 ease-in-out ${activeTab == index ? "bg-[white]  rounded " : ""}`}
            >
              <span><item.icon /></span>
              <span className='ms-1'>{item.name}</span>
            </div>
          ))}
        </div>


      </div>
    


      <div style={{ maxWidth: "1256px", width: "100%", margin: "auto" }}>
        {
          activeTab == 0 && <div className='mt-3 p-6 '>
            <div className='bg-white rounded-lg p-3 md:p-10'>
              <div className='text-[28px] md:text-[30px] font-semibold text-start'>Record Attendance</div>
              <div className='max-w-[550px] mx-auto mt-7'>
                <MarkAttendance roles={roles} client={client} employee={employee} getAllAttendance={getAllAttendance} />
              </div>
            </div>
            <div className='mt-10  bg-white rounded-lg p-10'>

              <AttandanceTable attendanceData={attendanceData} employee={employee} client={client} getAllAttendance={getAllAttendance} />
            </div>
          </div>
        }

        {
          activeTab == 1 && <div className='mt-3 px-5  py-10'>
            <div className='bg-white rounded-lg p-3 md:p-10'>
              <div className='text-[30px] font-semibold text-start'>Record Employee</div>

              <div className='max-w-[450px] mx-auto bg-white'>
                <CreateEmployee setClose={setOpen} roles={roles} getAllEmployeeUserFunc={getAllEmployeeUserFunc} ></CreateEmployee>
              </div>
            </div>

            {userData.roleId?.roleName=="admin"&&<div className='mt-10 bg-white rounded-lg p-10'>
              <BasicTable employee={employee} funcCallAfterUpdate={getAllEmployeeUserFunc} />
            </div>}

          </div>
        }

        {
          activeTab == 2 && <div className='mt-3   py-10'>
            <div className='bg-white rounded-lg p-3 md:p-10'>
              <div className='text-[30px] font-semibold text-start'>Record Client</div>

              <div className='max-w-[450px] mx-auto bg-white w-full'>
                <CreateClientMode setClose={setOpen} roles={roles}></CreateClientMode>
              </div>
            </div>

            {userData.roleId?.roleName=="admin"&&<div className=' mt-10  bg-white rounded-lg p-10'>
              <BasicClientTable client={client} funcCallAfterUpdate={getAllClientFunc} />
            </div>}
          </div>
        }

      </div>
    </Box>
  );
}
