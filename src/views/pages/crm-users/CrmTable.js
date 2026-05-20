import React, { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { DataGrid } from '@mui/x-data-grid'
import Avatar from '@mui/material/Avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar'

const CrmTable = ({ data, pageSize, onPageSizeChange, onView, onEdit, onDelete, onToggleStatus }) => {
  const [actionAnchorEl, setActionAnchorEl] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)

  // ** Get Status Color
  const getStatusColor = status => {
    const statusColors = {
      active: 'success',
      inactive: 'default',
      suspended: 'error',
      pending: 'warning'
    }
    return statusColors[status] || 'default'
  }

  // ** Get Subscription Status Color
  const getSubscriptionColor = status => {
    const statusColors = {
      active: 'success',
      expired: 'error',
      pending: 'warning',
      cancelled: 'default'
    }
    return statusColors[status] || 'default'
  }

  // ** Handle Action Menu
  const handleActionClick = (event, user) => {
    setActionAnchorEl(event.currentTarget)
    setSelectedUser(user)
  }

  const handleActionClose = () => {
    setActionAnchorEl(null)
  }

  const handleEdit = () => {
    onEdit(selectedUser)
    handleActionClose()
  }

  const handleDelete = () => {
    onDelete(selectedUser)
    handleActionClose()
  }

  const handleToggleStatus = () => {
    onToggleStatus(selectedUser)
    handleActionClose()
  }

  const columns = [
    {
      flex: 0.05,
      minWidth: 70,
      field: 'srNo',
      headerName: 'Sr. No',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ fontWeight: 500 }}>
          {row.srNo}
        </Typography>
      )
    },
    {
      flex: 0.12,
      minWidth: 130,
      field: 'walletId',
      headerName: 'Wallet ID',
      renderCell: ({ row }) => (
        <Tooltip title={row.walletId}>
          <Typography variant='body2' sx={{ fontWeight: 500, cursor: 'pointer' }}>
            {row.walletId.slice(0, 8)}...
          </Typography>
        </Tooltip>
      )
    },
    {
      flex: 0.12,
      minWidth: 150,
      field: 'username',
      headerName: 'Username',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomAvatar skin='light' sx={{ mr: 2, width: 30, height: 30 }}>
            {row.username.charAt(0).toUpperCase()}
          </CustomAvatar>
          <Box>
            <Typography variant='body2' sx={{ fontWeight: 500 }}>
              {row.username}
            </Typography>
            <Typography variant='caption' sx={{ color: 'text.disabled' }}>
              {row.fullName}
            </Typography>
          </Box>
        </Box>
      )
    },
    {
      flex: 0.12,
      minWidth: 140,
      field: 'crmName',
      headerName: 'CRM Name',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ width: 28, height: 28, mr: 1.5, bgcolor: 'primary.main' }}>{row.crmName.charAt(0)}</Avatar>
          <Typography variant='body2'>{row.crmName}</Typography>
        </Box>
      )
    },
    {
      flex: 0.15,
      minWidth: 180,
      field: 'subscriptionName',
      headerName: 'Subscription Name',
      renderCell: ({ row }) => (
        <Box>
          <Typography variant='body2' sx={{ fontWeight: 500 }}>
            {row.subscriptionName}
          </Typography>
          <Chip
            label={row.subscriptionStatus}
            color={getSubscriptionColor(row.subscriptionStatus)}
            size='small'
            sx={{ mt: 0.5, fontSize: '0.7rem' }}
          />
        </Box>
      )
    },
    {
      flex: 0.18,
      minWidth: 200,
      field: 'addonName',
      headerName: 'Addon Name',
      renderCell: ({ row }) => (
        <Box>
          {row.addonName.split(',').map((addon, index) => (
            <Chip
              key={index}
              label={addon.trim()}
              size='small'
              variant='outlined'
              sx={{ mr: 0.5, mb: 0.5, fontSize: '0.7rem' }}
            />
          ))}
        </Box>
      )
    },
    {
      flex: 0.08,
      minWidth: 100,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => (
        <Chip label={row.status} color={getStatusColor(row.status)} size='small' sx={{ textTransform: 'capitalize' }} />
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
            <IconButton size='small' onClick={() => onView(row)} sx={{ mr: 1 }}>
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
    <>
      <Card>
        <DataGrid
          autoHeight
          rows={data}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[10, 25, 50, 100]}
          onPageSizeChange={onPageSizeChange}
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
          <Icon icon={selectedUser?.status === 'active' ? 'tabler:user-x' : 'tabler:user-check'} fontSize={20} />
          {selectedUser?.status === 'active' ? 'Suspend' : 'Activate'}
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:trash' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

export default CrmTable
