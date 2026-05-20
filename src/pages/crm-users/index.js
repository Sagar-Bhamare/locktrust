// import React, { useState } from 'react'

// // ** MUI Imports
// import Box from '@mui/material/Box'
// import Card from '@mui/material/Card'
// import Grid from '@mui/material/Grid'
// import Chip from '@mui/material/Chip'
// import TextField from '@mui/material/TextField'
// import CardHeader from '@mui/material/CardHeader'
// import InputLabel from '@mui/material/InputLabel'
// import FormControl from '@mui/material/FormControl'
// import Select from '@mui/material/Select'
// import MenuItem from '@mui/material/MenuItem'
// import { DataGrid } from '@mui/x-data-grid'
// import Typography from '@mui/material/Typography'
// import IconButton from '@mui/material/IconButton'
// import Tooltip from '@mui/material/Tooltip'
// import Menu from '@mui/material/Menu'
// import Button from '@mui/material/Button'
// import Dialog from '@mui/material/Dialog'
// import DialogTitle from '@mui/material/DialogTitle'
// import DialogContent from '@mui/material/DialogContent'
// import DialogActions from '@mui/material/DialogActions'
// import Avatar from '@mui/material/Avatar'

// // ** Icon Imports
// import Icon from 'src/@core/components/icon'

// // ** Custom Components
// import CustomAvatar from 'src/@core/components/mui/avatar'

// // ** Toast
// import toast from 'react-hot-toast'

// // ** Dummy Data
// const dummyCrmData = [
//   {
//     id: 1,
//     srNo: 1,
//     walletId: 'WLT123456789',
//     username: 'john_doe',
//     fullName: 'John Doe',
//     email: 'john@example.com',
//     crmName: 'Salesforce',
//     subscriptionName: 'Enterprise Pro',
//     addonName: 'Advanced Analytics',
//     status: 'active',
//     subscriptionStatus: 'active',
//     joinDate: '2024-01-15'
//   },
//   {
//     id: 2,
//     srNo: 2,
//     walletId: 'WLT987654321',
//     username: 'jane_smith',
//     fullName: 'Jane Smith',
//     email: 'jane@example.com',
//     crmName: 'HubSpot',
//     subscriptionName: 'Business Plus',
//     addonName: 'API Access, Premium Support',
//     status: 'active',
//     subscriptionStatus: 'active',
//     joinDate: '2024-01-16'
//   },
//   {
//     id: 3,
//     srNo: 3,
//     walletId: 'WLT456789123',
//     username: 'robert_j',
//     fullName: 'Robert Johnson',
//     email: 'robert@example.com',
//     crmName: 'Zoho CRM',
//     subscriptionName: 'Standard',
//     addonName: 'Storage Upgrade',
//     status: 'inactive',
//     subscriptionStatus: 'expired',
//     joinDate: '2024-01-18'
//   },
//   {
//     id: 4,
//     srNo: 4,
//     walletId: 'WLT789123456',
//     username: 'maria_g',
//     fullName: 'Maria Garcia',
//     email: 'maria@example.com',
//     crmName: 'Salesforce',
//     subscriptionName: 'Basic',
//     addonName: 'None',
//     status: 'active',
//     subscriptionStatus: 'active',
//     joinDate: '2024-01-20'
//   },
//   {
//     id: 5,
//     srNo: 5,
//     walletId: 'WLT321654987',
//     username: 'david_w',
//     fullName: 'David Wilson',
//     email: 'david@example.com',
//     crmName: 'Pipedrive',
//     subscriptionName: 'Professional',
//     addonName: 'Lead Booster',
//     status: 'suspended',
//     subscriptionStatus: 'pending',
//     joinDate: '2024-01-22'
//   },
//   {
//     id: 6,
//     srNo: 6,
//     walletId: 'WLT654987321',
//     username: 'sarah_b',
//     fullName: 'Sarah Brown',
//     email: 'sarah@example.com',
//     crmName: 'HubSpot',
//     subscriptionName: 'Enterprise',
//     addonName: 'Marketing Hub, Sales Hub',
//     status: 'active',
//     subscriptionStatus: 'active',
//     joinDate: '2024-01-25'
//   },
//   {
//     id: 7,
//     srNo: 7,
//     walletId: 'WLT147258369',
//     username: 'michael_l',
//     fullName: 'Michael Lee',
//     email: 'michael@example.com',
//     crmName: 'Zoho CRM',
//     subscriptionName: 'Ultimate',
//     addonName: 'AI Assistant',
//     status: 'pending',
//     subscriptionStatus: 'pending',
//     joinDate: '2024-01-28'
//   },
//   {
//     id: 8,
//     srNo: 8,
//     walletId: 'WLT963852741',
//     username: 'emily_c',
//     fullName: 'Emily Clark',
//     email: 'emily@example.com',
//     crmName: 'Salesforce',
//     subscriptionName: 'Unlimited',
//     addonName: 'Einstein Analytics',
//     status: 'active',
//     subscriptionStatus: 'active',
//     joinDate: '2024-02-01'
//   },
//   {
//     id: 9,
//     srNo: 9,
//     walletId: 'WLT741852963',
//     username: 'chris_t',
//     fullName: 'Chris Turner',
//     email: 'chris@example.com',
//     crmName: 'Pipedrive',
//     subscriptionName: 'Essential',
//     addonName: 'Smart Email BCC',
//     status: 'inactive',
//     subscriptionStatus: 'cancelled',
//     joinDate: '2024-02-05'
//   },
//   {
//     id: 10,
//     srNo: 10,
//     walletId: 'WLT159357486',
//     username: 'lisa_m',
//     fullName: 'Lisa Martinez',
//     email: 'lisa@example.com',
//     crmName: 'HubSpot',
//     subscriptionName: 'Starter',
//     addonName: 'Chatbot Integration',
//     status: 'active',
//     subscriptionStatus: 'active',
//     joinDate: '2024-02-10'
//   },
//   {
//     id: 11,
//     srNo: 11,
//     walletId: 'WLT357159486',
//     username: 'kevin_r',
//     fullName: 'Kevin Rodriguez',
//     email: 'kevin@example.com',
//     crmName: 'Zoho CRM',
//     subscriptionName: 'Professional',
//     addonName: 'Webinar Integration',
//     status: 'active',
//     subscriptionStatus: 'active',
//     joinDate: '2024-02-12'
//   },
//   {
//     id: 12,
//     srNo: 12,
//     walletId: 'WLT486753159',
//     username: 'amanda_w',
//     fullName: 'Amanda White',
//     email: 'amanda@example.com',
//     crmName: 'Salesforce',
//     subscriptionName: 'Enterprise Pro',
//     addonName: 'Advanced Reporting',
//     status: 'pending',
//     subscriptionStatus: 'pending',
//     joinDate: '2024-02-15'
//   }
// ]

// const Crm = () => {
//   // ** States
//   const [tableData, setTableData] = useState(dummyCrmData)
//   const [searchValue, setSearchValue] = useState('')
//   const [crmFilter, setCrmFilter] = useState('')
//   const [statusFilter, setStatusFilter] = useState('')
//   const [pageSize, setPageSize] = useState(10)
//   const [selectedUser, setSelectedUser] = useState(null)
//   const [viewDialogOpen, setViewDialogOpen] = useState(false)
//   const [actionAnchorEl, setActionAnchorEl] = useState(null)

//   // ** Get unique CRM names for filter
//   const crmNames = [...new Set(tableData.map(item => item.crmName))]

//   // ** Filter Data
//   const filteredData = tableData.filter(row => {
//     const matchesSearch = searchValue
//       ? row.walletId.toLowerCase().includes(searchValue.toLowerCase()) ||
//         row.username.toLowerCase().includes(searchValue.toLowerCase()) ||
//         row.fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
//         row.email.toLowerCase().includes(searchValue.toLowerCase())
//       : true

//     const matchesCrm = crmFilter ? row.crmName === crmFilter : true
//     const matchesStatus = statusFilter ? row.status === statusFilter : true

//     return matchesSearch && matchesCrm && matchesStatus
//   })

//   // ** Handle View User
//   const handleViewUser = user => {
//     setSelectedUser(user)
//     setViewDialogOpen(true)
//     setActionAnchorEl(null)
//     toast.success(`Viewing user: ${user.username}`)
//   }

//   // ** Handle Edit User
//   const handleEditUser = user => {
//     setActionAnchorEl(null)
//     toast.success(`Edit user: ${user.username}`)
//   }

//   // ** Handle Delete User
//   const handleDeleteUser = user => {
//     setActionAnchorEl(null)
//     setTableData(prev => prev.filter(item => item.id !== user.id))
//     toast.success(`User ${user.username} deleted successfully!`)
//   }

//   // ** Handle Suspend/Activate User
//   const handleToggleStatus = user => {
//     const updatedData = tableData.map(item =>
//       item.id === user.id ? { ...item, status: item.status === 'active' ? 'suspended' : 'active' } : item
//     )
//     setTableData(updatedData)
//     const newStatus = user.status === 'active' ? 'suspended' : 'active'
//     toast.success(`User ${user.username} has been ${newStatus}!`)
//     setActionAnchorEl(null)
//   }

//   // ** Handle Action Menu
//   const handleActionClick = (event, user) => {
//     setActionAnchorEl(event.currentTarget)
//     setSelectedUser(user)
//   }

//   const handleActionClose = () => {
//     setActionAnchorEl(null)
//   }

//   // ** Get Status Color
//   const getStatusColor = status => {
//     const statusColors = {
//       active: 'success',
//       inactive: 'default',
//       suspended: 'error',
//       pending: 'warning'
//     }
//     return statusColors[status] || 'default'
//   }

//   // ** Get Subscription Status Color
//   const getSubscriptionColor = status => {
//     const statusColors = {
//       active: 'success',
//       expired: 'error',
//       pending: 'warning',
//       cancelled: 'default'
//     }
//     return statusColors[status] || 'default'
//   }

//   // ** Table Columns
//   const columns = [
//     {
//       flex: 0.05,
//       minWidth: 70,
//       field: 'srNo',
//       headerName: 'Sr. No',
//       renderCell: ({ row }) => (
//         <Typography variant='body2' sx={{ fontWeight: 500 }}>
//           {row.srNo}
//         </Typography>
//       )
//     },
//     {
//       flex: 0.12,
//       minWidth: 130,
//       field: 'walletId',
//       headerName: 'Wallet ID',
//       renderCell: ({ row }) => (
//         <Tooltip title={row.walletId}>
//           <Typography variant='body2' sx={{ fontWeight: 500, cursor: 'pointer' }}>
//             {row.walletId.slice(0, 8)}...
//           </Typography>
//         </Tooltip>
//       )
//     },
//     {
//       flex: 0.12,
//       minWidth: 150,
//       field: 'username',
//       headerName: 'Username',
//       renderCell: ({ row }) => (
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <CustomAvatar skin='light' sx={{ mr: 2, width: 30, height: 30 }}>
//             {row.username.charAt(0).toUpperCase()}
//           </CustomAvatar>
//           <Box>
//             <Typography variant='body2' sx={{ fontWeight: 500 }}>
//               {row.username}
//             </Typography>
//             <Typography variant='caption' sx={{ color: 'text.disabled' }}>
//               {row.fullName}
//             </Typography>
//           </Box>
//         </Box>
//       )
//     },
//     {
//       flex: 0.12,
//       minWidth: 140,
//       field: 'crmName',
//       headerName: 'CRM Name',
//       renderCell: ({ row }) => (
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <Avatar sx={{ width: 28, height: 28, mr: 1.5, bgcolor: 'primary.main' }}>{row.crmName.charAt(0)}</Avatar>
//           <Typography variant='body2'>{row.crmName}</Typography>
//         </Box>
//       )
//     },
//     {
//       flex: 0.15,
//       minWidth: 180,
//       field: 'subscriptionName',
//       headerName: 'Subscription Name',
//       renderCell: ({ row }) => (
//         <Box>
//           <Typography variant='body2' sx={{ fontWeight: 500 }}>
//             {row.subscriptionName}
//           </Typography>
//           <Chip
//             label={row.subscriptionStatus}
//             color={getSubscriptionColor(row.subscriptionStatus)}
//             size='small'
//             sx={{ mt: 0.5, fontSize: '0.7rem' }}
//           />
//         </Box>
//       )
//     },
//     {
//       flex: 0.18,
//       minWidth: 200,
//       field: 'addonName',
//       headerName: 'Addon Name',
//       renderCell: ({ row }) => (
//         <Box>
//           {row.addonName.split(',').map((addon, index) => (
//             <Chip
//               key={index}
//               label={addon.trim()}
//               size='small'
//               variant='outlined'
//               sx={{ mr: 0.5, mb: 0.5, fontSize: '0.7rem' }}
//             />
//           ))}
//         </Box>
//       )
//     },
//     {
//       flex: 0.08,
//       minWidth: 100,
//       field: 'status',
//       headerName: 'Status',
//       renderCell: ({ row }) => (
//         <Chip label={row.status} color={getStatusColor(row.status)} size='small' sx={{ textTransform: 'capitalize' }} />
//       )
//     },
//     {
//       flex: 0.08,
//       minWidth: 100,
//       field: 'actions',
//       headerName: 'Actions',
//       sortable: false,
//       renderCell: ({ row }) => (
//         <Box>
//           <Tooltip title='View Details'>
//             <IconButton size='small' onClick={() => handleViewUser(row)} sx={{ mr: 1 }}>
//               <Icon icon='tabler:eye' fontSize={20} />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title='More Actions'>
//             <IconButton size='small' onClick={e => handleActionClick(e, row)}>
//               <Icon icon='tabler:dots-vertical' fontSize={20} />
//             </IconButton>
//           </Tooltip>
//         </Box>
//       )
//     }
//   ]

//   return (
//     <>
//       <Grid container spacing={6}>
//         {/* Header Section */}
//         <Grid item xs={12}>
//           <Card>
//             <CardHeader
//               title='CRM Users Management'
//               subheader='Manage and monitor all CRM user subscriptions and addons'
//             />
//           </Card>
//         </Grid>

//         {/* Filters Section */}
//         <Grid item xs={12}>
//           <Card>
//             <CardHeader title='Filters' />
//             <Box sx={{ p: 5, pt: 0 }}>
//               <Grid container spacing={4}>
//                 <Grid item xs={12} sm={4}>
//                   <TextField
//                     fullWidth
//                     size='small'
//                     placeholder='Search by Wallet ID, Username or Email'
//                     value={searchValue}
//                     onChange={e => setSearchValue(e.target.value)}
//                     InputProps={{
//                       startAdornment: <Icon icon='tabler:search' fontSize={20} style={{ marginRight: 8 }} />
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={4}>
//                   <FormControl fullWidth size='small'>
//                     <InputLabel>CRM Name</InputLabel>
//                     <Select value={crmFilter} label='CRM Name' onChange={e => setCrmFilter(e.target.value)}>
//                       <MenuItem value=''>All CRMs</MenuItem>
//                       {crmNames.map(crm => (
//                         <MenuItem key={crm} value={crm}>
//                           {crm}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={4}>
//                   <FormControl fullWidth size='small'>
//                     <InputLabel>Status</InputLabel>
//                     <Select value={statusFilter} label='Status' onChange={e => setStatusFilter(e.target.value)}>
//                       <MenuItem value=''>All</MenuItem>
//                       <MenuItem value='active'>Active</MenuItem>
//                       <MenuItem value='inactive'>Inactive</MenuItem>
//                       <MenuItem value='suspended'>Suspended</MenuItem>
//                       <MenuItem value='pending'>Pending</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Card>
//         </Grid>

//         {/* Table Section */}
//         <Grid item xs={12}>
//           <Card>
//             <DataGrid
//               autoHeight
//               rows={filteredData}
//               columns={columns}
//               pageSize={pageSize}
//               rowsPerPageOptions={[10, 25, 50, 100]}
//               onPageSizeChange={setPageSize}
//               disableSelectionOnClick
//               sx={{
//                 '& .MuiDataGrid-columnHeaders': {
//                   backgroundColor: theme => theme.palette.action.hover,
//                   fontWeight: 600
//                 },
//                 '& .MuiDataGrid-cell': {
//                   py: 2
//                 }
//               }}
//             />
//           </Card>
//         </Grid>
//       </Grid>

//       {/* View User Details Dialog */}
//       <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth='sm' fullWidth>
//         <DialogTitle>
//           <Box display='flex' justifyContent='space-between' alignItems='center'>
//             User Details
//             <IconButton onClick={() => setViewDialogOpen(false)}>
//               <Icon icon='tabler:x' />
//             </IconButton>
//           </Box>
//         </DialogTitle>
//         <DialogContent>
//           {selectedUser && (
//             <Box sx={{ mt: 2 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//                 <CustomAvatar skin='light' sx={{ width: 60, height: 60, fontSize: '2rem', mr: 3 }}>
//                   {selectedUser.username.charAt(0).toUpperCase()}
//                 </CustomAvatar>
//                 <Box>
//                   <Typography variant='h6'>{selectedUser.fullName}</Typography>
//                   <Typography variant='body2' color='text.secondary'>
//                     @{selectedUser.username}
//                   </Typography>
//                 </Box>
//               </Box>

//               <Grid container spacing={3}>
//                 <Grid item xs={6}>
//                   <Typography variant='caption' color='text.secondary'>
//                     Wallet ID
//                   </Typography>
//                   <Typography variant='body2' sx={{ fontWeight: 500 }}>
//                     {selectedUser.walletId}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography variant='caption' color='text.secondary'>
//                     Email Address
//                   </Typography>
//                   <Typography variant='body2'>{selectedUser.email}</Typography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography variant='caption' color='text.secondary'>
//                     CRM Name
//                   </Typography>
//                   <Typography variant='body2'>{selectedUser.crmName}</Typography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography variant='caption' color='text.secondary'>
//                     Subscription
//                   </Typography>
//                   <Typography variant='body2'>{selectedUser.subscriptionName}</Typography>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography variant='caption' color='text.secondary'>
//                     Addon Name
//                   </Typography>
//                   <Typography variant='body2'>{selectedUser.addonName}</Typography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography variant='caption' color='text.secondary'>
//                     Status
//                   </Typography>
//                   <Chip label={selectedUser.status} color={getStatusColor(selectedUser.status)} size='small' />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography variant='caption' color='text.secondary'>
//                     Subscription Status
//                   </Typography>
//                   <Chip
//                     label={selectedUser.subscriptionStatus}
//                     color={getSubscriptionColor(selectedUser.subscriptionStatus)}
//                     size='small'
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography variant='caption' color='text.secondary'>
//                     Join Date
//                   </Typography>
//                   <Typography variant='body2'>{selectedUser.joinDate}</Typography>
//                 </Grid>
//               </Grid>
//             </Box>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setViewDialogOpen(false)} color='secondary'>
//             Close
//           </Button>
//           <Button
//             onClick={() => {
//               setViewDialogOpen(false)
//               handleEditUser(selectedUser)
//             }}
//             variant='contained'
//           >
//             Edit User
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Action Menu */}
//       <Menu
//         anchorEl={actionAnchorEl}
//         open={Boolean(actionAnchorEl)}
//         onClose={handleActionClose}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//         PaperProps={{ style: { minWidth: '8rem' } }}
//       >
//         <MenuItem onClick={() => handleEditUser(selectedUser)} sx={{ '& svg': { mr: 2 } }}>
//           <Icon icon='tabler:edit' fontSize={20} />
//           Edit
//         </MenuItem>
//         <MenuItem onClick={() => handleToggleStatus(selectedUser)} sx={{ '& svg': { mr: 2 } }}>
//           <Icon icon={selectedUser?.status === 'active' ? 'tabler:user-x' : 'tabler:user-check'} fontSize={20} />
//           {selectedUser?.status === 'active' ? 'Suspend' : 'Activate'}
//         </MenuItem>
//         <MenuItem onClick={() => handleDeleteUser(selectedUser)} sx={{ '& svg': { mr: 2 } }}>
//           <Icon icon='tabler:trash' fontSize={20} />
//           Delete
//         </MenuItem>
//       </Menu>
//     </>
//   )
// }

// export default Crm

import React, { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Components
import CrmHeader from 'src/views/pages/crm-users/CrmHeader'
import CrmFilters from 'src/views/pages/crm-users/CrmFilters'
import CrmTable from 'src/views/pages/crm-users/CrmTable'
import ViewUserDialog from 'src/views/pages/crm-users/ViewUserDialog'

// ** Toast
import toast from 'react-hot-toast'

// ** Dummy Data
const initialDummyData = [
  {
    id: 1,
    srNo: 1,
    walletId: 'WLT123456789',
    username: 'john_doe',
    fullName: 'John Doe',
    email: 'john@example.com',
    crmName: 'Salesforce',
    subscriptionName: 'Enterprise Pro',
    addonName: 'Advanced Analytics',
    status: 'active',
    subscriptionStatus: 'active',
    joinDate: '2024-01-15'
  },
  {
    id: 2,
    srNo: 2,
    walletId: 'WLT987654321',
    username: 'jane_smith',
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    crmName: 'HubSpot',
    subscriptionName: 'Business Plus',
    addonName: 'API Access, Premium Support',
    status: 'active',
    subscriptionStatus: 'active',
    joinDate: '2024-01-16'
  },
  {
    id: 3,
    srNo: 3,
    walletId: 'WLT456789123',
    username: 'robert_j',
    fullName: 'Robert Johnson',
    email: 'robert@example.com',
    crmName: 'Zoho CRM',
    subscriptionName: 'Standard',
    addonName: 'Storage Upgrade',
    status: 'inactive',
    subscriptionStatus: 'expired',
    joinDate: '2024-01-18'
  },
  {
    id: 4,
    srNo: 4,
    walletId: 'WLT789123456',
    username: 'maria_g',
    fullName: 'Maria Garcia',
    email: 'maria@example.com',
    crmName: 'Salesforce',
    subscriptionName: 'Basic',
    addonName: 'None',
    status: 'active',
    subscriptionStatus: 'active',
    joinDate: '2024-01-20'
  },
  {
    id: 5,
    srNo: 5,
    walletId: 'WLT321654987',
    username: 'david_w',
    fullName: 'David Wilson',
    email: 'david@example.com',
    crmName: 'Pipedrive',
    subscriptionName: 'Professional',
    addonName: 'Lead Booster',
    status: 'suspended',
    subscriptionStatus: 'pending',
    joinDate: '2024-01-22'
  },
  {
    id: 6,
    srNo: 6,
    walletId: 'WLT654987321',
    username: 'sarah_b',
    fullName: 'Sarah Brown',
    email: 'sarah@example.com',
    crmName: 'HubSpot',
    subscriptionName: 'Enterprise',
    addonName: 'Marketing Hub, Sales Hub',
    status: 'active',
    subscriptionStatus: 'active',
    joinDate: '2024-01-25'
  },
  {
    id: 7,
    srNo: 7,
    walletId: 'WLT147258369',
    username: 'michael_l',
    fullName: 'Michael Lee',
    email: 'michael@example.com',
    crmName: 'Zoho CRM',
    subscriptionName: 'Ultimate',
    addonName: 'AI Assistant',
    status: 'pending',
    subscriptionStatus: 'pending',
    joinDate: '2024-01-28'
  },
  {
    id: 8,
    srNo: 8,
    walletId: 'WLT963852741',
    username: 'emily_c',
    fullName: 'Emily Clark',
    email: 'emily@example.com',
    crmName: 'Salesforce',
    subscriptionName: 'Unlimited',
    addonName: 'Einstein Analytics',
    status: 'active',
    subscriptionStatus: 'active',
    joinDate: '2024-02-01'
  },
  {
    id: 9,
    srNo: 9,
    walletId: 'WLT741852963',
    username: 'chris_t',
    fullName: 'Chris Turner',
    email: 'chris@example.com',
    crmName: 'Pipedrive',
    subscriptionName: 'Essential',
    addonName: 'Smart Email BCC',
    status: 'inactive',
    subscriptionStatus: 'cancelled',
    joinDate: '2024-02-05'
  },
  {
    id: 10,
    srNo: 10,
    walletId: 'WLT159357486',
    username: 'lisa_m',
    fullName: 'Lisa Martinez',
    email: 'lisa@example.com',
    crmName: 'HubSpot',
    subscriptionName: 'Starter',
    addonName: 'Chatbot Integration',
    status: 'active',
    subscriptionStatus: 'active',
    joinDate: '2024-02-10'
  },
  {
    id: 11,
    srNo: 11,
    walletId: 'WLT357159486',
    username: 'kevin_r',
    fullName: 'Kevin Rodriguez',
    email: 'kevin@example.com',
    crmName: 'Zoho CRM',
    subscriptionName: 'Professional',
    addonName: 'Webinar Integration',
    status: 'active',
    subscriptionStatus: 'active',
    joinDate: '2024-02-12'
  },
  {
    id: 12,
    srNo: 12,
    walletId: 'WLT486753159',
    username: 'amanda_w',
    fullName: 'Amanda White',
    email: 'amanda@example.com',
    crmName: 'Salesforce',
    subscriptionName: 'Enterprise Pro',
    addonName: 'Advanced Reporting',
    status: 'pending',
    subscriptionStatus: 'pending',
    joinDate: '2024-02-15'
  }
]

const Crm = () => {
  // ** States
  const [tableData, setTableData] = useState(initialDummyData)
  const [searchValue, setSearchValue] = useState('')
  const [crmFilter, setCrmFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [selectedUser, setSelectedUser] = useState(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)

  // ** Get unique CRM names for filter
  const crmNames = [...new Set(tableData.map(item => item.crmName))]

  // ** Filter Data
  const filteredData = tableData.filter(row => {
    const matchesSearch = searchValue
      ? row.walletId.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.username.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.email.toLowerCase().includes(searchValue.toLowerCase())
      : true

    const matchesCrm = crmFilter ? row.crmName === crmFilter : true
    const matchesStatus = statusFilter ? row.status === statusFilter : true

    return matchesSearch && matchesCrm && matchesStatus
  })

  // ** Reset to Demo Data
  const handleResetData = () => {
    setTableData(initialDummyData)
    setSearchValue('')
    setCrmFilter('')
    setStatusFilter('')
    toast.success('Data reset to demo users successfully!')
  }

  // ** Handle View User
  const handleViewUser = user => {
    setSelectedUser(user)
    setViewDialogOpen(true)
  }

  // ** Handle Edit User
  const handleEditUser = user => {
    toast.success(`Edit user: ${user.username}`)
  }

  // ** Handle Delete User
  const handleDeleteUser = user => {
    setTableData(prev => prev.filter(item => item.id !== user.id))
    toast.success(`User ${user.username} deleted successfully!`)
  }

  // ** Handle Suspend/Activate User
  const handleToggleStatus = user => {
    const updatedData = tableData.map(item =>
      item.id === user.id ? { ...item, status: item.status === 'active' ? 'suspended' : 'active' } : item
    )
    setTableData(updatedData)
    const newStatus = user.status === 'active' ? 'suspended' : 'active'
    toast.success(`User ${user.username} has been ${newStatus}!`)
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CrmHeader onResetData={handleResetData} />
        </Grid>

        <Grid item xs={12}>
          <CrmFilters
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            crmFilter={crmFilter}
            onCrmChange={setCrmFilter}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            crmNames={crmNames}
          />
        </Grid>

        <Grid item xs={12}>
          <CrmTable
            data={filteredData}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
            onView={handleViewUser}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onToggleStatus={handleToggleStatus}
          />
        </Grid>
      </Grid>

      <ViewUserDialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        user={selectedUser}
        onEdit={handleEditUser}
      />
    </>
  )
}

export default Crm
