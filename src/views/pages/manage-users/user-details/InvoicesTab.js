import React, { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const getInvoiceData = (userId) => {
  return [
    { id: 'INV-001', to: 'Client A', item: 'Consulting Services', amount: 5000, dueDate: '2024-02-15', status: 'paid' },
    { id: 'INV-002', to: 'Client B', item: 'Web Development', amount: 3500, dueDate: '2024-02-20', status: 'pending' },
    { id: 'INV-003', to: 'Client C', item: 'Maintenance', amount: 1200, dueDate: '2024-02-25', status: 'sent' },
    { id: 'INV-004', to: 'Client D', item: 'Design Services', amount: 2800, dueDate: '2024-03-01', status: 'overdue' },
    { id: 'INV-005', to: 'Client E', item: 'Hosting Services', amount: 500, dueDate: '2024-03-05', status: 'paid' }
  ]
}

const InvoicesTab = ({ user }) => {
  const [invoices, setInvoices] = useState(getInvoiceData(user.id))
  const [searchValue, setSearchValue] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  const getStatusColor = (status) => {
    const statusColors = {
      paid: 'success',
      pending: 'warning',
      sent: 'info',
      overdue: 'error'
    }
    return statusColors[status] || 'default'
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const filteredInvoices = invoices.filter(invoice => {
    if (searchValue && !invoice.id.toLowerCase().includes(searchValue.toLowerCase()) && 
        !invoice.to.toLowerCase().includes(searchValue.toLowerCase())) return false
    if (selectedStatus && invoice.status !== selectedStatus) return false
    return true
  })

  const stats = {
    sent: invoices.filter(i => i.status === 'sent').length,
    pending: invoices.filter(i => i.status === 'pending').length,
    paid: invoices.filter(i => i.status === 'paid').length,
    overdue: invoices.filter(i => i.status === 'overdue').length,
    total: invoices.reduce((sum, i) => sum + i.amount, 0)
  }

  return (
    <Box>
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant='caption' color='text.secondary'>Invoices Sent</Typography>
            <Typography variant='h5' color='info.main'>{stats.sent}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant='caption' color='text.secondary'>Invoices Received</Typography>
            <Typography variant='h5'>{invoices.length}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant='caption' color='text.secondary'>Pending Invoices</Typography>
            <Typography variant='h5' color='warning.main'>{stats.pending}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant='caption' color='text.secondary'>Paid Invoices</Typography>
            <Typography variant='h5' color='success.main'>{stats.paid}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant='caption' color='text.secondary'>Total Amount</Typography>
            <Typography variant='h5'>{formatCurrency(stats.total)}</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Filter Section */}
      <Card sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} alignItems='center'>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size='small'
              placeholder='Search by Invoice ID or Client'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon='tabler:search' fontSize={20} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              fullWidth
              variant={selectedStatus === 'paid' ? 'contained' : 'outlined'}
              color='success'
              onClick={() => setSelectedStatus(selectedStatus === 'paid' ? '' : 'paid')}
            >
              Paid
            </Button>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              fullWidth
              variant={selectedStatus === 'pending' ? 'contained' : 'outlined'}
              color='warning'
              onClick={() => setSelectedStatus(selectedStatus === 'pending' ? '' : 'pending')}
            >
              Pending
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Invoices Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: 'action.hover' }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Item</TableCell>
              <TableCell align='right'>Total Amount</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell align='center'>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.to}</TableCell>
                <TableCell>{invoice.item}</TableCell>
                <TableCell align='right' sx={{ fontWeight: 500 }}>
                  {formatCurrency(invoice.amount)}
                </TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell align='center'>
                  <Chip label={invoice.status} color={getStatusColor(invoice.status)} size='small' />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default InvoicesTab