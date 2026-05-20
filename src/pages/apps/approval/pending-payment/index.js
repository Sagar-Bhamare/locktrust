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
import Avatar from '@mui/material/Avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Export Utilities
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

// ** Toast
import toast from 'react-hot-toast'

const getPendingPaymentData = () => {
  return [
    { 
      id: 1,
      date: '2024-02-01', 
      transactionId: 'PAY-20240201-001',
      senderName: 'John Smith',
      sentFrom: 'WLT-1001',
      receiverBankAccount: '****1234 - HDFC Bank',
      receiverUser: 'Jane Doe',
      amount: 5000,
      status: 'pending',
      paymentMethod: 'Bank Transfer',
      reference: 'REF001',
      dueDate: '2024-02-15',
      description: 'Invoice payment for services'
    },
    { 
      id: 2,
      date: '2024-02-02', 
      transactionId: 'PAY-20240202-002',
      senderName: 'Mike Johnson',
      sentFrom: 'WLT-1002',
      receiverBankAccount: '****5678 - ICICI Bank',
      receiverUser: 'Sarah Wilson',
      amount: 10000,
      status: 'pending',
      paymentMethod: 'Credit Card',
      reference: 'REF002',
      dueDate: '2024-02-16',
      description: 'Product purchase payment'
    },
    { 
      id: 3,
      date: '2024-02-03', 
      transactionId: 'PAY-20240203-003',
      senderName: 'Robert Brown',
      sentFrom: 'WLT-1003',
      receiverBankAccount: '****9012 - SBI Bank',
      receiverUser: 'Emily Davis',
      amount: 2500,
      status: 'pending',
      paymentMethod: 'Debit Card',
      reference: 'REF003',
      dueDate: '2024-02-17',
      description: 'Subscription payment'
    },
    { 
      id: 4,
      date: '2024-02-04', 
      transactionId: 'PAY-20240204-004',
      senderName: 'William Taylor',
      sentFrom: 'WLT-1004',
      receiverBankAccount: '****3456 - Axis Bank',
      receiverUser: 'Lisa Anderson',
      amount: 7500,
      status: 'pending',
      paymentMethod: 'Bank Transfer',
      reference: 'REF004',
      dueDate: '2024-02-18',
      description: 'Consultation fee'
    },
    { 
      id: 5,
      date: '2024-02-05', 
      transactionId: 'PAY-20240205-005',
      senderName: 'James Wilson',
      sentFrom: 'WLT-1005',
      receiverBankAccount: '****7890 - Kotak Bank',
      receiverUser: 'Patricia Martinez',
      amount: 15000,
      status: 'pending',
      paymentMethod: 'UPI',
      reference: 'REF005',
      dueDate: '2024-02-19',
      description: 'Project milestone payment'
    },
    { 
      id: 6,
      date: '2024-02-06', 
      transactionId: 'PAY-20240206-006',
      senderName: 'David Lee',
      sentFrom: 'WLT-1006',
      receiverBankAccount: '****2345 - Yes Bank',
      receiverUser: 'Jennifer Garcia',
      amount: 3000,
      status: 'pending',
      paymentMethod: 'Bank Transfer',
      reference: 'REF006',
      dueDate: '2024-02-20',
      description: 'Maintenance charges'
    },
    { 
      id: 7,
      date: '2024-02-07', 
      transactionId: 'PAY-20240207-007',
      senderName: 'Richard Martinez',
      sentFrom: 'WLT-1007',
      receiverBankAccount: '****6789 - PNB Bank',
      receiverUser: 'Linda Rodriguez',
      amount: 20000,
      status: 'pending',
      paymentMethod: 'Credit Card',
      reference: 'REF007',
      dueDate: '2024-02-21',
      description: 'Annual subscription'
    },
    { 
      id: 8,
      date: '2024-02-08', 
      transactionId: 'PAY-20240208-008',
      senderName: 'Thomas White',
      sentFrom: 'WLT-1008',
      receiverBankAccount: '****4321 - Canara Bank',
      receiverUser: 'Susan Thomas',
      amount: 4500,
      status: 'pending',
      paymentMethod: 'Debit Card',
      reference: 'REF008',
      dueDate: '2024-02-22',
      description: 'Service fee payment'
    },
    { 
      id: 9,
      date: '2024-02-09', 
      transactionId: 'PAY-20240209-009',
      senderName: 'Charles Anderson',
      sentFrom: 'WLT-1009',
      receiverBankAccount: '****9876 - IndusInd Bank',
      receiverUser: 'Margaret Jackson',
      amount: 8000,
      status: 'pending',
      paymentMethod: 'UPI',
      reference: 'REF009',
      dueDate: '2024-02-23',
      description: 'Software license fee'
    },
    { 
      id: 10,
      date: '2024-02-10', 
      transactionId: 'PAY-20240210-010',
      senderName: 'Joseph Thompson',
      sentFrom: 'WLT-1010',
      receiverBankAccount: '****5432 - Federal Bank',
      receiverUser: 'Karen White',
      amount: 12000,
      status: 'pending',
      paymentMethod: 'Bank Transfer',
      reference: 'REF010',
      dueDate: '2024-02-24',
      description: 'Professional services'
    }
  ]
}

const PendingPayment = () => {
  const [transactions, setTransactions] = useState(getPendingPaymentData())
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('')
  const [exportAnchorEl, setExportAnchorEl] = useState(null)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [pageSize, setPageSize] = useState(10)
  const [actionAnchorEl, setActionAnchorEl] = useState(null)
  const [selectedRow, setSelectedRow] = useState(null)

  const getStatusColor = (status) => {
    const statusColors = {
      pending: 'warning',
      approved: 'success',
      rejected: 'error'
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
    setPaymentMethodFilter('')
  }

  const filteredTransactions = transactions.filter(transaction => {
    if (fromDate && transaction.date < fromDate) return false
    if (toDate && transaction.date > toDate) return false
    if (searchValue && 
        !transaction.transactionId.toLowerCase().includes(searchValue.toLowerCase()) && 
        !transaction.senderName.toLowerCase().includes(searchValue.toLowerCase()) &&
        !transaction.receiverUser.toLowerCase().includes(searchValue.toLowerCase()) &&
        !transaction.receiverBankAccount.toLowerCase().includes(searchValue.toLowerCase())) return false
    if (statusFilter && transaction.status !== statusFilter) return false
    if (paymentMethodFilter && transaction.paymentMethod !== paymentMethodFilter) return false
    return true
  })

  // Stats
  const stats = {
    total: filteredTransactions.length,
    totalAmount: filteredTransactions.reduce((sum, t) => sum + t.amount, 0),
    pendingCount: filteredTransactions.filter(t => t.status === 'pending').length
  }

  // Export Functions
  const handleExportClick = (event) => {
    setExportAnchorEl(event.currentTarget)
  }

  const handleExportClose = () => {
    setExportAnchorEl(null)
  }

  // CSV Export
  const csvData = filteredTransactions.map((transaction, index) => ({
    'Sr. No': index + 1,
    'Date': transaction.date,
    'Transaction ID': transaction.transactionId,
    'Sender Name': transaction.senderName,
    'Sent From': transaction.sentFrom,
    'Receiver Bank Account': transaction.receiverBankAccount,
    'Receiver User': transaction.receiverUser,
    'Amount': transaction.amount,
    'Status': transaction.status,
    'Payment Method': transaction.paymentMethod,
    'Due Date': transaction.dueDate,
    'Reference': transaction.reference,
    'Description': transaction.description
  }))

  // Excel Export
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(csvData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Pending Payments')
    XLSX.writeFile(wb, `pending-payments-${new Date().toISOString().split('T')[0]}.xlsx`)
    handleExportClose()
  }

  // PDF Export
  const exportToPDF = () => {
    const doc = new jsPDF()
    
    doc.setFontSize(18)
    doc.text('Pending Payments Report', 14, 22)
    doc.setFontSize(10)
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30)
    
    const tableColumn = ['Sr. No', 'Date', 'Transaction ID', 'Sender Name', 'Sent From', 'Receiver Bank Account', 'Receiver User', 'Amount', 'Status']
    const tableRows = filteredTransactions.map((transaction, index) => [
      index + 1,
      transaction.date,
      transaction.transactionId,
      transaction.senderName,
      transaction.sentFrom,
      transaction.receiverBankAccount,
      transaction.receiverUser,
      `$${transaction.amount.toFixed(2)}`,
      transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)
    ])
    
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
    
    doc.save(`pending-payments-${new Date().toISOString().split('T')[0]}.pdf`)
    handleExportClose()
  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>Pending Payments Report</title>
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
            <h1>Pending Payments Report</h1>
            <div class="date">Generated on: ${new Date().toLocaleString()}</div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Date</th>
                <th>Transaction ID</th>
                <th>Sender Name</th>
                <th>Sent From</th>
                <th>Receiver Bank Account</th>
                <th>Receiver User</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredTransactions.map((transaction, index) => `
                <tr>
                  <td>${index + 1}侧
                  <td>${transaction.date}侧
                  <td>${transaction.transactionId}侧
                  <td>${transaction.senderName}侧
                  <td>${transaction.sentFrom}侧
                  <td>${transaction.receiverBankAccount}侧
                  <td>${transaction.receiverUser}侧
                  <td>$${transaction.amount.toFixed(2)}侧
                  <td>${transaction.status}侧
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

  const handleActionClick = (event, row) => {
    setActionAnchorEl(event.currentTarget)
    setSelectedRow(row)
  }

  const handleActionClose = () => {
    setActionAnchorEl(null)
  }

  const handleEdit = () => {
    if (selectedRow) {
      toast.success(`Editing payment: ${selectedRow.transactionId}`)
    }
    handleActionClose()
  }

  const handleDelete = () => {
    if (selectedRow) {
      setTransactions(transactions.filter(t => t.id !== selectedRow.id))
      toast.success(`Payment ${selectedRow.transactionId} deleted successfully`)
    }
    handleActionClose()
  }

  const handleApprove = () => {
    if (selectedRow) {
      const updatedTransactions = transactions.map(t => 
        t.id === selectedRow.id ? { ...t, status: 'approved' } : t
      )
      setTransactions(updatedTransactions)
      toast.success(`Payment ${selectedRow.transactionId} approved successfully`)
    }
    handleActionClose()
  }

  const handleReject = () => {
    if (selectedRow) {
      const updatedTransactions = transactions.map(t => 
        t.id === selectedRow.id ? { ...t, status: 'rejected' } : t
      )
      setTransactions(updatedTransactions)
      toast.success(`Payment ${selectedRow.transactionId} rejected successfully`)
    }
    handleActionClose()
  }

  // DataGrid Columns
  const columns = [
    {
      flex: 0.05,
      minWidth: 70,
      field: 'srNo',
      headerName: 'Sr. No',
      renderCell: (params) => (
        <Typography variant='body2' sx={{ fontWeight: 500 }}>
          {params.api.getRowIndex(params.id) + 1}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'date',
      headerName: 'Date',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ fontWeight: 500 }}>
          {row.date}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'transactionId',
      headerName: 'Transaction ID',
      renderCell: ({ row }) => (
        <Tooltip title={row.transactionId}>
          <Typography variant='body2' sx={{ fontWeight: 500, cursor: 'pointer' }}>
            {row.transactionId.slice(0, 12)}...
          </Typography>
        </Tooltip>
      )
    },
    {
      flex: 0.13,
      minWidth: 140,
      field: 'senderName',
      headerName: 'Sender Name',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomAvatar skin='light' sx={{ mr: 2, width: 30, height: 30 }}>
            {row.senderName.charAt(0).toUpperCase()}
          </CustomAvatar>
          <Box>
            <Typography variant='body2' sx={{ fontWeight: 500 }}>
              {row.senderName}
            </Typography>
            <Typography variant='caption' sx={{ color: 'text.disabled' }}>
              {row.sentFrom}
            </Typography>
          </Box>
        </Box>
      )
    },
    {
      flex: 0.12,
      minWidth: 120,
      field: 'sentFrom',
      headerName: 'Sent From',
      renderCell: ({ row }) => (
        <Tooltip title={row.sentFrom}>
          <Typography variant='body2' sx={{ cursor: 'pointer' }}>
            {row.sentFrom.slice(0, 8)}...
          </Typography>
        </Tooltip>
      )
    },
    {
      flex: 0.17,
      minWidth: 170,
      field: 'receiverBankAccount',
      headerName: 'Receiver Bank Account',
      renderCell: ({ row }) => (
        <Tooltip title={row.receiverBankAccount}>
          <Typography variant='body2'>{row.receiverBankAccount}</Typography>
        </Tooltip>
      )
    },
    {
      flex: 0.13,
      minWidth: 130,
      field: 'receiverUser',
      headerName: 'Receiver User',
      renderCell: ({ row }) => (
        <Box>
          <Typography variant='body2' sx={{ fontWeight: 500 }}>
            {row.receiverUser}
          </Typography>
          <Typography variant='caption' sx={{ color: 'text.disabled' }}>
            {row.paymentMethod}
          </Typography>
        </Box>
      )
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'amount',
      headerName: 'Amount',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'success.main', fontWeight: 600 }}>
          {formatCurrency(row.amount)}
        </Typography>
      )
    },
    {
      flex: 0.08,
      minWidth: 100,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => (
        <Chip 
          label={row.status.charAt(0).toUpperCase() + row.status.slice(1)} 
          color={getStatusColor(row.status)} 
          size='small' 
          sx={{ textTransform: 'capitalize' }}
        />
      )
    },
    {
      flex: 0.08,
      minWidth: 100,
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      renderCell: ({ row }) => (
        <Box>
          <Tooltip title='View Details'>
            <IconButton size='small' onClick={() => handleViewDetails(row)} sx={{ mr: 1 }}>
              <Icon icon='tabler:eye' fontSize={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title='More Actions'>
            <IconButton size='small' onClick={e => handleActionClick(e, row)}>
              <Icon icon='tabler:dots-vertical' fontSize={20} />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  return (
    <Box sx={{ pt: 2 }}>
      {/* Page Title */}
      <Typography variant='h4' sx={{ mb: 4, fontWeight: 600 }}>
        Pending Payments
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
              placeholder='Search by ID, Sender, Receiver or Account'
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
                <MenuItem value='pending'>Pending</MenuItem>
                <MenuItem value='approved'>Approved</MenuItem>
                <MenuItem value='rejected'>Rejected</MenuItem>
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
          csvLink.download = `pending-payments-${new Date().toISOString().split('T')[0]}.csv`
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
        <DataGrid
          autoHeight
          rows={filteredTransactions}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[10, 25, 50, 100]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          disableSelectionOnClick
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: theme => theme.palette.action.hover,
              fontWeight: 600
            },
            '& .MuiDataGrid-cell': {
              py: 2
            }
          }}
        />
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
          <Icon icon='tabler:edit' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleApprove} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:check-circle' fontSize={20} />
          Approve
        </MenuItem>
        <MenuItem onClick={handleReject} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:x-circle' fontSize={20} />
          Reject
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:trash' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>

      {/* View Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='sm' fullWidth>
        <DialogTitle>
          Payment Details
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
                  <Typography variant='subtitle2' color='text.secondary'>Sender Name</Typography>
                  <Typography variant='body1' sx={{ mb: 2 }}>{selectedTransaction.senderName}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' color='text.secondary'>Sent From (Wallet ID)</Typography>
                  <Typography variant='body1' sx={{ mb: 2 }}>{selectedTransaction.sentFrom}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' color='text.secondary'>Receiver Bank Account</Typography>
                  <Typography variant='body1' sx={{ mb: 2 }}>{selectedTransaction.receiverBankAccount}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' color='text.secondary'>Receiver User</Typography>
                  <Typography variant='body1' sx={{ mb: 2 }}>{selectedTransaction.receiverUser}</Typography>
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
                  <Typography variant='subtitle2' color='text.secondary'>Due Date</Typography>
                  <Typography variant='body1' sx={{ mb: 2 }}>{selectedTransaction.dueDate}</Typography>
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

export default PendingPayment