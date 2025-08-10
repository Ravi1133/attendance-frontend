import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./style.css"
import Chip from '@mui/material/Chip';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import IconButton from '@mui/material/IconButton';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import moment from 'moment';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const styleChipRed = {
    width: "fit-content",
    padding: "2px 4px",
    backgroundColor: "#EE204D",
    color: "white"
}

const styleChipGreen = {
    width: "fit-content",
    padding: "2px 4px",
    backgroundColor: "#90EE90",
    borderRadius: "25%",
    color: "white"
}


export default function AttandanceTable({ attendanceData, employee, client, getAllAttendance }) {
    const [tab, settab] = React.useState("Today")
    const [page, setPage] = React.useState(1)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [selectedClient, setselectedClient] = React.useState("")
    const [selectedEmployee, setselectedEmployee] = React.useState("")
    const [selectedDate,setselectedDate]=React.useState("")
    const tabs = ["Today", "All"]

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    function TablePaginationActions(props) {
        const theme = useTheme();
        const { count, page, rowsPerPage, onPageChange } = props;

        const handleFirstPageButtonClick = (event) => {
            onPageChange(event, 0);
        };

        const handleBackButtonClick = (event) => {
            onPageChange(event, page - 1);
        };

        const handleNextButtonClick = (event) => {
            onPageChange(event, page + 1);
        };

        const handleLastPageButtonClick = (event) => {
            onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        };

        return (
            <Box sx={{ flexShrink: 0, ml: 2.5 }}>
                <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton
                    onClick={handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="previous page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </Box>
        );
    }
    React.useEffect(() => {
        getAllAttendance(selectedClient, selectedEmployee,selectedDate)
    }, [selectedClient, selectedEmployee,selectedDate])
    console.log(selectedClient, "selectedClient")
    console.log("selectedData",selectedDate)

    return (
        <div>
            <div>
                <p className='text-[30px] font-semibold text-start'>Attendance Records</p>
                <div className='flex justify-between'>
                    <div className='mt-2 cursor-pointer bg-gray-200 flex p-1 w-fit flex items-center rounded-lg'>
                        {tabs.map((item) => {
                            return <div className={` p-1 px-4 text-lg rounded-md ${tab == item ? "bg-white" : ""}`} onClick={() => settab(item)}><CalendarMonthIcon className='mr-2 ' />{item}</div>
                        })}
                    </div>
                    <div>
                        <TextField className='selectBox' type='date' onChange={(e)=>setselectedDate(e.target.value)} inputProps={{
                            max: moment().format("YYYY-MM-DD") // Disables dates after today
                        }} />
                        {/* <InputLabel id="employee">Employee</InputLabel> */}
                        <Select
                            labelId="employee"
                            id="demo-simple-select"
                            className=' p-0 text-start w-[100px] selectBox ms-3'
                            onChange={(e) => setselectedEmployee(e.target.value)}
                        >
                            {employee.map((item) => {
                                return <MenuItem value={item._id}>{item.name}</MenuItem>
                            })}
                            {/* <InputLabel id="client">Client</InputLabel> */}

                        </Select>
                        <Select
                            labelId="client"
                            id="demo-simple-select"
                            className=' p-0 text-start w-[100px] selectBox ms-3'

                            onChange={(e) => setselectedClient(e.target.value)}
                        >
                            {/* <MenuItem value={""}>client</MenuItem> */}
                            {client.map((item) => {
                                return <MenuItem value={item._id}>{item.name}</MenuItem>
                            })}
                        </Select>
                    </div>
                </div>
            </div>

            <TableContainer component={Paper} className='mt-5'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: "18px", fontWeight: "600" }}>Employee Name</TableCell>
                            <TableCell align="right" className='tableHeader text-lg' sx={{ fontSize: "18px", fontWeight: "600" }} >Client Name</TableCell>
                            <TableCell align="right" sx={{ fontSize: "18px", fontWeight: "600" }}>Status</TableCell>
                            <TableCell align="right" sx={{ fontSize: "18px", fontWeight: "600" }}>Shift</TableCell>
                            <TableCell align="right" sx={{ fontSize: "18px", fontWeight: "600" }}>Attendance Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attendanceData?.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.userId.name}
                                </TableCell>
                                <TableCell align="right">{row.clientId.name}</TableCell>
                                <TableCell align="right" > <div ><Chip color={row.status == "present" ? "success" : "error"} label={row.status} /></div></TableCell>
                                <TableCell align="right">{row.shift}</TableCell>
                                <TableCell align="right">{row.AttendanceType}</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter className=''>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                slotProps={{
                                    select: {
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    },
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    );
}