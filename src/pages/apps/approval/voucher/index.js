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

const getVoucherData = () => {
  return [
    { 
      id: 1,
      date: '2024-02-01', 
      coinxId: 'CNX-VCH-001234', 
      receiverWallet: 'WLT-3001',
      senderBankAccount: '****1234 - HDFC Bank',
      amount: 5000,
      status: 'active',
      voucherType: 'Gift Voucher',
      code: 'GIFT-001',
      expiryDate: '2024-12-31',
      description: 'Birthday gift voucher',
      createdBy: 'Admin User',
      usedBy: '-'
    },
    { 
      id: 2,
      date: '2024-02-02', 
      coinxId: 'CNX-VCH-001235', 
      receiverWallet: 'WLT-3002',
      senderBankAccount: '****5678 - ICICI Bank',
      amount: 10000,
      status: 'redeemed',
      voucherType: 'Discount Voucher',
      code: 'DISC-002',
      expiryDate: '2024-11-30',
      description: 'Festival discount voucher',
      createdBy: 'Admin User',
      usedBy: 'john_doe'
    },
    { 
      id: 3,
      date: '2024-02-03', 
      coinxId: 'CNX-VCH-001236', 
      receiverWallet: 'WLT-3003',
      senderBankAccount: '****9012 - SBI Bank',
      amount: 2500,
      status: 'active',
      voucherType: 'Cashback Voucher',
      code: 'CASH-003',
      expiryDate: '2025-01-15',
      description: 'Cashback reward',
      createdBy: 'Admin User',
      usedBy: '-'
    },
    { 
      id: 4,
      date: '2024-02-04', 
      coinxId: 'CNX-VCH-001237', 
      receiverWallet: 'WLT-3004',
      senderBankAccount: '****3456 - Axis Bank',
      amount: 7500,
      status: 'expired',
      voucherType: 'Gift Voucher',
      code: 'GIFT-004',
      expiryDate: '2024-01-31',
      description: 'New year gift voucher',
      createdBy: 'Admin User',
      usedBy: '-'
    },
    { 
      id: 5,
      date: '2024-02-05', 
      coinxId: 'CNX-VCH-001238', 
      receiverWallet: 'WLT-3005',
      senderBankAccount: '****7890 - Kotak Bank',
      amount: 15000,
      status: 'redeemed',
      voucherType: 'Discount Voucher',
      code: 'DISC-005',
      expiryDate: '2024-10-20',
      description: 'Special discount voucher',
      createdBy: 'Admin User',
      usedBy: 'jane_smith'
    },
    { 
      id: 6,
      date: '2024-02-06', 
      coinxId: 'CNX-VCH-001239', 
      receiverWallet: 'WLT-3006',
      senderBankAccount: '****2345 - Yes Bank',
      amount: 3000,
      status: 'active',
      voucherType: 'Cashback Voucher',
      code: 'CASH-006',
      expiryDate: '2025-02-28',
      description: 'Purchase cashback',
      createdBy: 'Admin User',
      usedBy: '-'
    },
    { 
      id: 7,
      date: '2024-02-07', 
      coinxId: 'CNX-VCH-001240', 
      receiverWallet: 'WLT-3007',
      senderBankAccount: '****6789 - PNB Bank',
      amount: 20000,
      status: 'active',
      voucherType: 'Gift Voucher',
      code: 'GIFT-007',
      expiryDate: '2025-03-31',
      description: 'Anniversary gift voucher',
      createdBy: 'Admin User',
      usedBy: '-'
    },
    { 
      id: 8,
      date: '2024-02-08', 
      coinxId: 'CNX-VCH-001241', 
      receiverWallet: 'WLT-3008',
      senderBankAccount: '****4321 - Canara Bank',
      amount: 4500,
      status: 'expired',
      voucherType: 'Discount Voucher',
      code: 'DISC-008',
      expiryDate: '2024-02-01',
      description: 'Limited time discount',
      createdBy: 'Admin User',
      usedBy: '-'
    },
  ]
}

const Voucher = () => {
  const [transactions, setTransactions] = useState(getVoucherData())
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
      active: 'success',
      redeemed: 'info',
      expired: 'error'
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
    setSearchValue('')
    setStatusFilter('')
  }

  const filteredTransactions = transactions.filter(transaction => {
    if (searchValue && 
        !transaction.coinxId.toLowerCase().includes(searchValue.toLowerCase()) && 
        !transaction.receiverWallet.toLowerCase().includes(searchValue.toLowerCase()) &&
        !transaction.senderBankAccount.toLowerCase().includes(searchValue.toLowerCase()) &&
        !transaction.code.toLowerCase().includes(searchValue.toLowerCase())) return false
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
  const csvData = filteredTransactions.map((transaction, index) => ({
    'Sr. No': index + 1,
    'Date': transaction.date,
    'Coinx ID': transaction.coinxId,
    'Receiver Wallet': transaction.receiverWallet,
    'Sender Bank Account': transaction.senderBankAccount,
    'Amount': transaction.amount,
    'Status': transaction.status,
    'Voucher Type': transaction.voucherType,
    'Voucher Code': transaction.code,
    'Expiry Date': transaction.expiryDate,
    'Description': transaction.description,
    'Created By': transaction.createdBy,
    'Used By': transaction.usedBy
  }))

  // Excel Export
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(csvData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Vouchers')
    XLSX.writeFile(wb, `vouchers-${new Date().toISOString().split('T')[0]}.xlsx`)
    handleExportClose()
  }

  // PDF Export
  const exportToPDF = () => {
    const doc = new jsPDF()
    
    doc.setFontSize(18)
    doc.text('Vouchers Report', 14, 22)
    doc.setFontSize(10)
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30)
    
    const tableColumn = ['Sr. No', 'Date', 'Coinx ID', 'Receiver Wallet', 'Sender Bank Account', 'Amount', 'Status']
    const tableRows = filteredTransactions.map((transaction, index) => [
      index + 1,
      transaction.date,
      transaction.coinxId,
      transaction.receiverWallet,
      transaction.senderBankAccount,
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
    
    doc.save(`vouchers-${new Date().toISOString().split('T')[0]}.pdf`)
    handleExportClose()
  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>Vouchers Report</title>
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
            <h1>Vouchers Report</h1>
            <div class="date">Generated on: ${new Date().toLocaleString()}</div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Date</th>
                <th>Coinx ID</th>
                <th>Receiver Wallet</th>
                <th>Sender Bank Account</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredTransactions.map((transaction, index) => `
                <tr>
                  <td>${index + 1}侧
                  <td>${transaction.date}侧
                  <td>${transaction.coinxId}侧
                  <td>${transaction.receiverWallet}侧
                  <td>${transaction.senderBankAccount}侧
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
      toast.success(`Editing voucher: ${selectedRow.coinxId}`)
    }
    handleActionClose()
  }

  const handleDelete = () => {
    if (selectedRow) {
      setTransactions(transactions.filter(t => t.id !== selectedRow.id))
      toast.success(`Voucher ${selectedRow.coinxId} deleted successfully`)
    }
    handleActionClose()
  }

  const handleToggleStatus = () => {
    if (selectedRow) {
      const newStatus = selectedRow.status === 'active' ? 'expired' : 'active'
      setTransactions(transactions.map(t => 
        t.id === selectedRow.id ? { ...t, status: newStatus } : t
      ))
      toast.success(`Voucher ${selectedRow.coinxId} ${newStatus === 'active' ? 'activated' : 'expired'} successfully`)
    }
    handleActionClose()
  }

  // DataGrid Columns matching CrmTable design with dynamic Sr. No
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
      flex: 0.12,
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
      flex: 0.18,
      minWidth: 150,
      field: 'coinxId',
      headerName: 'Coinx ID',
      renderCell: ({ row }) => (
        <Tooltip title={row.coinxId}>
          <Typography variant='body2' sx={{ fontWeight: 500, cursor: 'pointer' }}>
            {row.coinxId.slice(0, 12)}...
          </Typography>
        </Tooltip>
      )
    },
    {
      flex: 0.15,
      minWidth: 140,
      field: 'receiverWallet',
      headerName: 'Receiver Wallet',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomAvatar skin='light' sx={{ mr: 2, width: 30, height: 30 }}>
            {row.receiverWallet.charAt(4)}
          </CustomAvatar>
          <Box>
            <Typography variant='body2' sx={{ fontWeight: 500 }}>
              {row.receiverWallet.slice(0, 8)}...
            </Typography>
            <Typography variant='caption' sx={{ color: 'text.disabled' }}>
              Wallet
            </Typography>
          </Box>
        </Box>
      )
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'senderBankAccount',
      headerName: 'Sender Bank Account',
      renderCell: ({ row }) => (
        <Box>
          <Typography variant='body2' sx={{ fontWeight: 500 }}>
            {row.senderBankAccount}
          </Typography>
          <Typography variant='caption' sx={{ color: 'text.disabled' }}>
            {row.voucherType}
          </Typography>
        </Box>
      )
    },
    {
      flex: 0.12,
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
      flex: 0.1,
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
        Vouchers
      </Typography>

      {/* Filter Section */}
      <Card sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} alignItems='center'>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size='small'
              placeholder='Search by Coinx ID, Receiver Wallet, Bank Account or Voucher Code'
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
            <FormControl fullWidth size='small'>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label='Status'
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value=''>All</MenuItem>
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='redeemed'>Redeemed</MenuItem>
                <MenuItem value='expired'>Expired</MenuItem>
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
          csvLink.download = `vouchers-${new Date().toISOString().split('T')[0]}.csv`
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

      {/* DataGrid Table - Same design as CrmTable with working Sr. No */}
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
        <MenuItem onClick={handleToggleStatus} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon={selectedRow?.status === 'active' ? 'tabler:x-circle' : 'tabler:check-circle'} fontSize={20} />
          {selectedRow?.status === 'active' ? 'Expire' : 'Activate'}
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:trash' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>

      {/* View Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='sm' fullWidth>
        <DialogTitle>
          Voucher Details
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
                  <Typography variant='subtitle2' color='text.secondary'>Coinx ID</Typography>
                  <Typography variant='body1' sx={{ mb: 2 }}>{selectedTransaction.coinxId}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' color='text.secondary'>Receiver Wallet</Typography>
                  <Typography variant='body1' sx={{ mb: 2 }}>{selectedTransaction.receiverWallet}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' color='text.secondary'>Sender Bank Account</Typography>
                  <Typography variant='body1' sx={{ mb: 2 }}>{selectedTransaction.senderBankAccount}</Typography>
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
                  <Typography variant='subtitle2' color='text.secondary'>Voucher Type</Typography>
                  <Typography variant='body1' sx={{ mb: 2 }}>{selectedTransaction.voucherType}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' color='text.secondary'>Voucher Code</Typography>
                  <Typography variant='body1' sx={{ mb: 2 }}>{selectedTransaction.code}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' color='text.secondary'>Expiry Date</Typography>
                  <Typography variant='body1' sx={{ mb: 2 }}>{selectedTransaction.expiryDate}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' color='text.secondary'>Description</Typography>
                  <Typography variant='body1' sx={{ mb: 2 }}>{selectedTransaction.description}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' color='text.secondary'>Created By</Typography>
                  <Typography variant='body1' sx={{ mb: 2 }}>{selectedTransaction.createdBy}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' color='text.secondary'>Used By</Typography>
                  <Typography variant='body1' sx={{ mb: 2 }}>{selectedTransaction.usedBy}</Typography>
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

export default Voucher