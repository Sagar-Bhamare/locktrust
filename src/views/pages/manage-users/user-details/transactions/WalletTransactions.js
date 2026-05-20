import React, { useState } from 'react'
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

const getWalletTransactionData = () => {
  return [
    { id: 'WTX-001', date: '2024-02-01', transactionId: 'TRX123456', description: 'Payment received', status: 'completed', credit: 5000, debit: 0, balance: 5000 },
    { id: 'WTX-002', date: '2024-02-05', transactionId: 'TRX123457', description: 'Purchase at Store', status: 'completed', credit: 0, debit: 250, balance: 4750 },
    { id: 'WTX-003', date: '2024-02-10', transactionId: 'TRX123458', description: 'Transfer to Bank', status: 'pending', credit: 0, debit: 1000, balance: 3750 },
    { id: 'WTX-004', date: '2024-02-15', transactionId: 'TRX123459', description: 'Refund received', status: 'completed', credit: 150, debit: 0, balance: 3900 },
    { id: 'WTX-005', date: '2024-02-20', transactionId: 'TRX123460', description: 'Monthly Subscription', status: 'failed', credit: 0, debit: 50, balance: 3850 }
  ]
}

const WalletTransactions = ({ user }) => {
  const [transactions, setTransactions] = useState(getWalletTransactionData())
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const getStatusColor = (status) => {
    const statusColors = {
      completed: 'success',
      pending: 'warning',
      failed: 'error'
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

  const clearFilters = () => {
    setFromDate('')
    setToDate('')
    setSearchValue('')
    setStatusFilter('')
  }

  const filteredTransactions = transactions.filter(transaction => {
    if (fromDate && transaction.date < fromDate) return false
    if (toDate && transaction.date > toDate) return false
    if (searchValue && !transaction.transactionId.toLowerCase().includes(searchValue.toLowerCase()) && 
        !transaction.description.toLowerCase().includes(searchValue.toLowerCase())) return false
    if (statusFilter && transaction.status !== statusFilter) return false
    return true
  })

  // Stats
  const stats = {
    total: filteredTransactions.length,
    totalCredit: filteredTransactions.reduce((sum, t) => sum + t.credit, 0),
    totalDebit: filteredTransactions.reduce((sum, t) => sum + t.debit, 0),
    completed: filteredTransactions.filter(t => t.status === 'completed').length,
    pending: filteredTransactions.filter(t => t.status === 'pending').length
  }

  return (
    <Box>
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant='caption' color='text.secondary'>Total Transactions</Typography>
            <Typography variant='h5'>{stats.total}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant='caption' color='text.secondary'>Total Credit</Typography>
            <Typography variant='h5' color='success.main'>{formatCurrency(stats.totalCredit)}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant='caption' color='text.secondary'>Total Debit</Typography>
            <Typography variant='h5' color='error.main'>{formatCurrency(stats.totalDebit)}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant='caption' color='text.secondary'>Completed</Typography>
            <Typography variant='h5' color='success.main'>{stats.completed}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant='caption' color='text.secondary'>Pending</Typography>
            <Typography variant='h5' color='warning.main'>{stats.pending}</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Filter Section */}
      <Card sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} alignItems='center'>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              type='date'
              label='From'
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              size='small'
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              type='date'
              label='To'
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              size='small'
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              size='small'
              placeholder='Search by ID or Description'
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
            <TextField
              fullWidth
              size='small'
              select
              label='Status'
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              SelectProps={{ native: true }}
            >
              <option value=''>All</option>
              <option value='completed'>Completed</option>
              <option value='pending'>Pending</option>
              <option value='failed'>Failed</option>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              fullWidth
              variant='outlined'
              color='secondary'
              onClick={clearFilters}
              startIcon={<Icon icon='tabler:refresh' />}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Wallet Transactions Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: 'action.hover' }}>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align='right'>Credit</TableCell>
              <TableCell align='right'>Debit</TableCell>
              <TableCell align='right'>Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.transactionId}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell align='center'>
                  <Chip label={transaction.status} color={getStatusColor(transaction.status)} size='small' />
                </TableCell>
                <TableCell align='right' sx={{ color: 'success.main' }}>
                  {transaction.credit > 0 ? formatCurrency(transaction.credit) : '-'}
                </TableCell>
                <TableCell align='right' sx={{ color: 'error.main' }}>
                  {transaction.debit > 0 ? formatCurrency(transaction.debit) : '-'}
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 500 }}>
                  {formatCurrency(transaction.balance)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default WalletTransactions