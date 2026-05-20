import React, { useState } from 'react'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CancelEscrowDialog from './CancelEscrowDialog'

const EscrowTable = ({ data, pageSize, onPageSizeChange, onCancelEscrow }) => {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)

  const handleCancelClick = (row) => {
    if (row.status === 'cancelled') {
      return
    }
    setSelectedRow(row)
    setCancelDialogOpen(true)
  }

  const handleConfirmCancel = () => {
    if (selectedRow) {
      onCancelEscrow(selectedRow)
    }
    setCancelDialogOpen(false)
    setSelectedRow(null)
  }

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return '-'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const columns = [
    {
      flex: 0.2,
      minWidth: 100,
      field: 'fromWallet',
      headerName: 'From Wallet',
      renderCell: ({ row }) => (
        <Box>
          <Typography variant='body2' sx={{ fontWeight: 500 }}>
            {row.fromWallet}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            {row.fromWalletName}
          </Typography>
        </Box>
      )
    },
    {
      flex: 0.2,
      minWidth: 100,
      field: 'toWallet',
      headerName: 'To Wallet',
      renderCell: ({ row }) => (
        row.toWallet ? (
          <Box>
            <Typography variant='body2' sx={{ fontWeight: 500 }}>
              {row.toWallet}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              {row.toWalletName}
            </Typography>
          </Box>
        ) : (
          <Typography variant='body2' color='text.secondary'>-</Typography>
        )
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'amount',
      headerName: 'Amount',
      headerAlign: 'right',
      align: 'right',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ fontWeight: 500 }}>
          {formatCurrency(row.amount)}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'escrowType',
      headerName: 'Escrow Type',
      renderCell: ({ row }) => (
        row.escrowType ? (
          <Chip 
            label={row.escrowType} 
            size='small' 
            variant='outlined'
            color={row.escrowType === 'Multi Party Escrow' ? 'primary' : 'default'}
            sx={{ borderRadius: 1 }}
          />
        ) : '-'
      )
    },
    {
      flex: 0.12,
      minWidth: 120,
      field: 'feesPaidBy',
      headerName: 'Fees Paid By',
      renderCell: ({ row }) => (
        <Typography variant='body2'>{row.feesPaidBy || '-'}</Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'transactionAmount',
      headerName: 'Transaction Amount',
      headerAlign: 'right',
      align: 'right',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ fontWeight: 500 }}>
          {formatCurrency(row.transactionAmount)}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 180,
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: ({ row }) => (
        row.status === 'active' ? (
          <Button
            variant='outlined'
            color='error'
            size='small'
            onClick={() => handleCancelClick(row)}
            startIcon={<Icon icon='tabler:circle-x' fontSize={18} />}
            sx={{ textTransform: 'none' }}
          >
            Cancel Escrow
          </Button>
        ) : (
          <Tooltip title={row.actionText}>
            <Chip 
              label={row.actionText} 
              color='default' 
              size='small' 
              sx={{ borderRadius: 1, cursor: 'not-allowed', bgcolor: 'grey.100' }}
            />
          </Tooltip>
        )
      )
    }
  ]

  return (
    <>
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
        />
      </Card>

      <CancelEscrowDialog 
        open={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
        onConfirm={handleConfirmCancel}
        rowData={selectedRow}
      />
    </>
  )
}

export default EscrowTable