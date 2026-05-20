import React from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputAdornment from '@mui/material/InputAdornment'

const IncomingFees = ({ data, onUpdate }) => {
  const feeItems = [
    { key: 'ach', label: 'ACH' },
    { key: 'wire', label: 'Wire' },
    { key: 'rtpFednow', label: 'RTP & FedNow' },
    { key: 'zelle', label: 'Zelle' },
    { key: 'cards', label: 'Cards' },
    { key: 'wallet', label: 'Wallet' },
    { key: 'invoice', label: 'Invoice' },
    { key: 'escrow', label: 'Escrow' },
    { key: 'billPayment', label: 'Bill Payment' },
    { key: 'voucher', label: 'Voucher' },
    { key: 'check21', label: 'Check21' },
    { key: 'sepaPayment', label: 'Sepa Payment' }
  ]

  return (
    <Card>
      <CardHeader title='Incoming Fees' subheader='Fees applied to incoming transactions' />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{ '& .MuiTableCell-root': { fontWeight: 600, backgroundColor: theme => theme.palette.action.hover } }}
            >
              <TableCell>Payment Method</TableCell>
              <TableCell align='center'>Percentage Fee (%)</TableCell>
              <TableCell align='center'>Fixed Fee (USD)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feeItems.map(item => (
              <TableRow key={item.key}>
                <TableCell component='th' scope='row'>
                  <Typography variant='body2' sx={{ fontWeight: 500 }}>
                    {item.label}
                  </Typography>
                </TableCell>
                <TableCell align='center'>
                  <TextField
                    size='small'
                    type='number'
                    value={data[item.key]?.percentage || 0}
                    onChange={e => onUpdate(item.key, 'percentage', e.target.value)}
                    InputProps={{
                      endAdornment: <InputAdornment position='end'>%</InputAdornment>
                    }}
                    sx={{ width: 100 }}
                  />
                </TableCell>
                <TableCell align='center'>
                  <TextField
                    size='small'
                    type='number'
                    value={data[item.key]?.fixed || 0}
                    onChange={e => onUpdate(item.key, 'fixed', e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position='start'>$</InputAdornment>
                    }}
                    sx={{ width: 100 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default IncomingFees
