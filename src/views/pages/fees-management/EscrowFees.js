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
import Chip from '@mui/material/Chip'

const EscrowFees = ({ data, onUpdate }) => {
  const formatRange = (min, max) => {
    if (max === null) return `$${min.toLocaleString()}+`
    return `$${min.toLocaleString()} – $${max.toLocaleString()}`
  }

  return (
    <Card>
      <CardHeader title='Escrow Fees' subheader='Tier-based fee structure for escrow transactions' />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{ '& .MuiTableCell-root': { fontWeight: 600, backgroundColor: theme => theme.palette.action.hover } }}
            >
              <TableCell>Transaction Amount (USD)</TableCell>
              <TableCell align='center'>Standard Fee (%)</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((tier, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant='body2' sx={{ fontWeight: 500 }}>
                    {formatRange(tier.min, tier.max)}
                  </Typography>
                </TableCell>
                <TableCell align='center'>
                  <TextField
                    size='small'
                    type='number'
                    value={tier.fee}
                    onChange={e => onUpdate(index, 'fee', e.target.value)}
                    InputProps={{
                      endAdornment: <InputAdornment position='end'>%</InputAdornment>
                    }}
                    sx={{ width: 100 }}
                  />
                </TableCell>
                <TableCell>{tier.note && <Chip label={tier.note} size='small' variant='outlined' />}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default EscrowFees
