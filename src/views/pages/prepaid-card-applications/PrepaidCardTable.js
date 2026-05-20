import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const PrepaidCardTable = ({ data, pageSize, onPageSizeChange, onView }) => {
  const getStatusColor = (status) => {
    const statusColors = {
      pending: 'warning',
      approved: 'success',
      rejected: 'error',
      more_info: 'info'
    }
    return statusColors[status] || 'default'
  }

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      more_info: 'More Info Required'
    }
    return labels[status] || status
  }

  const columns = [
    {
      flex: 0.05,
      minWidth: 70,
      field: 'srNo',
      headerName: 'SR. No',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ fontWeight: 500 }}>
          {row.srNo}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'userName',
      headerName: 'User Name',
      renderCell: ({ row }) => (
        <Typography variant='body2'>{row.userName}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 180,
      field: 'walletId',
      headerName: 'Wallet ID',
      renderCell: ({ row }) => (
        <Tooltip title={row.walletId}>
          <Typography variant='body2' sx={{ fontWeight: 500 }}>
            {row.walletId.slice(0, 8)}...
          </Typography>
        </Tooltip>
      )
    },
    {
      flex: 0.12,
      minWidth: 120,
      field: 'ssnNumber',
      headerName: 'SSN Number',
      renderCell: ({ row }) => (
        <Typography variant='body2'>{row.ssnNumber}</Typography>
      )
    },
    {
      flex: 0.12,
      minWidth: 140,
      field: 'contactNo',
      headerName: 'Contact No',
      renderCell: ({ row }) => (
        <Typography variant='body2'>{row.contactNo}</Typography>
      )
    },
    {
      flex: 0.18,
      minWidth: 200,
      field: 'emailAddress',
      headerName: 'Email Address',
      renderCell: ({ row }) => (
        <Typography variant='body2'>{row.emailAddress}</Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 130,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => (
        <Chip
          label={getStatusLabel(row.status)}
          color={getStatusColor(row.status)}
          size='small'
          sx={{ borderRadius: 1, textTransform: 'capitalize' }}
        />
      )
    },
    {
      flex: 0.08,
      minWidth: 100,
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: ({ row }) => (
        <Tooltip title="View Application">
          <IconButton size='small' onClick={() => onView(row)}>
            <Icon icon='tabler:eye' fontSize={20} />
          </IconButton>
        </Tooltip>
      )
    }
  ]

  return (
    <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <DataGrid
        autoHeight
        rows={data}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[10, 25, 50]}
        onPageSizeChange={onPageSizeChange}
        disableSelectionOnClick
        getRowId={(row) => row.id}
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            fontWeight: 600
          }
        }}
      />
    </Card>
  )
}

export default PrepaidCardTable