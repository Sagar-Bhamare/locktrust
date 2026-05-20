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
import MenuItem from '@mui/material/MenuItem'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const getEscrowTransactionData = () => {
  return [
    { 
      id: 'ESC-001', 
      date: '2024-02-01', 
      transactionId: 'TRX789001', 
      description: 'Project Milestone 1 Release', 
      status: 'released', 
      amount: 10000, 
      escrowBalance: 50000,
      buyer: 'John Smith',
      seller: 'Jane Doe',
      releaseDate: '2024-02-01'
    },
    { 
      id: 'ESC-002', 
      date: '2024-02-05', 
      transactionId: 'TRX789002', 
      description: 'Security Deposit', 
      status: 'pending', 
      amount: 5000, 
      escrowBalance: 55000,
      buyer: 'Mike Johnson',
      seller: 'Sarah Wilson',
      releaseDate: '-'
    },
    { 
      id: 'ESC-003', 
      date: '2024-02-10', 
      transactionId: 'TRX789003', 
      description: 'Final Payment Release', 
      status: 'completed', 
      amount: 25000, 
      escrowBalance: 30000,
      buyer: 'Robert Brown',
      seller: 'Emily Davis',
      releaseDate: '2024-02-10'
    },
    { 
      id: 'ESC-004', 
      date: '2024-02-12', 
      transactionId: 'TRX789004', 
      description: 'Dispute Resolution', 
      status: 'disputed', 
      amount: 15000, 
      escrowBalance: 15000,
      buyer: 'William Taylor',
      seller: 'Lisa Anderson',
      releaseDate: '-'
    },
    { 
      id: 'ESC-005', 
      date: '2024-02-15', 
      transactionId: 'TRX789005', 
      description: 'Milestone 2 Release', 
      status: 'released', 
      amount: 8000, 
      escrowBalance: 22000,
      buyer: 'James Wilson',
      seller: 'Patricia Martinez',
      releaseDate: '2024-02-15'
    },
    { 
      id: 'ESC-006', 
      date: '2024-02-18', 
      transactionId: 'TRX789006', 
      description: 'New Contract Escrow', 
      status: 'pending', 
      amount: 12000, 
      escrowBalance: 34000,
      buyer: 'David Lee',
      seller: 'Jennifer Garcia',
      releaseDate: '-'
    },
    { 
      id: 'ESC-007', 
      date: '2024-02-20', 
      transactionId: 'TRX789007', 
      description: 'Refund to Buyer', 
      status: 'refunded', 
      amount: 7000, 
      escrowBalance: 27000,
      buyer: 'Richard Martinez',
      seller: 'Linda Rodriguez',
      releaseDate: '2024-02-20'
    },
    { 
      id: 'ESC-008', 
      date: '2024-02-22', 
      transactionId: 'TRX789008', 
      description: 'Partial Release', 
      status: 'completed', 
      amount: 5000, 
      escrowBalance: 22000,
      buyer: 'Thomas White',
      seller: 'Susan Thomas',
      releaseDate: '2024-02-22'
    }
  ]
}

const EscrowTransaction = () => {
  const [transactions, setTransactions] = useState(getEscrowTransactionData())
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const getStatusColor = (status) => {
    const statusColors = {
      released: 'success',
      completed: 'success',
      pending: 'warning',
      disputed: 'error',
      refunded: 'info'
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
        !transaction.description.toLowerCase().includes(searchValue.toLowerCase()) &&
        !transaction.buyer.toLowerCase().includes(searchValue.toLowerCase()) &&
        !transaction.seller.toLowerCase().includes(searchValue.toLowerCase())) return false
    if (statusFilter && transaction.status !== statusFilter) return false
    return true
  })

  // Stats
  const stats = {
    total: filteredTransactions.length,
    totalAmount: filteredTransactions.reduce((sum, t) => sum + t.amount, 0),
    totalEscrowBalance: filteredTransactions.length > 0 ? filteredTransactions[filteredTransactions.length - 1].escrowBalance : 0,
    released: filteredTransactions.filter(t => t.status === 'released').length,
    pending: filteredTransactions.filter(t => t.status === 'pending').length,
    disputed: filteredTransactions.filter(t => t.status === 'disputed').length
  }

  return (
    <Box sx={{ pt: 2 }}>
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant='caption' color='text.secondary' sx={{ mb: 1, display: 'block' }}>
              Total Transactions
            </Typography>
            <Typography variant='h5' sx={{ fontWeight: 600 }}>
              {stats.total}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant='caption' color='text.secondary' sx={{ mb: 1, display: 'block' }}>
              Total Amount
            </Typography>
            <Typography variant='h5' color='primary.main' sx={{ fontWeight: 600 }}>
              {formatCurrency(stats.totalAmount)}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant='caption' color='text.secondary' sx={{ mb: 1, display: 'block' }}>
              Current Escrow Balance
            </Typography>
            <Typography variant='h5' color='success.main' sx={{ fontWeight: 600 }}>
              {formatCurrency(stats.totalEscrowBalance)}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant='caption' color='text.secondary' sx={{ mb: 1, display: 'block' }}>
              Released
            </Typography>
            <Typography variant='h5' color='success.main' sx={{ fontWeight: 600 }}>
              {stats.released}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant='caption' color='text.secondary' sx={{ mb: 1, display: 'block' }}>
              Pending
            </Typography>
            <Typography variant='h5' color='warning.main' sx={{ fontWeight: 600 }}>
              {stats.pending}
            </Typography>
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
              placeholder='Search by ID, Description, Buyer or Seller'
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
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      maxHeight: 200
                    }
                  }
                }
              }}
            >
              <MenuItem value=''>All</MenuItem>
              <MenuItem value='released'>Released</MenuItem>
              <MenuItem value='completed'>Completed</MenuItem>
              <MenuItem value='pending'>Pending</MenuItem>
              <MenuItem value='disputed'>Disputed</MenuItem>
              <MenuItem value='refunded'>Refunded</MenuItem>
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

      {/* Escrow Transactions Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: 'action.hover' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Transaction ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Buyer</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Seller</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align='center'>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align='right'>Amount</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align='right'>Escrow Balance</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align='center'>Release Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id} hover>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.transactionId}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.buyer}</TableCell>
                  <TableCell>{transaction.seller}</TableCell>
                  <TableCell align='center'>
                    <Chip 
                      label={transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)} 
                      color={getStatusColor(transaction.status)} 
                      size='small'
                      sx={{ minWidth: 80 }}
                    />
                  </TableCell>
                  <TableCell align='right' sx={{ fontWeight: 500 }}>
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                  <TableCell align='right' sx={{ fontWeight: 500, color: 'primary.main' }}>
                    {formatCurrency(transaction.escrowBalance)}
                  </TableCell>
                  <TableCell align='center'>
                    {transaction.releaseDate !== '-' ? transaction.releaseDate : '-'}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align='center' sx={{ py: 5 }}>
                  <Typography variant='body1' color='text.secondary'>
                    No transactions found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default EscrowTransaction