import React from 'react'

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

const CardTable = ({ data, pageSize, onPageSizeChange, onView, onToggleStatus }) => {
  const getStatusColor = status => {
    const statusColors = {
      active: 'success',
      inactive: 'default',
      suspended: 'error'
    }
    return statusColors[status] || 'default'
  }

  const getCardTypeColor = type => {
    const typeColors = {
      Visa: '#1a1f71',
      Mastercard: '#eb001b',
      Amex: '#006fcf'
    }
    return typeColors[type] || 'primary'
  }

  const columns = [
    {
      flex: 0.15,
      minWidth: 160,
      field: 'dateTime',
      headerName: 'Date & Time',
      renderCell: ({ row }) => <Typography variant='body2'>{row.dateTime}</Typography>
    },
    {
      flex: 0.12,
      minWidth: 150,
      field: 'cardNumber',
      headerName: 'Card Number',
      renderCell: ({ row }) => (
        <Tooltip title={row.cardNumber}>
          <Typography variant='body2' sx={{ fontWeight: 500 }}>
            {row.cardNumber}
          </Typography>
        </Tooltip>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'cardExpiry',
      headerName: 'Card Expiry',
      renderCell: ({ row }) => <Typography variant='body2'>{row.cardExpiry}</Typography>
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'balance',
      headerName: 'Balance',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ fontWeight: 600 }}>
          ${row.balance.toLocaleString()}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'allotted',
      headerName: 'Allotted',
      renderCell: ({ row }) => <Typography variant='body2'>${row.allotted.toLocaleString()}</Typography>
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
      flex: 0.1,
      minWidth: 120,
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: ({ row }) => (
        <Box>
          <Tooltip title='View Details'>
            <IconButton size='small' onClick={() => onView(row)} sx={{ mr: 1 }}>
              <Icon icon='tabler:eye' fontSize={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title={row.status === 'active' ? 'Deactivate' : 'Activate'}>
            <IconButton size='small' onClick={() => onToggleStatus(row.id)}>
              <Icon icon={row.status === 'active' ? 'tabler:credit-card-off' : 'tabler:credit-card'} fontSize={20} />
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
  )
}

export default CardTable
