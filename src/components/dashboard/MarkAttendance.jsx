import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useState } from 'react'
import { MdOutlineDateRange } from "react-icons/md";
import "./style.css"
import TextField from '@mui/material/TextField';
import { attendenceStatusEnum, attendenceTypeEnum, shiftEnum } from "../../utils/constant"
import moment from "moment"
import { markAttendance } from '../../service/apicall';
import { toast } from 'react-toastify';
export default function MarkAttendance({ client, employee, getAllAttendance }) {
    const [userId, setuserId] = useState("")
    const [AttendanceType, setAttendanceType] = useState("")
    const [status, setstatus] = useState("")
    const [shift, setshift] = useState("")
    const [selectedClient, setselectedClient] = useState("")

    console.log("employee",employee)
    const submitHandler = async (e) => {
        debugger
        e.preventDefault()
        let payalod = {
            userId: userId,
            clientId: selectedClient,
            AttendanceType: AttendanceType,
            status: status,
            shift: shift,
            date: moment().format("YYYY-MM-DD")
        }
        let response = await markAttendance(payalod)
        if (response.status == 200) {
            toast.success("Attendance Marked")
            getAllAttendance()
        }

    }
    return (
        <div className='border border-gray-300 rounded shadow'>
            <form onSubmit={submitHandler}>
                <div className='  mx-auto px-3 my-4'>
                    <div className='flex items-center text-lg font-semibold'><MdOutlineDateRange /><p className='ms-1'>Mark Attendence</p></div>
                    <p className=' text-start'>Record attendance for today: August 6, 2025</p>
                    <div className='formSection  mt-3'>
                        <div className=' wrapperDiv  px-2'>
                            <div className=' w-full text-start mb-1 font-semibold'>Client</div>
                            <div >
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    className='w-full p-0 text-start'
                                    // value={age}
                                    // label="Age"
                                    // onChange={handleChange}
                                    onChange={(e) => setselectedClient(e.target.value)}
                                >
                                    {client.map((item) => {
                                        return <MenuItem value={item._id}>{item.name}</MenuItem>
                                    })}
                                </Select>
                            </div>
                        </div>
                        <div className='wrapperDiv px-2'>
                            <div className=' w-full text-start mb-1 font-semibold'>Employee</div>
                            <div>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    className='w-full text-start'
                                    onChange={(e) => setuserId(e.target.value)}

                                // value={age}
                                // label="Age"
                                // onChange={handleChange}
                                >
                                    {employee?.userData?.map((item) => {
                                        return <MenuItem value={item._id}>{item.name}</MenuItem>
                                    })}
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className='formSection  my-5'>
                        <div className='wrapperDiv px-2'>
                            <div className=' w-full text-start mb-1 font-semibold'>Date</div>
                            <div>
                                <TextField value={moment().format("YYYY-MM-DD")} disabled className='w-full' type='date' />
                            </div>
                        </div>
                        <div className='wrapperDiv px-2'>
                            <div className=' w-full text-start mb-1 font-semibold'>Attendance Status</div>
                            <div>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    className='w-full text-start'
                                    onChange={(e) => setstatus(e.target.value)}

                                // value={age}
                                // label="Age"
                                // onChange={handleChange}
                                >{attendenceStatusEnum.map((item) => {
                                    return <MenuItem value={item.value}>{item.label}</MenuItem>

                                })}
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className='formSection  my-3'>
                        <div className='wrapperDiv px-2'>
                            <div className=' w-full text-start mb-1 font-semibold'>Attendance Type</div>
                            <div>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    className='w-full text-start'
                                    onChange={(e) => setAttendanceType(e.target.value)}

                                // value={age}
                                // label="Age"
                                // onChange={handleChange}
                                >
                                    {/* {attendenceStatusEnum} */}
                                    {attendenceTypeEnum?.map((item) => {
                                        return <MenuItem value={item.value}>{item.label}</MenuItem>
                                    })}
                                </Select>
                            </div>
                        </div>
                        <div className='wrapperDiv px-2'>
                            <div className=' w-full text-start mb-1 font-semibold'>Shift</div>
                            <div>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    className='w-full text-start'
                                    // value={age}
                                    // label="Age"
                                    // onChange={handleChange}
                                    onChange={(e) => setshift(e.target.value)}

                                >{shiftEnum.map((item) => {
                                    return <MenuItem value={item.label}>{item.label}</MenuItem>
                                })}
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className='text-white bg-[#1875d2] my-3 w-full' >Submit Attendance</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
