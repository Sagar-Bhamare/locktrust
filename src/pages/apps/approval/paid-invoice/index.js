import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Export Utilities
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

// ** Toast
import toast from 'react-hot-toast'

const getPaidInvoiceData = () => {
  return [
    { 
      id: 1,
      date: '2024-02-01', 
      transactionId: 'INV-20240201-001', 
      coinxTransId: 'CNX-001234',
      invoiceId: 'INV-001',
      receiverWalletId: 'WLT-2001',
      senderBankAccount: '****1234 - HDFC Bank',
      account: 'Savings',
      amount: 5000,
      status: 'paid',
      paymentMethod: 'Bank Transfer',
      reference: 'REF001',
      description: 'Invoice payment for services'
    },
    { 
      id: 2,
      date: '2024-02-02', 
      transactionId: 'INV-20240202-002', 
      coinxTransId: 'CNX-001235',
      invoiceId: 'INV-002',
      receiverWalletId: 'WLT-2002',
      senderBankAccount: '****5678 - ICICI Bank',
      account: 'Current',
      amount: 10000,
      status: 'paid',
      paymentMethod: 'Credit Card',
      reference: 'REF002',
      description: 'Product purchase payment'
    },
    { 
      id: 3,
      date: '2024-02-03', 
      transactionId: 'INV-20240203-003', 
      coinxTransId: 'CNX-001236',
      invoiceId: 'INV-003',
      receiverWalletId: 'WLT-2003',
      senderBankAccount: '****9012 - SBI Bank',
      account: 'Business',
      amount: 2500,
      status: 'pending',
      paymentMethod: 'Debit Card',
      reference: 'REF003',
      description: 'Subscription payment'
    },
    { 
      id: 4,
      date: '2024-02-04', 
      transactionId: 'INV-20240204-004', 
      coinxTransId: 'CNX-001237',
      invoiceId: 'INV-004',
      receiverWalletId: 'WLT-2004',
      senderBankAccount: '****3456 - Axis Bank',
      account: 'Savings',
      amount: 7500,
      status: 'overdue',
      paymentMethod: 'Bank Transfer',
      reference: 'REF004',
      description: 'Consultation fee'
    },
    { 
      id: 5,
      date: '2024-02-05', 
      transactionId: 'INV-20240205-005', 
      coinxTransId: 'CNX-001238',
      invoiceId: 'INV-005',
      receiverWalletId: 'WLT-2005',
      senderBankAccount: '****7890 - Kotak Bank',
      account: 'Current',
      amount: 15000,
      status: 'paid',
      paymentMethod: 'UPI',
      reference: 'REF005',
      description: 'Project milestone payment'
    },
    { 
      id: 6,
      date: '2024-02-06', 
      transactionId: 'INV-20240206-006', 
      coinxTransId: 'CNX-001239',
      invoiceId: 'INV-006',
      receiverWalletId: 'WLT-2006',
      senderBankAccount: '****2345 - Yes Bank',
      account: 'Business',
      amount: 3000,
      status: 'pending',
      paymentMethod: 'Bank Transfer',
      reference: 'REF006',
      description: 'Maintenance charges'
    },
    { 
      id: 7,
      date: '2024-02-07', 
      transactionId: 'INV-20240207-007', 
      coinxTransId: 'CNX-001240',
      invoiceId: 'INV-007',
      receiverWalletId: 'WLT-2007',
      senderBankAccount: '****6789 - PNB Bank',
      account: 'Savings',
      amount: 20000,
      status: 'paid',
      paymentMethod: 'Credit Card',
      reference: 'REF007',
      description: 'Annual subscription'
    },
    { 
      id: 8,
      date: '2024-02-08', 
      transactionId: 'INV-20240208-008', 
      coinxTransId: 'CNX-001241',
      invoiceId: 'INV-008',
      receiverWalletId: 'WLT-2008',
      senderBankAccount: '****4321 - Canara Bank',
      account: 'Current',
      amount: 4500,
      status: 'overdue',
      paymentMethod: 'Debit Card',
      reference: 'REF008',
      description: 'Service fee payment'
    },
    { 
      id: 9,
      date: '2024-02-09', 
      transactionId: 'INV-20240209-009', 
      coinxTransId: 'CNX-001242',
      invoiceId: 'INV-009',
      receiverWalletId: 'WLT-2009',
      senderBankAccount: '****9876 - IndusInd Bank',
      account: 'Business',
      amount: 8000,
      status: 'pending',
      paymentMethod: 'UPI',
      reference: 'REF009',
      description: 'Software license fee'
    },
    { 
      id: 10,
      date: '2024-02-10', 
      transactionId: 'INV-20240210-010', 
      coinxTransId: 'CNX-001243',
      invoiceId: 'INV-010',
      receiverWalletId: 'WLT-2010',
      senderBankAccount: '****5432 - Federal Bank',
      account: 'Savings',
      amount: 12000,
      status: 'paid',
      paymentMethod: 'Bank Transfer',
      reference: 'REF010',
      description: 'Professional services'
    }
  ]
}

const PaidInvoice = () => {
  const [transactions, setTransactions] = useState(getPaidInvoiceData())
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [exportAnchorEl, setExportAnchorEl] = useState(null)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [pageSize, setPageSize] = useState(10)
  const [actionAnchorEl, setActionAnchorEl] = useState(null)
  const [selectedRow, setSelectedRow] = useState(null)

  const getStatusColor = (status) => {
    const statusColors = {
      paid: 'success',
      pending: 'warning',
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

  const clearFilters = () => {
    setFromDate('')
    setToDate('')
    setSearchValue('')
    setStatusFilter('')
  }

  const filteredTransactions = transactions.filter(transaction => {
    if (fromDate && transaction.date < fromDate) return false
    if (toDate && transaction.date > toDate) return false
    if (searchValue && 
        !transaction.transactionId.toLowerCase().includes(searchValue.toLowerCase()) && 
        !transaction.coinxTransId.toLowerCase().includes(searchValue.toLowerCase()) &&
        !transaction.invoiceId.toLowerCase().includes(searchValue.toLowerCase()) &&
        !transaction.receiverWalletId.toLowerCase().includes(searchValue.toLowerCase())) return false
    if (statusFilter && transaction.status !== statusFilter) return false
    return true
  })

  // Export Functions
  const handleExportClick = (event) => {
    setExportAnchorEl(event.currentTarget)
  }

  const handleExportClose = () => {
    setExportAnchorEl(null)
  }

  // CSV Export
  const csvData = filteredTransactions.map(transaction => ({
    'Date': transaction.date,
    'Transaction ID': transaction.transactionId,
    'CoinX Trans ID': transaction.coinxTransId,
    'Invoice ID': transaction.invoiceId,
    'Receiver Wallet ID': transaction.receiverWalletId,
    'Sender Bank Account': transaction.senderBankAccount,
    'Account': transaction.account,
    'Amount': transaction.amount,
    'Status': transaction.status,
    'Payment Method': transaction.paymentMethod,
    'Reference': transaction.reference,
    'Description': transaction.description
  }))

  // Excel Export
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(csvData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Paid Invoices')
    XLSX.writeFile(wb, `paid-invoices-${new Date().toISOString().split('T')[0]}.xlsx`)
    handleExportClose()
  }

  // PDF Export
  const exportToPDF = () => {
    const doc = new jsPDF()
    
    // Add title
    doc.setFontSize(18)
    doc.text('Paid Invoices Report', 14, 22)
    
    // Add generation date
    doc.setFontSize(10)
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30)
    
    // Prepare table data
    const tableColumn = ['Date', 'Transaction ID', 'CoinX Trans ID', 'Invoice ID', 'Receiver Wallet ID', 'Sender Bank Account', 'Account', 'Amount', 'Status']
    const tableRows = filteredTransactions.map(transaction => [
      transaction.date,
      transaction.transactionId,
      transaction.coinxTransId,
      transaction.invoiceId,
      transaction.receiverWalletId,
      transaction.senderBankAccount,
      transaction.account,
      `$${transaction.amount.toFixed(2)}`,
      transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)
    ])
    
    // Generate table
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      theme: 'striped',
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [66, 66, 66], textColor: 255, fontSize: 9, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { top: 40 }
    })
    
    // Save PDF
    doc.save(`paid-invoices-${new Date().toISOString().split('T')[0]}.pdf`)
    handleExportClose()
  }

  // Print Function
  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>Paid Invoices Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .header { margin-bottom: 20px; }
            .date { color: #666; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Paid Invoices Report</h1>
            <div class="date">Generated on: ${new Date().toLocaleString()}</div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Transaction ID</th>
                <th>CoinX Trans ID</th>
                <th>Invoice ID</th>
                <th>Receiver Wallet ID</th>
                <th>Sender Bank Account</th>
                <th>Account</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredTransactions.map(transaction => `
                <tr>
                  <td>${transaction.date}</td>
                  <td>${transaction.transactionId}</td>
                  <td>${transaction.coinxTransId}</td>
                  <td>${transaction.invoiceId}</td>
                  <td>${transaction.receiverWalletId}</td>
                  <td>${transaction.senderBankAccount}</td>
                  <td>${transaction.account}</td>
                  <td>$${transaction.amount.toFixed(2)}</td>
                  <td>${transaction.status}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
    handleExportClose()
  }

  const handleViewDetails = (row) => {
    setSelectedTransaction(row)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedTransaction(null)
  }

  // Action Menu Handlers
  const handleActionClick = (event, row) => {
    setActionAnchorEl(event.currentTarget)
    setSelectedRow(row)
  }

  const handleActionClose = () => {
    setActionAnchorEl(null)
  }

  const handleEdit = () => {
    if (selectedRow) {
      toast.success(`Editing invoice: ${selectedRow.invoiceId}`)
    }
    handleActionClose()
  }

  const handleDelete = () => {
    if (selectedRow) {
      setTransactions(transactions.filter(t => t.id !== selectedRow.id))
      toast.success(`Invoice ${selectedRow.invoiceId} deleted successfully`)
    }
    handleActionClose()
  }

  const handleToggleStatus = () => {
    if (selectedRow) {
      const newStatus = selectedRow.status === 'paid' ? 'pending' : 'paid'
      setTransactions(transactions.map(t => 
        t.id === selectedRow.id ? { ...t, status: newStatus } : t
      ))
      toast.success(`Invoice ${selectedRow.invoiceId} ${newStatus === 'paid' ? 'marked as paid' : 'marked as pending'} successfully`)
    }
    handleActionClose()
  }

  // DataGrid Columns
  const columns = [
    { 
      field: 'date', 
      headerName: 'Date', 
      flex: 0.1, 
      minWidth: 110, 
      renderCell: ({ row }) => <Typography variant="body2">{row.date}</Typography>,
      headerClassName: 'transaction-header'
    },
    { 
      field: 'transactionId', 
      headerName: 'Transaction ID', 
      flex: 0.13, 
      minWidth: 150, 
      renderCell: ({ row }) => (
        <Tooltip title={row.transactionId}>
          <Typography variant="body2" sx={{ fontWeight: 500, cursor: 'pointer' }}>
            {row.transactionId.slice(0, 12)}...
          </Typography>
        </Tooltip>
      ),
      headerClassName: 'transaction-header'
    },
    { 
      field: 'coinxTransId', 
      headerName: 'CoinX Trans ID', 
      flex: 0.11, 
      minWidth: 120, 
      renderCell: ({ row }) => (
        <Tooltip title={row.coinxTransId}>
          <Typography variant="body2" sx={{ cursor: 'pointer' }}>
            {row.coinxTransId.slice(0, 8)}...
          </Typography>
        </Tooltip>
      ),
      headerClassName: 'transaction-header'
    },
    { 
      field: 'invoiceId', 
      headerName: 'Invoice ID', 
      flex: 0.1, 
      minWidth: 100, 
      renderCell: ({ row }) => (
        <Tooltip title={row.invoiceId}>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {row.invoiceId}
          </Typography>
        </Tooltip>
      ),
      headerClassName: 'transaction-header'
    },
    { 
      field: 'receiverWalletId', 
      headerName: 'Receiver Wallet ID', 
      flex: 0.12, 
      minWidth: 130, 
      renderCell: ({ row }) => (
        <Tooltip title={row.receiverWalletId}>
          <Typography variant="body2" sx={{ cursor: 'pointer' }}>
            {row.receiverWalletId.slice(0, 8)}...
          </Typography>
        </Tooltip>
      ),
      headerClassName: 'transaction-header'
    },
    { 
      field: 'senderBankAccount', 
      headerName: 'Sender Bank Account', 
      flex: 0.15, 
      minWidth: 170, 
      renderCell: ({ row }) => (
        <Tooltip title={row.senderBankAccount}>
          <Typography variant="body2">{row.senderBankAccount}</Typography>
        </Tooltip>
      ),
      headerClassName: 'transaction-header'
    },
    { 
      field: 'account', 
      headerName: 'Account', 
      flex: 0.09, 
      minWidth: 100, 
      renderCell: ({ row }) => (
        <Chip label={row.account} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
      ),
      headerClassName: 'transaction-header'
    },
    { 
      field: 'amount', 
      headerName: 'Amount', 
      flex: 0.1, 
      minWidth: 110, 
      renderCell: ({ row }) => (
        <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600 }}>
          {formatCurrency(row.amount)}
        </Typography>
      ),
      headerClassName: 'transaction-header'
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      flex: 0.1, 
      minWidth: 100, 
      renderCell: ({ row }) => (
        <Chip 
          label={row.status.charAt(0).toUpperCase() + row.status.slice(1)} 
          color={getStatusColor(row.status)} 
          size="small"
          sx={{ minWidth: 80 }}
        />
      ),
      headerClassName: 'transaction-header'
    },
    { 
      field: 'actions', 
      headerName: 'Actions', 
      flex: 0.1, 
      minWidth: 120, 
      sortable: false, 
      renderCell: ({ row }) => (
        <Box>
          <Tooltip title="View Details">
            <IconButton size="small" onClick={() => handleViewDetails(row)} sx={{ mr: 1 }}>
              <Icon icon="tabler:eye" fontSize={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title="More Actions">
            <IconButton size="small" onClick={e => handleActionClick(e, row)}>
              <Icon icon="tabler:dots-vertical" fontSize={20} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
      headerClassName: 'transaction-header'
    }
  ]

  return (
    <Box sx={{ pt: 2 }}>
      {/* Page Title */}
      <Typography variant='h4' sx={{ mb: 4, fontWeight: 600 }}>
        Paid Invoices
      </Typography>

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
              placeholder='Search by Transaction ID, CoinX ID, Invoice ID or Wallet ID'
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
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth size='small'>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label='Status'
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value=''>All</MenuItem>
                <MenuItem value='paid'>Paid</MenuItem>
                <MenuItem value='pending'>Pending</MenuItem>
                <MenuItem value='overdue'>Overdue</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                fullWidth
                variant='outlined'
                color='secondary'
                onClick={clearFilters}
                startIcon={<Icon icon='tabler:refresh' />}
              >
                Reset
              </Button>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                onClick={handleExportClick}
                startIcon={<Icon icon='tabler:download' />}
              >
                Export
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>

      {/* Export Menu */}
      <Menu
        anchorEl={exportAnchorEl}
        open={Boolean(exportAnchorEl)}
        onClose={handleExportClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => {
          const csvLink = document.createElement('a')
          const csvContent = XLSX.utils.sheet_to_csv(XLSX.utils.json_to_sheet(csvData))
          const blob = new Blob([csvContent], { type: 'text/csv' })
          csvLink.href = URL.createObjectURL(blob)
          csvLink.download = `paid-invoices-${new Date().toISOString().split('T')[0]}.csv`
          csvLink.click()
          URL.revokeObjectURL(csvLink.href)
          handleExportClose()
        }}>
          <Icon icon='tabler:file-spreadsheet' fontSize={20} style={{ marginRight: 8 }} />
          Export as CSV
        </MenuItem>
        <MenuItem onClick={exportToExcel}>
          <Icon icon='tabler:file-excel' fontSize={20} style={{ marginRight: 8 }} />
          Export as Excel
        </MenuItem>
        <MenuItem onClick={exportToPDF}>
          <Icon icon='tabler:file-pdf' fontSize={20} style={{ marginRight: 8 }} />
          Export as PDF
        </MenuItem>
        <MenuItem onClick={handlePrint}>
          <Icon icon='tabler:printer' fontSize={20} style={{ marginRight: 8 }} />
          Print
        </MenuItem>
      </Menu>

      {/* DataGrid Table */}
      <Card>
        <Box sx={{ height: 'calc(100vh - 300px)', width: '100%' }}>
          <DataGrid
            rows={filteredTransactions}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[10, 25, 50, 100]}
            autoHeight
            disableSelectionOnClick
            sortingOrder={['asc', 'desc']}
            sx={{
              '& .transaction-header': theme => ({
                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.action.hover,
                fontWeight: 600
              }),
              '& .MuiDataGrid-cell': { py: 2 }
            }}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          />
        </Box>
      </Card>

      {/* Action Menu */}
      <Menu
        anchorEl={actionAnchorEl}
        open={Boolean(actionAnchorEl)}
        onClose={handleActionClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem onClick={handleEdit} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon="tabler:edit" fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleToggleStatus} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon={selectedRow?.status === 'paid' ? 'tabler:x-circle' : 'tabler:check-circle'} fontSize={20} />
          {selectedRow?.status === 'paid' ? 'Mark as Pending' : 'Mark as Paid'}
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon="tabler:trash" fontSize={20} />
          Delete
        </MenuItem>
      </Menu>

      {/* View Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='sm' fullWidth>
        <DialogTitle>
          Invoice Details
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Icon icon='tabler:x' />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedTransaction && (
            <Box sx={{ py: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' color='text.secondary'>Date</Typography>
                  <Typography variant='body1' sx={{ mb: 2 }}>{selectedTransaction.date}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' color='text.secondary'>Transaction ID</Typography>
                  <Typography variant='body1' sx={{ mb: 2 }}>{selectedTransaction.transactionId}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' color='text.secondary'>CoinX Trans ID</Typography>
                  <Typography variant='body1' sx={{ mb: 2 }}>{selectedTransaction.coinxTransId}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' color='text.secondary'>Invoice ID</Typography>
                  <Typography variant='body1' sx={{ mb: 2 }}>{selectedTransaction.invoiceId}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' color='text.secondary'>Receiver Wallet ID</Typography>
                  <Typography variant='body1' sx={{ mb: 2 }}>{selectedTransaction.receiverWalletId}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' color='text.secondary'>Sender Bank Account</Typography>
                  <Typography variant='body1' sx={{ mb: 2 }}>{selectedTransaction.senderBankAccount}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' color='text.secondary'>Account Type</Typography>
                  <Typography variant='body1' sx={{ mb: 2 }}>{selectedTransaction.account}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' color='text.secondary'>Amount</Typography>
                  <Typography variant='body1' sx={{ mb: 2, color: 'success.main', fontWeight: 600 }}>
                    {formatCurrency(selectedTransaction.amount)}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' color='text.secondary'>Status</Typography>
                  <Chip 
                    label={selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)} 
                    color={getStatusColor(selectedTransaction.status)} 
                    size='small'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' color='text.secondary'>Payment Method</Typography>
                  <Typography variant='body1' sx={{ mb: 2 }}>{selectedTransaction.paymentMethod}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' color='text.secondary'>Reference Number</Typography>
                  <Typography variant='body1' sx={{ mb: 2 }}>{selectedTransaction.reference}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' color='text.secondary'>Description</Typography>
                  <Typography variant='body1' sx={{ mb: 2 }}>{selectedTransaction.description}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default PaidInvoice