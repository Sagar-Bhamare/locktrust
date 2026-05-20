import React from 'react'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Toast
import toast from 'react-hot-toast'

const getCancelledInvoicesData = () => {
  return [
    { id: 'INV-401', to: 'Client M', item: 'Marketing Services', amount: 3000, cancelledDate: '2024-02-08', status: 'cancelled', date: '2024-02-01', reason: 'Client request' },
    { id: 'INV-402', to: 'Client N', item: 'Training Session', amount: 1200, cancelledDate: '2024-02-12', status: 'cancelled', date: '2024-02-05', reason: 'Duplicate' }
  ]
}

const CancelledInvoices = ({ user, fromDate, toDate, searchValue }) => {
  const [data, setData] = React.useState(getCancelledInvoicesData())

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const handleView = (row) => {
    toast.success(`Viewing cancelled invoice: ${row.id}`)
  }

  const filteredData = data.filter(item => {
    if (fromDate && item.date < fromDate) return false
    if (toDate && item.date > toDate) return false
    if (searchValue && !item.id.toLowerCase().includes(searchValue.toLowerCase()) && 
        !item.to.toLowerCase().includes(searchValue.toLowerCase())) return false
    return true
  })

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ bgcolor: 'action.hover' }}>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Item</TableCell>
            <TableCell align='right'>Amount</TableCell>
            <TableCell>Cancelled Date</TableCell>
            <TableCell>Invoice Date</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell align='center'>Status</TableCell>
            <TableCell align='center'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.to}</TableCell>
              <TableCell>{row.item}</TableCell>
              <TableCell align='right'>{formatCurrency(row.amount)}</TableCell>
              <TableCell>{row.cancelledDate}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.reason}</TableCell>
              <TableCell align='center'>
                <Chip label={row.status} color='error' size='small' />
              </TableCell>
              <TableCell align='center'>
                <Tooltip title="View Details">
                  <IconButton size='small' onClick={() => handleView(row)}>
                    <Icon icon='tabler:eye' fontSize={20} />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CancelledInvoices