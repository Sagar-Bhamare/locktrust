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

// ** Toast
import toast from 'react-hot-toast'

const DiscountCodeTable = ({ data, pageSize, onPageSizeChange, onDelete }) => {
  const getDiscountTypeColor = (type) => {
    const typeColors = {
      Percentage: 'primary',
      Flat: 'success',
      'Free Duration': 'warning'
    }
    return typeColors[type] || 'default'
  }

  const handleDelete = (row) => {
    if (window.confirm(`Are you sure you want to delete discount code "${row.discountCode}"?`)) {
      onDelete(row.id)
      toast.success(`Discount code "${row.discountCode}" deleted successfully!`)
    }
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
      flex: 0.12,
      minWidth: 150,
      field: 'module',
      headerName: 'Module',
      renderCell: ({ row }) => (
        <Chip label={row.module} size='small' variant='outlined' />
      )
    },
    {
      flex: 0.15,
      minWidth: 160,
      field: 'subscriptionName',
      headerName: 'Subscription Name',
      renderCell: ({ row }) => (
        <Typography variant='body2'>{row.subscriptionName}</Typography>
      )
    },
    {
      flex: 0.12,
      minWidth: 130,
      field: 'couponTimeFrame',
      headerName: 'Coupon Time Frame',
      renderCell: ({ row }) => (
        <Typography variant='body2'>{row.couponTimeFrame}</Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'maxUsageCount',
      headerName: 'Max Usage Count',
      renderCell: ({ row }) => (
        <Typography variant='body2'>{row.maxUsageCount}</Typography>
      )
    },
    {
      flex: 0.12,
      minWidth: 130,
      field: 'couponEndDate',
      headerName: 'Coupon End Date',
      renderCell: ({ row }) => (
        <Typography variant='body2'>{row.couponEndDate}</Typography>
      )
    },
    {
      flex: 0.12,
      minWidth: 130,
      field: 'discountCode',
      headerName: 'Discount Code',
      renderCell: ({ row }) => (
        <Chip label={row.discountCode} color='info' size='small' />
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'discountValue',
      headerName: 'Discount Value',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ fontWeight: 500 }}>
          {row.discountType === 'Percentage' ? `${row.discountValue}%` : 
           row.discountType === 'Flat' ? `$${row.discountValue}` : 
           `${row.discountValue} days`}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'discountType',
      headerName: 'Type',
      renderCell: ({ row }) => (
        <Chip 
          label={row.discountType} 
          color={getDiscountTypeColor(row.discountType)} 
          size='small' 
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
        <Tooltip title="Delete Discount Code">
          <IconButton size='small' onClick={() => handleDelete(row)} color='error'>
            <Icon icon='tabler:trash' fontSize={20} />
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

export default DiscountCodeTable    