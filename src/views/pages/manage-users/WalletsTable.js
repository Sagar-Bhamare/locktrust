import React from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar'

const WalletsTable = ({ data, pageSize, onPageSizeChange, onToggleStatus }) => {
  const router = useRouter()

  // ** Get Status Color
  const getStatusColor = (status) => {
    const statusColors = {
      active: 'success',
      inactive: 'default',
      suspended: 'error',
      pending: 'warning'
    }
    return statusColors[status] || 'default'
  }

  // ** Get KYC Status Color
  const getKycStatusColor = (status) => {
    const kycColors = {
      verified: 'success',
      pending: 'warning',
      rejected: 'error',
      not_submitted: 'default'
    }
    return kycColors[status] || 'default'
  }

  // ** Handle View Details - Store data in localStorage and navigate
  const handleViewDetails = (user) => {
    console.log('========================================');
    console.log('🔍 CLICKED ON VIEW DETAILS (EYE ICON)');
    console.log('========================================');
    console.log('📦 User Data being passed:', user);
    
    // Store user data in localStorage (persists after refresh)
    localStorage.setItem('viewUserData', JSON.stringify(user));
    console.log('💾 User data saved to localStorage');
    
    // Navigate to view page
    router.push('/manage-users/view-users');
    console.log('🚀 Navigating to: /manage-users/view-users');
    console.log('========================================');
  }

  const columns = [
    {
      flex: 0.15,
      minWidth: 160,
      field: 'dateTime',
      headerName: 'Date & Time',
      renderCell: ({ row }) => (
        <Typography variant='body2'>{row.dateTime}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 130,
      field: 'walletId',
      headerName: 'Wallet ID',
      renderCell: ({ row }) => (
        <Tooltip title={row.walletId}>
          <Typography variant='body2' sx={{ fontWeight: 500, cursor: 'pointer' }}>
            {row.walletId?.slice(0, 8)}...
          </Typography>
        </Tooltip>
      )
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'nameOnWallet',
      headerName: 'Name on Wallet',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomAvatar skin='light' sx={{ mr: 2, width: 30, height: 30 }}>
            {row.nameOnWallet?.charAt(0) || 'U'}
          </CustomAvatar>
          <Typography variant='body2'>{row.nameOnWallet}</Typography>
        </Box>
      )
    },
    {
      flex: 0.15,
      minWidth: 180,
      field: 'emailAddress',
      headerName: 'Email Address',
      renderCell: ({ row }) => (
        <Typography variant='body2'>{row.emailAddress}</Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => (
        <Chip
          label={row.status}
          color={getStatusColor(row.status)}
          size='small'
          sx={{ textTransform: 'capitalize' }}
        />
      )
    },
    {
      flex: 0.12,
      minWidth: 120,
      field: 'kycStatus',
      headerName: 'KYC Status',
      renderCell: ({ row }) => (
        <Chip
          label={row.kycStatus}
          color={getKycStatusColor(row.kycStatus)}
          size='small'
          sx={{ textTransform: 'capitalize' }}
        />
      )
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'action',
      headerName: 'Action',
      renderCell: ({ row }) => (
        <Box>
          <Tooltip title="View Details">
            <IconButton size='small' onClick={() => {
              console.log('👆 Eye icon clicked for row:', row);
              handleViewDetails(row);
            }} sx={{ mr: 1 }}>
              <Icon icon='tabler:eye' fontSize={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title={row.status === 'active' ? 'Deactivate' : 'Activate'}>
            <IconButton size='small' onClick={() => onToggleStatus(row.id)}>
              <Icon icon={row.status === 'active' ? 'tabler:user-x' : 'tabler:user-check'} fontSize={20} />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  return (
    <Card>
      <DataGrid
        autoHeight
        rows={data}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[10, 25, 50]}
        onPageSizeChange={onPageSizeChange}
        disableSelectionOnClick
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme => theme.palette.action.hover
          }
        }}
      />
    </Card>
  )
}

export default WalletsTable