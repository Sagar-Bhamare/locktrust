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

const MerchantTable = ({ data, pageSize, onPageSizeChange, onView }) => {
  const getStatusColor = (status) => {
    const statusColors = {
      active: 'success',
      pending: 'warning',
      inactive: 'default'
    }
    return statusColors[status] || 'default'
  }

  const columns = [
    {
      flex: 0.05,
      minWidth: 70,
      field: 'id',
      headerName: 'ID',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ fontWeight: 500 }}>
          {row.id}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'businessName',
      headerName: 'Business Name',
      renderCell: ({ row }) => (
        <Typography variant='body2'>{row.businessName}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'tradeName',
      headerName: 'Trade Name',
      renderCell: ({ row }) => (
        <Typography variant='body2'>{row.tradeName}</Typography>
      )
    },
    {
      flex: 0.12,
      minWidth: 120,
      field: 'taxNumber',
      headerName: 'Tax Number',
      renderCell: ({ row }) => (
        <Typography variant='body2'>{row.taxNumber}</Typography>
      )
    },
    {
      flex: 0.12,
      minWidth: 140,
      field: 'businessPhone',
      headerName: 'Business Phone',
      renderCell: ({ row }) => (
        <Typography variant='body2'>{row.businessPhone}</Typography>
      )
    },
    {
      flex: 0.12,
      minWidth: 140,
      field: 'servicePhone',
      headerName: 'Service Phone',
      renderCell: ({ row }) => (
        <Typography variant='body2'>{row.servicePhone}</Typography>
      )
    },
    {
      flex: 0.08,
      minWidth: 100,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => (
        <Chip
          label={row.status}
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
        <Tooltip title="View Merchant Details">
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

export default MerchantTable