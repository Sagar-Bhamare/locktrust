import React from 'react'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Toast
import toast from 'react-hot-toast'

const DomesticBeneficiaryTable = ({ data }) => {
  const handleEdit = (row) => {
    toast.success(`Edit beneficiary: ${row.nickName}`)
  }

  const handleDelete = (row) => {
    toast.success(`Beneficiary ${row.nickName} deleted successfully!`)
  }

  return (
    <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Nick Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Bank Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Account Number</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Routing Number</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.map((row) => (
              <TableRow key={row.id} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.nickName}</TableCell>
                <TableCell>{row.bankName}</TableCell>
                <TableCell>{row.accountNumber}</TableCell>
                <TableCell>{row.routingNumber}</TableCell>
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
    </Card>
  )
}

export default DomesticBeneficiaryTable