import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function DenseTable({order}) {
    console.log(order)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Equipment</TableCell>
            <TableCell align="right">Extras</TableCell>
            <TableCell align="right">Attributes</TableCell>
            <TableCell align="right">Unit Price</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.equipments.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.equipment.name}
              </TableCell>
              <TableCell align="right">{row.extras.join(", ")}</TableCell>
              <TableCell align="right">{row.attributes.join(", ")}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.amount*row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}