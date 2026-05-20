import React from 'react'
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

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Toast
import toast from 'react-hot-toast'

const getPaidInvoicesData = () => {
  return [
    { id: 'INV-301', to: 'Client X', item: 'Web Design', amount: 2500, paidDate: '2024-02-10', status: 'paid', date: '2024-02-01' },
    { id: 'INV-302', to: 'Client Y', item: 'SEO Services', amount: 1800, paidDate: '2024-02-15', status: 'paid', date: '2024-02-05' }
  ]
}

const PaidInvoices = ({ user, fromDate, toDate, searchValue }) => {
  const [data, setData] = React.useState(getPaidInvoicesData())

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const handleView = (row) => {
    toast.success(`Viewing invoice: ${row.id}`)
  }

  const handleDownload = (row) => {
    toast.success(`Downloading invoice: ${row.id}`)
  }

  const filteredData = data.filter(item => {
    if (fromDate && item.date < fromDate) return false
    if (toDate && item.date > toDate) return false
    if (searchValue && !item.id.toLowerCase().includes(searchValue.toLowerCase()) && 
        !item.to.toLowerCase().includes(searchValue.toLowerCase())) return false
    return true
  })

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ bgcolor: 'action.hover' }}>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Item</TableCell>
            <TableCell align='right'>Amount</TableCell>
            <TableCell>Paid Date</TableCell>
            <TableCell>Invoice Date</TableCell>
            <TableCell align='center'>Status</TableCell>
            <TableCell align='center'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.to}</TableCell>
              <TableCell>{row.item}</TableCell>
              <TableCell align='right'>{formatCurrency(row.amount)}</TableCell>
              <TableCell>{row.paidDate}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell align='center'>
                <Chip label={row.status} color='success' size='small' />
              </TableCell>
              <TableCell align='center'>
                <Tooltip title="View Details">
                  <IconButton size='small' onClick={() => handleView(row)}>
                    <Icon icon='tabler:eye' fontSize={20} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Download">
                  <IconButton size='small' onClick={() => handleDownload(row)}>
                    <Icon icon='tabler:download' fontSize={20} />
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

export default PaidInvoices