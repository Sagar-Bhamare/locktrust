  // // import React, { useState } from 'react'

  // // // ** MUI Imports
  // // import Box from '@mui/material/Box'
  // // import Card from '@mui/material/Card'
  // // import Grid from '@mui/material/Grid'
  // // import Button from '@mui/material/Button'
  // // import Dialog from '@mui/material/Dialog'
  // // import DialogTitle from '@mui/material/DialogTitle'
  // // import DialogContent from '@mui/material/DialogContent'
  // // import DialogActions from '@mui/material/DialogActions'
  // // import TextField from '@mui/material/TextField'
  // // import Typography from '@mui/material/Typography'
  // // import IconButton from '@mui/material/IconButton'
  // // import Menu from '@mui/material/Menu'
  // // import MenuItem from '@mui/material/MenuItem'
  // // import { DataGrid } from '@mui/x-data-grid'
  // // import CardHeader from '@mui/material/CardHeader'
  // // import InputLabel from '@mui/material/InputLabel'
  // // import FormControl from '@mui/material/FormControl'
  // // import Select from '@mui/material/Select'
  // // import Chip from '@mui/material/Chip'
  // // import Tooltip from '@mui/material/Tooltip'
  // // import Alert from '@mui/material/Alert'
  // // import Snackbar from '@mui/material/Snackbar'
  // // import CircularProgress from '@mui/material/CircularProgress'
  // // import Backdrop from '@mui/material/Backdrop'

  // // // ** Icon Imports
  // // import Icon from 'src/@core/components/icon'

  // // // ** Custom Components
  // // import CustomAvatar from 'src/@core/components/mui/avatar'

  // // // ** Dummy Data
  // // const dummyWalletData = [
  // //   {
  // //     id: 1,
  // //     dateTime: '2024-01-15 10:30:00',
  // //     walletId: 'WLT123456789',
  // //     nameOnWallet: 'John Doe',
  // //     emailAddress: 'john.doe@example.com',
  // //     status: 'active',
  // //     kycStatus: 'verified',
  // //     balance: 15000,
  // //     currency: 'USD'
  // //   },
  // //   {
  // //     id: 2,
  // //     dateTime: '2024-01-16 14:45:00',
  // //     walletId: 'WLT987654321',
  // //     nameOnWallet: 'Jane Smith',
  // //     emailAddress: 'jane.smith@example.com',
  // //     status: 'active',
  // //     kycStatus: 'pending',
  // //     balance: 25000,
  // //     currency: 'USD'
  // //   },
  // //   {
  // //     id: 3,
  // //     dateTime: '2024-01-18 09:15:00',
  // //     walletId: 'WLT456789123',
  // //     nameOnWallet: 'Robert Johnson',
  // //     emailAddress: 'robert.j@example.com',
  // //     status: 'inactive',
  // //     kycStatus: 'verified',
  // //     balance: 5000,
  // //     currency: 'EUR'
  // //   },
  // //   {
  // //     id: 4,
  // //     dateTime: '2024-01-20 16:20:00',
  // //     walletId: 'WLT789123456',
  // //     nameOnWallet: 'Maria Garcia',
  // //     emailAddress: 'maria.g@example.com',
  // //     status: 'active',
  // //     kycStatus: 'verified',
  // //     balance: 45000,
  // //     currency: 'USD'
  // //   },
  // //   {
  // //     id: 5,
  // //     dateTime: '2024-01-22 11:00:00',
  // //     walletId: 'WLT321654987',
  // //     nameOnWallet: 'David Wilson',
  // //     emailAddress: 'david.w@example.com',
  // //     status: 'suspended',
  // //     kycStatus: 'rejected',
  // //     balance: 0,
  // //     currency: 'GBP'
  // //   },
  // //   {
  // //     id: 6,
  // //     dateTime: '2024-01-25 13:30:00',
  // //     walletId: 'WLT654987321',
  // //     nameOnWallet: 'Sarah Brown',
  // //     emailAddress: 'sarah.b@example.com',
  // //     status: 'active',
  // //     kycStatus: 'verified',
  // //     balance: 32000,
  // //     currency: 'USD'
  // //   },
  // //   {
  // //     id: 7,
  // //     dateTime: '2024-01-28 08:45:00',
  // //     walletId: 'WLT147258369',
  // //     nameOnWallet: 'Michael Lee',
  // //     emailAddress: 'michael.l@example.com',
  // //     status: 'pending',
  // //     kycStatus: 'pending',
  // //     balance: 1000,
  // //     currency: 'USD'
  // //   }
  // // ]

  // // const ManageUser = () => {
  // //   // ** States for Wallet Creation
  // //   const [openWalletDialog, setOpenWalletDialog] = useState(false)
  // //   const [walletFormData, setWalletFormData] = useState({
  // //     nameOnWallet: '',
  // //     emailAddress: '',
  // //     currency: 'USD',
  // //     initialBalance: 0
  // //   })
  // //   const [formErrors, setFormErrors] = useState({})

  // //   // ** States for Batch Upload
  // //   const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  // //   const [selectedFile, setSelectedFile] = useState(null)
  // //   const [uploadProgress, setUploadProgress] = useState(false)

  // //   // ** States for Table
  // //   const [statusFilter, setStatusFilter] = useState('')
  // //   const [kycFilter, setKycFilter] = useState('')
  // //   const [searchValue, setSearchValue] = useState('')
  // //   const [pageSize, setPageSize] = useState(10)
  // //   const [tableData, setTableData] = useState(dummyWalletData)

  // //   // ** States for Notifications
  // //   const [snackbar, setSnackbar] = useState({
  // //     open: false,
  // //     message: '',
  // //     severity: 'success'
  // //   })

  // //   // ** Action Menu State
  // //   const [actionAnchorEl, setActionAnchorEl] = useState(null)
  // //   const [selectedWallet, setSelectedWallet] = useState(null)

  // //   // ** Open Wallet Creation Dialog
  // //   const handleOpenWalletDialog = () => {
  // //     setOpenWalletDialog(true)
  // //     setWalletFormData({
  // //       nameOnWallet: '',
  // //       emailAddress: '',
  // //       currency: 'USD',
  // //       initialBalance: 0
  // //     })
  // //     setFormErrors({})
  // //   }

  // //   // ** Close Wallet Creation Dialog
  // //   const handleCloseWalletDialog = () => {
  // //     setOpenWalletDialog(false)
  // //   }

  // //   // ** Handle Wallet Form Input Changes
  // //   const handleWalletFormChange = e => {
  // //     const { name, value } = e.target
  // //     setWalletFormData(prev => ({
  // //       ...prev,
  // //       [name]: name === 'initialBalance' ? parseFloat(value) || 0 : value
  // //     }))
  // //     // Clear error for this field
  // //     if (formErrors[name]) {
  // //       setFormErrors(prev => ({ ...prev, [name]: '' }))
  // //     }
  // //   }

  // //   // ** Validate Wallet Form
  // //   const validateWalletForm = () => {
  // //     const errors = {}
  // //     if (!walletFormData.nameOnWallet.trim()) {
  // //       errors.nameOnWallet = 'Name on wallet is required'
  // //     }
  // //     if (!walletFormData.emailAddress.trim()) {
  // //       errors.emailAddress = 'Email address is required'
  // //     } else if (!/\S+@\S+\.\S+/.test(walletFormData.emailAddress)) {
  // //       errors.emailAddress = 'Email address is invalid'
  // //     }
  // //     if (walletFormData.initialBalance < 0) {
  // //       errors.initialBalance = 'Initial balance cannot be negative'
  // //     }
  // //     return errors
  // //   }

  // //   // ** Submit Wallet Creation
  // //   const handleSubmitWallet = () => {
  // //     const errors = validateWalletForm()
  // //     if (Object.keys(errors).length > 0) {
  // //       setFormErrors(errors)
  // //       return
  // //     }

  // //     // Create new wallet entry
  // //     const newWallet = {
  // //       id: tableData.length + 1,
  // //       dateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
  // //       walletId: `WLT${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
  // //       nameOnWallet: walletFormData.nameOnWallet,
  // //       emailAddress: walletFormData.emailAddress,
  // //       status: 'pending',
  // //       kycStatus: 'pending',
  // //       balance: walletFormData.initialBalance,
  // //       currency: walletFormData.currency
  // //     }

  // //     setTableData(prev => [newWallet, ...prev])
  // //     setSnackbar({
  // //       open: true,
  // //       message: 'Wallet created successfully!',
  // //       severity: 'success'
  // //     })
  // //     handleCloseWalletDialog()
  // //   }

  // //   // ** Handle Batch Upload
  // //   const handleBatchUpload = () => {
  // //     setUploadDialogOpen(true)
  // //     setSelectedFile(null)
  // //   }

  // //   const handleFileChange = e => {
  // //     const file = e.target.files[0]
  // //     if (
  // //       file &&
  // //       (file.type === 'text/csv' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  // //     ) {
  // //       setSelectedFile(file)
  // //     } else {
  // //       setSnackbar({
  // //         open: true,
  // //         message: 'Please upload a valid CSV or Excel file',
  // //         severity: 'error'
  // //       })
  // //     }
  // //   }

  // //   const handleFileUpload = () => {
  // //     if (!selectedFile) {
  // //       setSnackbar({
  // //         open: true,
  // //         message: 'Please select a file to upload',
  // //         severity: 'error'
  // //       })
  // //       return
  // //     }

  // //     setUploadProgress(true)

  // //     // Simulate file upload
  // //     setTimeout(() => {
  // //       // Mock uploaded data
  // //       const mockUploadedWallets = [
  // //         {
  // //           id: tableData.length + 1,
  // //           dateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
  // //           walletId: `WLT${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
  // //           nameOnWallet: 'Batch User 1',
  // //           emailAddress: 'batch1@example.com',
  // //           status: 'active',
  // //           kycStatus: 'pending',
  // //           balance: 1000,
  // //           currency: 'USD'
  // //         },
  // //         {
  // //           id: tableData.length + 2,
  // //           dateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
  // //           walletId: `WLT${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
  // //           nameOnWallet: 'Batch User 2',
  // //           emailAddress: 'batch2@example.com',
  // //           status: 'active',
  // //           kycStatus: 'pending',
  // //           balance: 2000,
  // //           currency: 'USD'
  // //         }
  // //       ]

  // //       setTableData(prev => [...mockUploadedWallets, ...prev])
  // //       setUploadProgress(false)
  // //       setUploadDialogOpen(false)
  // //       setSnackbar({
  // //         open: true,
  // //         message: `${mockUploadedWallets.length} wallets uploaded successfully!`,
  // //         severity: 'success'
  // //       })
  // //     }, 2000)
  // //   }

  // //   // ** Download Batch Template
  // //   const handleDownloadTemplate = () => {
  // //     const csvContent =
  // //       'Name on Wallet,Email Address,Currency,Initial Balance\nJohn Doe,john@example.com,USD,1000\nJane Smith,jane@example.com,USD,2000'
  // //     const blob = new Blob([csvContent], { type: 'text/csv' })
  // //     const url = URL.createObjectURL(blob)
  // //     const link = document.createElement('a')
  // //     link.href = url
  // //     link.download = 'wallet_batch_template.csv'
  // //     link.click()
  // //     URL.revokeObjectURL(url)

  // //     setSnackbar({
  // //       open: true,
  // //       message: 'Template downloaded successfully!',
  // //       severity: 'success'
  // //     })
  // //   }

  // //   // ** Handle View Action
  // //   const handleViewWallet = wallet => {
  // //     setSelectedWallet(wallet)
  // //     setActionAnchorEl(null)
  // //     setSnackbar({
  // //       open: true,
  // //       message: `Viewing wallet: ${wallet.walletId}`,
  // //       severity: 'info'
  // //     })
  // //   }

  // //   // ** Handle Deactivate Action
  // //   const handleDeactivateWallet = wallet => {
  // //     setActionAnchorEl(null)
  // //     const updatedData = tableData.map(item =>
  // //       item.id === wallet.id ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' } : item
  // //     )
  // //     setTableData(updatedData)
  // //     setSnackbar({
  // //       open: true,
  // //       message: `Wallet ${wallet.walletId} has been ${wallet.status === 'active' ? 'deactivated' : 'activated'}`,
  // //       severity: 'success'
  // //     })
  // //   }

  // //   // ** Handle Action Menu
  // //   const handleActionClick = (event, wallet) => {
  // //     setActionAnchorEl(event.currentTarget)
  // //     setSelectedWallet(wallet)
  // //   }

  // //   const handleActionClose = () => {
  // //     setActionAnchorEl(null)
  // //   }

  // //   // ** Filter Table Data
  // //   const filteredData = tableData.filter(row => {
  // //     const matchesStatus = statusFilter ? row.status === statusFilter : true
  // //     const matchesKyc = kycFilter ? row.kycStatus === kycFilter : true
  // //     const matchesSearch = searchValue
  // //       ? row.walletId.toLowerCase().includes(searchValue.toLowerCase()) ||
  // //         row.nameOnWallet.toLowerCase().includes(searchValue.toLowerCase()) ||
  // //         row.emailAddress.toLowerCase().includes(searchValue.toLowerCase())
  // //       : true
  // //     return matchesStatus && matchesKyc && matchesSearch
  // //   })

  // //   // ** Table Columns
  // //   const columns = [
  // //     {
  // //       flex: 0.15,
  // //       minWidth: 160,
  // //       field: 'dateTime',
  // //       headerName: 'Date & Time',
  // //       renderCell: ({ row }) => <Typography variant='body2'>{row.dateTime}</Typography>
  // //     },
  // //     {
  // //       flex: 0.15,
  // //       minWidth: 130,
  // //       field: 'walletId',
  // //       headerName: 'Wallet ID',
  // //       renderCell: ({ row }) => (
  // //         <Typography variant='body2' sx={{ fontWeight: 500 }}>
  // //           {row.walletId}
  // //         </Typography>
  // //       )
  // //     },
  // //     {
  // //       flex: 0.15,
  // //       minWidth: 150,
  // //       field: 'nameOnWallet',
  // //       headerName: 'Name on Wallet',
  // //       renderCell: ({ row }) => (
  // //         <Box sx={{ display: 'flex', alignItems: 'center' }}>
  // //           <CustomAvatar skin='light' sx={{ mr: 2, width: 30, height: 30 }}>
  // //             {row.nameOnWallet.charAt(0)}
  // //           </CustomAvatar>
  // //           <Typography variant='body2'>{row.nameOnWallet}</Typography>
  // //         </Box>
  // //       )
  // //     },
  // //     {
  // //       flex: 0.15,
  // //       minWidth: 180,
  // //       field: 'emailAddress',
  // //       headerName: 'Email Address',
  // //       renderCell: ({ row }) => <Typography variant='body2'>{row.emailAddress}</Typography>
  // //     },
  // //     {
  // //       flex: 0.1,
  // //       minWidth: 110,
  // //       field: 'status',
  // //       headerName: 'Status',
  // //       renderCell: ({ row }) => {
  // //         const statusColors = {
  // //           active: 'success',
  // //           inactive: 'default',
  // //           pending: 'warning',
  // //           suspended: 'error'
  // //         }
  // //         return (
  // //           <Chip
  // //             label={row.status}
  // //             color={statusColors[row.status] || 'default'}
  // //             size='small'
  // //             sx={{ textTransform: 'capitalize' }}
  // //           />
  // //         )
  // //       }
  // //     },
  // //     {
  // //       flex: 0.12,
  // //       minWidth: 120,
  // //       field: 'kycStatus',
  // //       headerName: 'KYC Status',
  // //       renderCell: ({ row }) => {
  // //         const kycColors = {
  // //           verified: 'success',
  // //           pending: 'warning',
  // //           rejected: 'error',
  // //           not_submitted: 'default'
  // //         }
  // //         return (
  // //           <Chip
  // //             label={row.kycStatus}
  // //             color={kycColors[row.kycStatus] || 'default'}
  // //             size='small'
  // //             sx={{ textTransform: 'capitalize' }}
  // //           />
  // //         )
  // //       }
  // //     },
  // //     {
  // //       flex: 0.1,
  // //       minWidth: 120,
  // //       field: 'action',
  // //       headerName: 'Action',
  // //       renderCell: ({ row }) => (
  // //         <Box>
  // //           <Tooltip title='View Details'>
  // //             <IconButton size='small' onClick={() => handleViewWallet(row)} sx={{ mr: 1 }}>
  // //               <Icon icon='tabler:eye' fontSize={20} />
  // //             </IconButton>
  // //           </Tooltip>
  // //           <Tooltip title={row.status === 'active' ? 'Deactivate' : 'Activate'}>
  // //             <IconButton size='small' onClick={() => handleDeactivateWallet(row)}>
  // //               <Icon icon={row.status === 'active' ? 'tabler:user-x' : 'tabler:user-check'} fontSize={20} />
  // //             </IconButton>
  // //           </Tooltip>
  // //         </Box>
  // //       )
  // //     }
  // //   ]

  // //   return (
  // //     <>
  // //       <Grid container spacing={6}>
  // //         {/* Header Section with Buttons */}
  // //         <Grid item xs={12}>
  // //           <Card>
  // //             <CardHeader title='Wallet Management' subheader='Create, upload batch, and manage user wallets' />
  // //             <Box sx={{ p: 5, pt: 0, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
  // //               <Button variant='contained' onClick={handleOpenWalletDialog} startIcon={<Icon icon='tabler:wallet' />}>
  // //                 Create Wallet
  // //               </Button>
  // //               <Button variant='outlined' onClick={handleBatchUpload} startIcon={<Icon icon='tabler:upload' />}>
  // //                 Upload Batch
  // //               </Button>
  // //               <Button variant='outlined' onClick={handleDownloadTemplate} startIcon={<Icon icon='tabler:download' />}>
  // //                 Download Template
  // //               </Button>
  // //             </Box>
  // //           </Card>
  // //         </Grid>

  // //         {/* Filters Section */}
  // //         <Grid item xs={12}>
  // //           <Card>
  // //             <CardHeader title='Filters' />
  // //             <Box sx={{ p: 5, pt: 0 }}>
  // //               <Grid container spacing={4}>
  // //                 <Grid item xs={12} sm={4}>
  // //                   <TextField
  // //                     fullWidth
  // //                     size='small'
  // //                     placeholder='Search by Wallet ID, Name or Email'
  // //                     value={searchValue}
  // //                     onChange={e => setSearchValue(e.target.value)}
  // //                     InputProps={{
  // //                       startAdornment: <Icon icon='tabler:search' fontSize={20} style={{ marginRight: 8 }} />
  // //                     }}
  // //                   />
  // //                 </Grid>
  // //                 <Grid item xs={12} sm={4}>
  // //                   <FormControl fullWidth size='small'>
  // //                     <InputLabel>Status</InputLabel>
  // //                     <Select value={statusFilter} label='Status' onChange={e => setStatusFilter(e.target.value)}>
  // //                       <MenuItem value=''>All</MenuItem>
  // //                       <MenuItem value='active'>Active</MenuItem>
  // //                       <MenuItem value='inactive'>Inactive</MenuItem>
  // //                       <MenuItem value='pending'>Pending</MenuItem>
  // //                       <MenuItem value='suspended'>Suspended</MenuItem>
  // //                     </Select>
  // //                   </FormControl>
  // //                 </Grid>
  // //                 <Grid item xs={12} sm={4}>
  // //                   <FormControl fullWidth size='small'>
  // //                     <InputLabel>KYC Status</InputLabel>
  // //                     <Select value={kycFilter} label='KYC Status' onChange={e => setKycFilter(e.target.value)}>
  // //                       <MenuItem value=''>All</MenuItem>
  // //                       <MenuItem value='verified'>Verified</MenuItem>
  // //                       <MenuItem value='pending'>Pending</MenuItem>
  // //                       <MenuItem value='rejected'>Rejected</MenuItem>
  // //                     </Select>
  // //                   </FormControl>
  // //                 </Grid>
  // //               </Grid>
  // //             </Box>
  // //           </Card>
  // //         </Grid>

  // //         {/* Table Section */}
  // //         <Grid item xs={12}>
  // //           <Card>
  // //             <DataGrid
  // //               autoHeight
  // //               rows={filteredData}
  // //               columns={columns}
  // //               pageSize={pageSize}
  // //               rowsPerPageOptions={[10, 25, 50]}
  // //               onPageSizeChange={setPageSize}
  // //               disableSelectionOnClick
  // //               sx={{
  // //                 '& .MuiDataGrid-columnHeaders': {
  // //                   backgroundColor: theme => theme.palette.action.hover
  // //                 }
  // //               }}
  // //             />
  // //           </Card>
  // //         </Grid>
  // //       </Grid>

  // //       {/* Create Wallet Dialog */}
  // //       <Dialog open={openWalletDialog} onClose={handleCloseWalletDialog} maxWidth='sm' fullWidth>
  // //         <DialogTitle>
  // //           <Box display='flex' justifyContent='space-between' alignItems='center'>
  // //             Create New Wallet
  // //             <IconButton onClick={handleCloseWalletDialog}>
  // //               <Icon icon='tabler:x' />
  // //             </IconButton>
  // //           </Box>
  // //         </DialogTitle>
  // //         <DialogContent>
  // //           <Grid container spacing={4} sx={{ mt: 1 }}>
  // //             <Grid item xs={12}>
  // //               <TextField
  // //                 fullWidth
  // //                 label='Name on Wallet'
  // //                 name='nameOnWallet'
  // //                 value={walletFormData.nameOnWallet}
  // //                 onChange={handleWalletFormChange}
  // //                 error={!!formErrors.nameOnWallet}
  // //                 helperText={formErrors.nameOnWallet}
  // //                 required
  // //               />
  // //             </Grid>
  // //             <Grid item xs={12}>
  // //               <TextField
  // //                 fullWidth
  // //                 label='Email Address'
  // //                 name='emailAddress'
  // //                 type='email'
  // //                 value={walletFormData.emailAddress}
  // //                 onChange={handleWalletFormChange}
  // //                 error={!!formErrors.emailAddress}
  // //                 helperText={formErrors.emailAddress}
  // //                 required
  // //               />
  // //             </Grid>
  // //             <Grid item xs={12} sm={6}>
  // //               <FormControl fullWidth>
  // //                 <InputLabel>Currency</InputLabel>
  // //                 <Select
  // //                   name='currency'
  // //                   value={walletFormData.currency}
  // //                   label='Currency'
  // //                   onChange={handleWalletFormChange}
  // //                 >
  // //                   <MenuItem value='USD'>USD - US Dollar</MenuItem>
  // //                   <MenuItem value='EUR'>EUR - Euro</MenuItem>
  // //                   <MenuItem value='GBP'>GBP - British Pound</MenuItem>
  // //                   <MenuItem value='INR'>INR - Indian Rupee</MenuItem>
  // //                 </Select>
  // //               </FormControl>
  // //             </Grid>
  // //             <Grid item xs={12} sm={6}>
  // //               <TextField
  // //                 fullWidth
  // //                 label='Initial Balance'
  // //                 name='initialBalance'
  // //                 type='number'
  // //                 value={walletFormData.initialBalance}
  // //                 onChange={handleWalletFormChange}
  // //                 error={!!formErrors.initialBalance}
  // //                 helperText={formErrors.initialBalance}
  // //                 InputProps={{ startAdornment: '$' }}
  // //               />
  // //             </Grid>
  // //           </Grid>
  // //         </DialogContent>
  // //         <DialogActions>
  // //           <Button onClick={handleCloseWalletDialog} color='secondary'>
  // //             Cancel
  // //           </Button>
  // //           <Button onClick={handleSubmitWallet} variant='contained'>
  // //             Create Wallet
  // //           </Button>
  // //         </DialogActions>
  // //       </Dialog>

  // //       {/* Batch Upload Dialog */}
  // //       <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)} maxWidth='sm' fullWidth>
  // //         <DialogTitle>Upload Batch Wallets</DialogTitle>
  // //         <DialogContent>
  // //           <Box sx={{ mt: 2 }}>
  // //             <Alert severity='info' sx={{ mb: 3 }}>
  // //               Please upload a CSV or Excel file with the following columns: Name on Wallet, Email Address, Currency,
  // //               Initial Balance
  // //             </Alert>
  // //             <Button variant='outlined' component='label' fullWidth sx={{ mb: 2 }}>
  // //               Select File
  // //               <input type='file' hidden accept='.csv,.xlsx,.xls' onChange={handleFileChange} />
  // //             </Button>
  // //             {selectedFile && (
  // //               <Typography variant='body2' sx={{ mt: 1 }}>
  // //                 Selected: {selectedFile.name}
  // //               </Typography>
  // //             )}
  // //           </Box>
  // //         </DialogContent>
  // //         <DialogActions>
  // //           <Button onClick={() => setUploadDialogOpen(false)} color='secondary'>
  // //             Cancel
  // //           </Button>
  // //           <Button onClick={handleFileUpload} variant='contained' disabled={!selectedFile}>
  // //             Upload
  // //           </Button>
  // //         </DialogActions>
  // //       </Dialog>

  // //       {/* Snackbar for Notifications */}
  // //       <Snackbar
  // //         open={snackbar.open}
  // //         autoHideDuration={4000}
  // //         onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
  // //         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  // //       >
  // //         <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
  // //           {snackbar.message}
  // //         </Alert>
  // //       </Snackbar>

  // //       {/* Loading Backdrop */}
  // //       <Backdrop open={uploadProgress} sx={{ color: '#fff', zIndex: 9999 }}>
  // //         <CircularProgress color='inherit' />
  // //       </Backdrop>
  // //     </>
  // //   )
  // // }

  // // export default ManageUser

  //   import React, { useState } from 'react'

  //   // ** MUI Imports
  //   import Grid from '@mui/material/Grid'

  //   // ** Custom Components
  //   import WalletHeader from 'src/views/pages/manage-users/WalletHeader'
  //   import WalletFilters from 'src/views/pages/manage-users/WalletFilters'
  //   import WalletsTable from 'src/views/pages/manage-users/WalletsTable'
  //   import CreateWalletDialog from 'src/views/pages/manage-users/CreateWalletDialog'
  //   import UploadBatchDialog from 'src/views/pages/manage-users/UploadBatchDialog'

  //   // ** Toast
  //   import toast from 'react-hot-toast'

  //   // ** Dummy Data
  //   const dummyWalletData = [
  //     {
  //       id: 1,
  //       dateTime: '2024-01-15 10:30:00',
  //       walletId: 'WLT123456789',
  //       nameOnWallet: 'John Doe',
  //       emailAddress: 'john.doe@example.com',
  //       status: 'active',
  //       kycStatus: 'verified',
  //       balance: 15000,
  //       currency: 'USD'
  //     },
  //     {
  //       id: 2,
  //       dateTime: '2024-01-16 14:45:00',
  //       walletId: 'WLT987654321',
  //       nameOnWallet: 'Jane Smith',
  //       emailAddress: 'jane.smith@example.com',
  //       status: 'active',
  //       kycStatus: 'pending',
  //       balance: 25000,
  //       currency: 'USD'
  //     },
  //     {
  //       id: 3,
  //       dateTime: '2024-01-18 09:15:00',
  //       walletId: 'WLT456789123',
  //       nameOnWallet: 'Robert Johnson',
  //       emailAddress: 'robert.j@example.com',
  //       status: 'inactive',
  //       kycStatus: 'verified',
  //       balance: 5000,
  //       currency: 'EUR'
  //     },
  //     {
  //       id: 4,
  //       dateTime: '2024-01-20 16:20:00',
  //       walletId: 'WLT789123456',
  //       nameOnWallet: 'Maria Garcia',
  //       emailAddress: 'maria.g@example.com',
  //       status: 'active',
  //       kycStatus: 'verified',
  //       balance: 45000,
  //       currency: 'USD'
  //     },
  //     {
  //       id: 5,
  //       dateTime: '2024-01-22 11:00:00',
  //       walletId: 'WLT321654987',
  //       nameOnWallet: 'David Wilson',
  //       emailAddress: 'david.w@example.com',
  //       status: 'suspended',
  //       kycStatus: 'rejected',
  //       balance: 0,
  //       currency: 'GBP'
  //     },
  //     {
  //       id: 6,
  //       dateTime: '2024-01-25 13:30:00',
  //       walletId: 'WLT654987321',
  //       nameOnWallet: 'Sarah Brown',
  //       emailAddress: 'sarah.b@example.com',
  //       status: 'active',
  //       kycStatus: 'verified',
  //       balance: 32000,
  //       currency: 'USD'
  //     },
  //     {
  //       id: 7,
  //       dateTime: '2024-01-28 08:45:00',
  //       walletId: 'WLT147258369',
  //       nameOnWallet: 'Michael Lee',
  //       emailAddress: 'michael.l@example.com',
  //       status: 'pending',
  //       kycStatus: 'pending',
  //       balance: 1000,
  //       currency: 'USD'
  //     }
  //   ]

  //   const ManageUser = () => {
  //     // ** States
  //     const [tableData, setTableData] = useState(dummyWalletData)
  //     const [openWalletDialog, setOpenWalletDialog] = useState(false)
  //     const [openUploadDialog, setOpenUploadDialog] = useState(false)
  //     const [statusFilter, setStatusFilter] = useState('')
  //     const [kycFilter, setKycFilter] = useState('')
  //     const [searchValue, setSearchValue] = useState('')
  //     const [pageSize, setPageSize] = useState(10)

  //     // ** Create Wallet Handler
  //     const handleCreateWallet = walletData => {
  //       const newWallet = {
  //         id: tableData.length + 1,
  //         dateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
  //         walletId: `WLT${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
  //         ...walletData,
  //         status: 'pending',
  //         kycStatus: 'pending'
  //       }
  //       setTableData(prev => [newWallet, ...prev])
  //       toast.success('Wallet created successfully!')
  //       setOpenWalletDialog(false)
  //     }

  //     // ** Batch Upload Handler
  //     const handleBatchUpload = file => {
  //       // Simulate file upload
  //       setTimeout(() => {
  //         const mockUploadedWallets = [
  //           {
  //             id: tableData.length + 1,
  //             dateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
  //             walletId: `WLT${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
  //             nameOnWallet: 'Batch User 1',
  //             emailAddress: 'batch1@example.com',
  //             status: 'active',
  //             kycStatus: 'pending',
  //             balance: 1000,
  //             currency: 'USD'
  //           },
  //           {
  //             id: tableData.length + 2,
  //             dateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
  //             walletId: `WLT${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
  //             nameOnWallet: 'Batch User 2',
  //             emailAddress: 'batch2@example.com',
  //             status: 'active',
  //             kycStatus: 'pending',
  //             balance: 2000,
  //             currency: 'USD'
  //           }
  //         ]
  //         setTableData(prev => [...mockUploadedWallets, ...prev])
  //         toast.success(`${mockUploadedWallets.length} wallets uploaded successfully!`)
  //         setOpenUploadDialog(false)
  //       }, 2000)
  //     }

  //     // ** Toggle Wallet Status
  //     const handleToggleStatus = walletId => {
  //       const updatedData = tableData.map(item =>
  //         item.id === walletId ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' } : item
  //       )
  //       setTableData(updatedData)
  //       const wallet = updatedData.find(w => w.id === walletId)
  //       toast.success(`Wallet ${wallet.status === 'active' ? 'activated' : 'deactivated'} successfully!`)
  //     }

  //     // ** View Wallet Handler
  //     const handleViewWallet = wallet => {
  //       toast.success(`Viewing wallet: ${wallet.walletId}`)
  //     }

  //     // ** Download Template Handler
  //     const handleDownloadTemplate = () => {
  //       const csvContent =
  //         'Name on Wallet,Email Address,Currency,Initial Balance\nJohn Doe,john@example.com,USD,1000\nJane Smith,jane@example.com,USD,2000'
  //       const blob = new Blob([csvContent], { type: 'text/csv' })
  //       const url = URL.createObjectURL(blob)
  //       const link = document.createElement('a')
  //       link.href = url
  //       link.download = 'wallet_batch_template.csv'
  //       link.click()
  //       URL.revokeObjectURL(url)
  //       toast.success('Template downloaded successfully!')
  //     }

  //     // ** Filtered Data
  //     const filteredData = tableData.filter(row => {
  //       const matchesStatus = statusFilter ? row.status === statusFilter : true
  //       const matchesKyc = kycFilter ? row.kycStatus === kycFilter : true
  //       const matchesSearch = searchValue
  //         ? row.walletId.toLowerCase().includes(searchValue.toLowerCase()) ||
  //           row.nameOnWallet.toLowerCase().includes(searchValue.toLowerCase()) ||
  //           row.emailAddress.toLowerCase().includes(searchValue.toLowerCase())
  //         : true
  //       return matchesStatus && matchesKyc && matchesSearch
  //     })

  //     return (
  //       <>
  //         <Grid container spacing={6}>
  //           <Grid item xs={12}>
  //             <WalletHeader
  //               onCreateWallet={() => setOpenWalletDialog(true)}
  //               onUploadBatch={() => setOpenUploadDialog(true)}
  //               onDownloadTemplate={handleDownloadTemplate}
  //             />
  //           </Grid>

  //           <Grid item xs={12}>
  //             <WalletFilters
  //               searchValue={searchValue}
  //               onSearchChange={setSearchValue}
  //               statusFilter={statusFilter}
  //               onStatusChange={setStatusFilter}
  //               kycFilter={kycFilter}
  //               onKycChange={setKycFilter}
  //             />
  //           </Grid>

  //           <Grid item xs={12}>
  //             <WalletsTable
  //               data={filteredData}
  //               pageSize={pageSize}
  //               onPageSizeChange={setPageSize}
  //               onView={handleViewWallet}
  //               onToggleStatus={handleToggleStatus}
  //             />
  //           </Grid>
  //         </Grid>

  //         <CreateWalletDialog
  //           open={openWalletDialog}
  //           onClose={() => setOpenWalletDialog(false)}
  //           onSubmit={handleCreateWallet}
  //         />

  //         <UploadBatchDialog
  //           open={openUploadDialog}
  //           onClose={() => setOpenUploadDialog(false)}
  //           onUpload={handleBatchUpload}
  //         />
  //       </>
  //     )
  //   }

  //   export default ManageUser


  import React, { useState } from 'react'

  // ** MUI Imports
  import Grid from '@mui/material/Grid'

  // ** Custom Components
  import WalletHeader from 'src/views/pages/manage-users/WalletHeader'
  import WalletFilters from 'src/views/pages/manage-users/WalletFilters'
  import WalletsTable from 'src/views/pages/manage-users/WalletsTable'
  import CreateWalletDialog from 'src/views/pages/manage-users/CreateWalletDialog'
  import UploadBatchDialog from 'src/views/pages/manage-users/UploadBatchDialog'

  // ** Toast
  import toast from 'react-hot-toast'

  // ** Dummy Data
  const dummyWalletData = [
    {
      id: 1,
      dateTime: '2024-01-15 10:30:00',
      walletId: 'WLT123456789',
      nameOnWallet: 'John Doe',
      emailAddress: 'john.doe@example.com',
      status: 'active',
      kycStatus: 'verified',
      balance: 15000,
      currency: 'USD'
    },
    {
      id: 2,
      dateTime: '2024-01-16 14:45:00',
      walletId: 'WLT987654321',
      nameOnWallet: 'Jane Smith',
      emailAddress: 'jane.smith@example.com',
      status: 'active',
      kycStatus: 'pending',
      balance: 25000,
      currency: 'USD'
    },
    {
      id: 3,
      dateTime: '2024-01-18 09:15:00',
      walletId: 'WLT456789123',
      nameOnWallet: 'Robert Johnson',
      emailAddress: 'robert.j@example.com',
      status: 'inactive',
      kycStatus: 'verified',
      balance: 5000,
      currency: 'EUR'
    },
    {
      id: 4,
      dateTime: '2024-01-20 16:20:00',
      walletId: 'WLT789123456',
      nameOnWallet: 'Maria Garcia',
      emailAddress: 'maria.g@example.com',
      status: 'active',
      kycStatus: 'verified',
      balance: 45000,
      currency: 'USD'
    },
    {
      id: 5,
      dateTime: '2024-01-22 11:00:00',
      walletId: 'WLT321654987',
      nameOnWallet: 'David Wilson',
      emailAddress: 'david.w@example.com',
      status: 'suspended',
      kycStatus: 'rejected',
      balance: 0,
      currency: 'GBP'
    },
    {
      id: 6,
      dateTime: '2024-01-25 13:30:00',
      walletId: 'WLT654987321',
      nameOnWallet: 'Sarah Brown',
      emailAddress: 'sarah.b@example.com',
      status: 'active',
      kycStatus: 'verified',
      balance: 32000,
      currency: 'USD'
    },
    {
      id: 7,
      dateTime: '2024-01-28 08:45:00',
      walletId: 'WLT147258369',
      nameOnWallet: 'Michael Lee',
      emailAddress: 'michael.l@example.com',
      status: 'pending',
      kycStatus: 'pending',
      balance: 1000,
      currency: 'USD'
    }
  ]

  const ManageUser = () => {
    // ** States
    const [tableData, setTableData] = useState(dummyWalletData)
    const [openWalletDialog, setOpenWalletDialog] = useState(false)
    const [openUploadDialog, setOpenUploadDialog] = useState(false)
    const [statusFilter, setStatusFilter] = useState('')
    const [kycFilter, setKycFilter] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const [pageSize, setPageSize] = useState(10)

    // ** Helper function to safely convert to lowercase
    const safeToLowerCase = (str) => {
      return str ? str.toString().toLowerCase() : ''
    }

    // ** Helper function to safely get value
    const safeGetValue = (obj, field, defaultValue = '') => {
      return obj && obj[field] ? obj[field] : defaultValue
    }

    // ** Create Wallet Handler
    const handleCreateWallet = () => {
      const newWallet = {
        id: tableData.length + 1,
        dateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
        walletId: `WLT${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
        ...walletData,
        status: 'pending',
        kycStatus: 'pending'
      }
      setTableData(prev => [newWallet, ...prev])
      // toast.success('✅ Wallet created successfully!')
      setOpenWalletDialog(false)
    }

    // ** Batch Upload Handler
    const handleBatchUpload = (file) => {
      // Simulate file upload
      setTimeout(() => {
        const mockUploadedWallets = [
          {
            id: tableData.length + 1,
            dateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
            walletId: `WLT${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
            nameOnWallet: 'Batch User 1',
            emailAddress: 'batch1@example.com',
            status: 'active',
            kycStatus: 'pending',
            balance: 1000,
            currency: 'USD'
          },
          {
            id: tableData.length + 2,
            dateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
            walletId: `WLT${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
            nameOnWallet: 'Batch User 2',
            emailAddress: 'batch2@example.com',
            status: 'active',
            kycStatus: 'pending',
            balance: 2000,
            currency: 'USD'
          }
        ]
        setTableData(prev => [...mockUploadedWallets, ...prev])
        toast.success(`📤 ${mockUploadedWallets.length} wallets uploaded successfully!`)
        setOpenUploadDialog(false)
      }, 2000)
    }

    // ** Toggle Wallet Status
    const handleToggleStatus = (walletId) => {
      const updatedData = tableData.map(item =>
        item.id === walletId ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' } : item
      )
      setTableData(updatedData)
      const wallet = updatedData.find(w => w.id === walletId)
      toast.success(`🔄 Wallet ${wallet?.status === 'active' ? 'activated' : 'deactivated'} successfully!`)
    }

    // ** View Wallet Handler
    const handleViewWallet = (wallet) => {
      toast.success(`👁️ Viewing wallet: ${wallet?.walletId || 'Unknown'}`)
    }

    // ** Download Template Handler
    const handleDownloadTemplate = () => {
      const csvContent =
        'Name on Wallet,Email Address,Currency,Initial Balance\nJohn Doe,john@example.com,USD,1000\nJane Smith,jane@example.com,USD,2000'
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'wallet_batch_template.csv'
      link.click()
      URL.revokeObjectURL(url)
      toast.success('📥 Template downloaded successfully!')
    }

    // ** Filtered Data with proper null checks
    const filteredData = tableData.filter(row => {
      // Safely get values with null checks
      const rowStatus = safeGetValue(row, 'status', '')
      const rowKycStatus = safeGetValue(row, 'kycStatus', '')
      const rowWalletId = safeGetValue(row, 'walletId', '')
      const rowNameOnWallet = safeGetValue(row, 'nameOnWallet', '')
      const rowEmailAddress = safeGetValue(row, 'emailAddress', '')
      
      // Status filter
      const matchesStatus = statusFilter ? rowStatus === statusFilter : true
      
      // KYC filter
      const matchesKyc = kycFilter ? rowKycStatus === kycFilter : true
      
      // Search filter with safe toLowerCase
      const matchesSearch = searchValue
        ? safeToLowerCase(rowWalletId).includes(safeToLowerCase(searchValue)) ||
          safeToLowerCase(rowNameOnWallet).includes(safeToLowerCase(searchValue)) ||
          safeToLowerCase(rowEmailAddress).includes(safeToLowerCase(searchValue))
        : true
      
      return matchesStatus && matchesKyc && matchesSearch
    })

    return (
      <>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <WalletHeader
              onCreateWallet={() => setOpenWalletDialog(true)}
              onUploadBatch={() => setOpenUploadDialog(true)}
              onDownloadTemplate={handleDownloadTemplate}
            />
          </Grid>

          <Grid item xs={12}>
            <WalletFilters
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              kycFilter={kycFilter}
              onKycChange={setKycFilter}
            />
          </Grid>

          <Grid item xs={12}>
            <WalletsTable
              data={filteredData}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
              onView={handleViewWallet}
              onToggleStatus={handleToggleStatus}
            />
          </Grid>
        </Grid>

        <CreateWalletDialog
          open={openWalletDialog}
          onClose={() => setOpenWalletDialog(false)}
          onSubmit={handleCreateWallet}
        />

        <UploadBatchDialog
          open={openUploadDialog}
          onClose={() => setOpenUploadDialog(false)}
          onUpload={handleBatchUpload}
        />
      </>
    )
  }

  export default ManageUser