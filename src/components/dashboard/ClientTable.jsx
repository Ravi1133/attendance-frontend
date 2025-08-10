import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

export default function BasicClientTable({client}) {
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
              <TableCell align="right">{row.GST}</TableCell>

              <TableCell align="right"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}