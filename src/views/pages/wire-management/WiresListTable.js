import React from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Toast
import toast from 'react-hot-toast'

const WiresListTable = ({ data, pageSize, onPageSizeChange, type }) => {
  const getStatusColor = (status) => {
    const statusColors = {
      processed: 'success',
      in_process: 'warning'
    }
    return statusColors[status] || 'default'
  }

  const getStatusLabel = (status) => {
    const labels = {
      processed: 'Processed',
      in_process: 'In Process'
    }
    return labels[status] || status
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const handleView = (row) => {
    toast.success(`Viewing wire transaction: ${row.id}`)
  }

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Nick Name</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Bank Name</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Account Number</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Total Amount (In USD)</TableCell>
            <TableCell sx={{ fontWeight: 600 }} align='center'>Status</TableCell>
            <TableCell sx={{ fontWeight: 600 }} align='center'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.nickName}</TableCell>
              <TableCell>{row.bankName}</TableCell>
              <TableCell>{row.accountNumber}</TableCell>
              <TableCell sx={{ fontWeight: 500 }}>{formatCurrency(row.totalAmount)}</TableCell>
              <TableCell align='center'>
                <Chip 
                  label={getStatusLabel(row.status)} 
                  color={getStatusColor(row.status)} 
                  size='small' 
                  sx={{ borderRadius: 1 }}
                />
              </TableCell>
              <TableCell align='center'>
                <Tooltip title="View Details">
                  <IconButton size='small' onClick={() => handleView(row)}>
                    <Icon icon='tabler:eye' fontSize={20} />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default WiresListTable