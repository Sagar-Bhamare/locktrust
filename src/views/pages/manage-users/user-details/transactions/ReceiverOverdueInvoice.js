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
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Toast
import toast from 'react-hot-toast'

const getReceiverOverdueData = () => {
  return [
    { 
      id: 'INV-701', 
      from: 'Vendor A', 
      email: 'billing@vendora.com',
      item: 'Software License', 
      amount: 2500, 
      dueDate: '2024-02-28', 
      daysOverdue: 12,
      status: 'overdue',
      date: '2024-02-01',
      paid: false
    },
    { 
      id: 'INV-702', 
      from: 'Vendor B', 
      email: 'finance@vendorb.com',
      item: 'Equipment Purchase', 
      amount: 1800, 
      dueDate: '2024-03-02', 
      daysOverdue: 7,
      status: 'overdue',
      date: '2024-02-05',
      paid: false
    },
    { 
      id: 'INV-703', 
      from: 'Service Provider C', 
      email: 'accounts@servicec.com',
      item: 'Maintenance Service', 
      amount: 750, 
      dueDate: '2024-03-08', 
      daysOverdue: 1,
      status: 'overdue',
      date: '2024-02-10',
      paid: false
    }
  ]
}

const ReceiverOverdueInvoice = ({ user, fromDate, toDate, searchValue }) => {
  const [data, setData] = React.useState(getReceiverOverdueData())

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const handleView = (row) => {
    toast.success(`Viewing invoice: ${row.id}`)
  }

  const handlePayNow = (row) => {
    setData(prev => prev.map(item => 
      item.id === row.id ? { ...item, paid: true, status: 'paid' } : item
    ))
    toast.success(`Payment initiated for invoice ${row.id}`)
  }

 const handleDispute = (row) => {
  toast.success(`Dispute raised for invoice ${row.id}`)
}

  const filteredData = data.filter(item => {
    if (fromDate && item.date < fromDate) return false
    if (toDate && item.date > toDate) return false
    if (searchValue && !item.id.toLowerCase().includes(searchValue.toLowerCase()) && 
        !item.from.toLowerCase().includes(searchValue.toLowerCase())) return false
    return true
  })

  const totalDue = filteredData.reduce((sum, item) => sum + item.amount, 0)

  return (
    <Box>
      {/* Stats Card */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant='caption' color='text.secondary'>Total Due Amount</Typography>
          <Typography variant='h5' color='error.main'>{formatCurrency(totalDue)}</Typography>
        </Box>
        <Box>
          <Typography variant='caption' color='text.secondary'>Due Invoices</Typography>
          <Typography variant='h5' color='error.main'>{filteredData.length}</Typography>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: 'action.hover' }}>
            <TableRow>
              <TableCell>Invoice ID</TableCell>
              <TableCell>Vendor Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Item</TableCell>
              <TableCell align='right'>Amount</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Days Overdue</TableCell>
              <TableCell>Invoice Date</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id} sx={{ bgcolor: row.daysOverdue > 14 ? 'error.light' : 'inherit' }}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.from}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.item}</TableCell>
                <TableCell align='right' sx={{ fontWeight: 500 }}>{formatCurrency(row.amount)}</TableCell>
                <TableCell>{row.dueDate}</TableCell>
                <TableCell sx={{ color: 'error.main', fontWeight: 500 }}>
                  {row.daysOverdue} days
                </TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell align='center'>
                  <Chip label="Overdue" color="error" size='small' />
                </TableCell>
                <TableCell align='center'>
                  <Tooltip title="View Details">
                    <IconButton size='small' onClick={() => handleView(row)}>
                      <Icon icon='tabler:eye' fontSize={20} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Pay Now">
                    <IconButton size='small' onClick={() => handlePayNow(row)} color='success'>
                      <Icon icon='tabler:credit-card' fontSize={20} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Dispute">
                    <IconButton size='small' onClick={() => handleDispute(row)} color='warning'>
                      <Icon icon='tabler:alert-circle' fontSize={20} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default ReceiverOverdueInvoice