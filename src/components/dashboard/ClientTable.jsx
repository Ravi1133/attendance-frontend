import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaRegTrashAlt } from "react-icons/fa";
import Button from '@mui/material/Button';
import { updateClientStatus } from '../../service/apicall';
import { toast } from 'react-toastify';
import MenuForClient from '../common/MenuForClient';


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


export default function BasicClientTable({ client,funcCallAfterUpdate,editClient ,seteditClient}) {

const changeStatus = async (curstatus,id) => {
  debugger
  let statusPayload={
    status:curstatus=="ACTIVE"?"INACTIVE":"ACTIVE"
  }
  let update = await updateClientStatus(statusPayload,id)
    console.log("update",update)
    if(update.status==200){
      toast.success("Updated Sucessfull")
      funcCallAfterUpdate()
    }
}
  return (
    <div>
      <p className='text-[30px] font-semibold text-start'>Client Records</p>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "18px", fontWeight: "600" }}>Name</TableCell>
              <TableCell align="right" sx={{ fontSize: "18px", fontWeight: "600" }}>Mobile</TableCell>
              <TableCell align="right" sx={{ fontSize: "18px", fontWeight: "600" }}>Email</TableCell>
              <TableCell align="right" sx={{ fontSize: "18px", fontWeight: "600" }}>Address</TableCell>
              <TableCell align="right" sx={{ fontSize: "18px", fontWeight: "600" }}>GST</TableCell>
              <TableCell align="right" sx={{ fontSize: "18px", fontWeight: "600" }}>Action</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {client.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.mobile}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.address}</TableCell>
                <TableCell align="right">{row.GST || "na"}</TableCell>
                <TableCell align="right" className=''><MenuForClient changeStatus={changeStatus} data={row} editClient={editClient} seteditClient={seteditClient}  /></TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}