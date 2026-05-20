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
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Toast
import toast from 'react-hot-toast'

const getSenderOverdueData = () => {
  return [
    { 
      id: 'INV-601', 
      to: 'ABC Corporation', 
      email: 'accounts@abccorp.com',
      item: 'Web Development Services', 
      amount: 5500, 
      dueDate: '2024-03-01', 
      daysOverdue: 8,
      status: 'overdue',
      date: '2024-02-15',
      reminderSent: false
    },
    { 
      id: 'INV-602', 
      to: 'XYZ Ltd', 
      email: 'finance@xyzltd.com',
      item: 'Consulting Services', 
      amount: 3200, 
      dueDate: '2024-03-05', 
      daysOverdue: 4,
      status: 'overdue',
      date: '2024-02-18',
      reminderSent: true
    }
  ]
}

const SenderOverdueInvoice = ({ user, fromDate, toDate, searchValue }) => {
  const [data, setData] = React.useState(getSenderOverdueData())

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

  const handleSendReminder = (row) => {
    setData(prev => prev.map(item => 
      item.id === row.id ? { ...item, reminderSent: true } : item
    ))
    toast.success(`Reminder sent to ${row.to} for invoice ${row.id}`)
  }

  const filteredData = data.filter(item => {
    if (fromDate && item.date < fromDate) return false
    if (toDate && item.date > toDate) return false
    if (searchValue && !item.id.toLowerCase().includes(searchValue.toLowerCase()) && 
        !item.to.toLowerCase().includes(searchValue.toLowerCase())) return false
    return true
  })

  const totalOverdue = filteredData.reduce((sum, item) => sum + item.amount, 0)

  return (
    <Box>
      {/* Stats Card */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant='caption' color='text.secondary'>Total Overdue Amount</Typography>
            <Typography variant='h5' color='error.main' sx={{ fontWeight: 600 }}>
              {formatCurrency(totalOverdue)}
            </Typography>
          </Box>
          <Box>
            <Typography variant='caption' color='text.secondary'>Overdue Invoices</Typography>
            <Typography variant='h5' color='error.main' sx={{ fontWeight: 600 }}>
              {filteredData.length}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Table sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, py: 2 }}>Invoice ID</TableCell>
              <TableCell sx={{ fontWeight: 600, py: 2 }}>Client Name</TableCell>
              <TableCell sx={{ fontWeight: 600, py: 2 }}>Item</TableCell>
              <TableCell sx={{ fontWeight: 600, py: 2 }} align='right'>Amount</TableCell>
              <TableCell sx={{ fontWeight: 600, py: 2 }}>Due Date</TableCell>
              <TableCell sx={{ fontWeight: 600, py: 2 }}>Days Overdue</TableCell>
              <TableCell sx={{ fontWeight: 600, py: 2 }} align='center'>Status</TableCell>
              <TableCell sx={{ fontWeight: 600, py: 2 }} align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.to}</TableCell>
                <TableCell>{row.item}</TableCell>
                <TableCell align='right' sx={{ fontWeight: 500 }}>{formatCurrency(row.amount)}</TableCell>
                <TableCell>{row.dueDate}</TableCell>
                <TableCell sx={{ color: 'error.main', fontWeight: 500 }}>{row.daysOverdue} days</TableCell>
                <TableCell align='center'>
                  <Chip label="Overdue" color="error" size='small' sx={{ borderRadius: 1 }} />
                </TableCell>
                <TableCell align='center'>
                  <Tooltip title="View Details">
                    <IconButton size='small' onClick={() => handleView(row)} sx={{ mr: 1 }}>
                      <Icon icon='tabler:eye' fontSize={20} />
                    </IconButton>
                  </Tooltip>
                  {!row.reminderSent && (
                    <Tooltip title="Send Reminder">
                      <IconButton size='small' onClick={() => handleSendReminder(row)}>
                        <Icon icon='tabler:bell' fontSize={20} />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default SenderOverdueInvoice