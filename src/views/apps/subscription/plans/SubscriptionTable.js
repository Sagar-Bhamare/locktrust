import React from 'react'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const SubscriptionTable = ({ data, pageSize, onPageSizeChange, onEdit, onDelete }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const columns = [
    {
      flex: 0.05,
      minWidth: 70,
      field: 'srNo',
      headerName: 'Sr.No',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ fontWeight: 500 }}>
          {row.srNo}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 160,
      field: 'module',
      headerName: 'Module',
      renderCell: ({ row }) => (
        <Chip label={row.module} size='small' variant='outlined' />
      )
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'name',
      headerName: 'Name',
      renderCell: ({ row }) => (
        <Box>
          <Typography variant='body2' sx={{ fontWeight: 500 }}>
            {row.name}
          </Typography>
          {row.isAddonPackage && (
            <Chip label="Add-on" size='small' color='info' sx={{ mt: 0.5, fontSize: '0.7rem' }} />
          )}
        </Box>
      )
    },
    {
      flex: 0.12,
      minWidth: 120,
      field: 'amount',
      headerName: 'Amount',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ fontWeight: 600, color: 'success.main' }}>
          {formatCurrency(row.amount)}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'type',
      headerName: 'Type',
      renderCell: ({ row }) => (
        <Chip label={row.type} size='small' color='primary' variant='outlined' />
      )
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: ({ row }) => (
        <Box>
          <Tooltip title="Edit Subscription">
            <IconButton size='small' onClick={() => onEdit(row)} sx={{ mr: 1 }} color='primary'>
              <Icon icon='tabler:edit' fontSize={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Subscription">
            <IconButton size='small' onClick={() => onDelete(row.id)} color='error'>
              <Icon icon='tabler:trash' fontSize={20} />
            </IconButton>
          </Tooltip>
        </Box>
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
        rowsPerPageOptions={[10, 25, 50, 100]}
        onPageSizeChange={onPageSizeChange}
        disableSelectionOnClick
        getRowId={(row) => row.id}
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'grey.50',
            fontWeight: 600
          },
          '& .MuiDataGrid-cell': {
            py: 2
          }
        }}
      />
    </Card>
  )
}

export default SubscriptionTable