import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Chip from '@mui/material/Chip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Toast
import toast from 'react-hot-toast'

const InternationalBeneficiaryTable = ({ data }) => {
  const handleEdit = (row) => {
    toast.success(`Edit beneficiary: ${row.nickName}`)
  }

  const handleDelete = (row) => {
    toast.success(`Beneficiary ${row.nickName} deleted successfully!`)
  }

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, py: 2 }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 600, py: 2 }}>Nick Name</TableCell>
            <TableCell sx={{ fontWeight: 600, py: 2 }}>Bank Name</TableCell>
            <TableCell sx={{ fontWeight: 600, py: 2 }}>Account Number</TableCell>
            <TableCell sx={{ fontWeight: 600, py: 2 }}>Swift Code</TableCell>
            <TableCell sx={{ fontWeight: 600, py: 2 }} align='center'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row) => (
            <TableRow key={row.id} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.nickName}</TableCell>
              <TableCell>{row.bankName}</TableCell>
              <TableCell>{row.accountNumber}</TableCell>
              <TableCell>
                <Chip label={row.swiftCode} size='small' variant='outlined' />
              </TableCell>
              <TableCell align='center'>
                <Tooltip title="Edit">
                  <IconButton size='small' onClick={() => handleEdit(row)} sx={{ mr: 1 }}>
                    <Icon icon='tabler:edit' fontSize={20} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton size='small' onClick={() => handleDelete(row)}>
                    <Icon icon='tabler:trash' fontSize={20} />
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

export default InternationalBeneficiaryTable