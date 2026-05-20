import React, { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Toast
import toast from 'react-hot-toast'

const TransactionTable = ({
  data,
  visibleColumns,
  pageSize,
  onPageSizeChange,
  onView,
  onEdit,
  onDelete,
  onToggleStatus
}) => {
  const [actionAnchorEl, setActionAnchorEl] = useState(null)
  const [selectedRow, setSelectedRow] = useState(null)

  const handleActionClick = (event, row) => {
    setActionAnchorEl(event.currentTarget)
    setSelectedRow(row)
  }

  const handleActionClose = () => {
    setActionAnchorEl(null)
  }

  const handleEdit = () => {
    if (onEdit) onEdit(selectedRow)
    handleActionClose()
  }

  const handleDelete = () => {
    if (onDelete) onDelete(selectedRow)
    handleActionClose()
  }

  const handleToggleStatus = () => {
    if (onToggleStatus) onToggleStatus(selectedRow)
    handleActionClose()
  }

  const handleViewDetails = row => {
    if (onView) onView(row)
    else toast.success(`Viewing transaction: ${row.transactionId}`)
  }

  const formatCurrency = amount =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount)

  // Theme-aware column header background
  const headerStyle = theme => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.action.hover,
    fontWeight: 600
  })

  // Define DataGrid columns for all 11
  const columns = [
    { field: 'date', headerName: 'Date', flex: 0.15, minWidth: 150, renderCell: ({ row }) => <Typography variant="body2">{row.date}</Typography>, headerClassName: 'transaction-header', hide: !visibleColumns.date },
    { field: 'transactionId', headerName: 'Transaction ID', flex: 0.18, minWidth: 150, renderCell: ({ row }) => (<Tooltip title={row.transactionId}><Typography variant="body2" sx={{ fontWeight: 500, cursor: 'pointer' }}>{row.transactionId.slice(0, 10)}...</Typography></Tooltip>), headerClassName: 'transaction-header', hide: !visibleColumns.transactionId },
    { field: 'description', headerName: 'Description', flex: 0.25, minWidth: 200, renderCell: ({ row }) => (<Tooltip title={row.description}><Typography variant="body2">{row.description.length > 40 ? `${row.description.substring(0, 40)}...` : row.description}</Typography></Tooltip>), headerClassName: 'transaction-header', hide: !visibleColumns.description },
    { field: 'credit', headerName: 'Credit', flex: 0.12, minWidth: 120, renderCell: ({ row }) => row.credit > 0 ? <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600 }}>{formatCurrency(row.credit)}</Typography> : <Typography variant="body2">-</Typography>, headerClassName: 'transaction-header', hide: !visibleColumns.credit },
    { field: 'debit', headerName: 'Debit', flex: 0.12, minWidth: 120, renderCell: ({ row }) => row.debit > 0 ? <Typography variant="body2" sx={{ color: 'error.main', fontWeight: 600 }}>{formatCurrency(row.debit)}</Typography> : <Typography variant="body2">-</Typography>, headerClassName: 'transaction-header', hide: !visibleColumns.debit },
    { field: 'conixTransId', headerName: 'Conix Trans ID', flex: 0.18, minWidth: 150, renderCell: ({ row }) => (<Tooltip title={row.conixTransId}><Typography variant="body2" sx={{ cursor: 'pointer' }}>{row.conixTransId.slice(0, 8)}...</Typography></Tooltip>), headerClassName: 'transaction-header', hide: !visibleColumns.conixTransId },
    { field: 'invoiceId', headerName: 'Invoice ID', flex: 0.15, minWidth: 130, renderCell: ({ row }) => <Typography variant="body2">{row.invoiceId}</Typography>, headerClassName: 'transaction-header', hide: !visibleColumns.invoiceId },
    { field: 'receiverWalletId', headerName: 'Receiver Wallet ID', flex: 0.18, minWidth: 150, renderCell: ({ row }) => (<Tooltip title={row.receiverWalletId}><Typography variant="body2" sx={{ cursor: 'pointer' }}>{row.receiverWalletId.slice(0, 8)}...</Typography></Tooltip>), headerClassName: 'transaction-header', hide: !visibleColumns.receiverWalletId },
    { field: 'senderBankAccount', headerName: 'Sender Bank Account', flex: 0.18, minWidth: 150, renderCell: ({ row }) => <Typography variant="body2">{row.senderBankAccount}</Typography>, headerClassName: 'transaction-header', hide: !visibleColumns.senderBankAccount },
    { field: 'account', headerName: 'Account', flex: 0.12, minWidth: 130, renderCell: ({ row }) => <Chip label={row.account} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />, headerClassName: 'transaction-header', hide: !visibleColumns.account },
    { field: 'actions', headerName: 'Actions', flex: 0.12, minWidth: 120, sortable: false, renderCell: ({ row }) => (
        <Box>
          <Tooltip title="View Details">
            <IconButton size="small" onClick={() => handleViewDetails(row)} sx={{ mr: 1 }}>
              <Icon icon="tabler:eye" fontSize={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title="More Actions">
            <IconButton size="small" onClick={e => handleActionClick(e, row)}>
              <Icon icon="tabler:dots-vertical" fontSize={20} />
            </IconButton>
          </Tooltip>
        </Box>
      ), headerClassName: 'transaction-header', hide: !visibleColumns.action }
  ]

  return (
    <Card>
      <Box sx={{ height: 'calc(100vh - 300px)', width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={pageSize || 10}
          rowsPerPageOptions={[10, 25, 50, 100]}
          autoHeight
          disableSelectionOnClick
          sortingOrder={['asc', 'desc']}
          sx={{
            '& .transaction-header': theme => ({
              backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.action.hover,
              fontWeight: 600
            }),
            '& .MuiDataGrid-cell': { py: 2 }
          }}
          onPageSizeChange={onPageSizeChange}
        />
      </Box>

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
          <Icon icon="tabler:edit" fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleToggleStatus} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon={selectedRow?.status === 'active' ? 'tabler:user-x' : 'tabler:user-check'} fontSize={20} />
          {selectedRow?.status === 'active' ? 'Suspend' : 'Activate'}
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon="tabler:trash" fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </Card>
  )
}

export default TransactionTable