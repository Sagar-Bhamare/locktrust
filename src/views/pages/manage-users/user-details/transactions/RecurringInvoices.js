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
import Switch from '@mui/material/Switch'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Toast
import toast from 'react-hot-toast'

const getRecurringInvoicesData = () => {
  return [
    { id: 'REC-001', to: 'Monthly Client', item: 'Subscription Service', amount: 500, frequency: 'Monthly', nextDate: '2024-03-01', status: 'active', date: '2024-02-01' },
    { id: 'REC-002', to: 'Annual Client', item: 'Maintenance Contract', amount: 1200, frequency: 'Yearly', nextDate: '2024-06-01', status: 'active', date: '2024-02-05' },
    { id: 'REC-003', to: 'Quarterly Client', item: 'Consulting Retainer', amount: 750, frequency: 'Quarterly', nextDate: '2024-04-01', status: 'paused', date: '2024-02-10' }
  ]
}

const RecurringInvoices = ({ user, fromDate, toDate, searchValue }) => {
  const [data, setData] = React.useState(getRecurringInvoicesData())

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const handleView = (row) => {
    toast.success(`Viewing recurring invoice: ${row.id}`)
  }

  const handleToggleStatus = (row) => {
    const newStatus = row.status === 'active' ? 'paused' : 'active'
    setData(prev => prev.map(item => 
      item.id === row.id ? { ...item, status: newStatus } : item
    ))
    toast.success(`Recurring invoice ${row.id} ${newStatus === 'active' ? 'activated' : 'paused'}`)
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
            <TableCell>Frequency</TableCell>
            <TableCell>Next Date</TableCell>
            <TableCell>Created Date</TableCell>
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
              <TableCell>{row.frequency}</TableCell>
              <TableCell>{row.nextDate}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell align='center'>
                <Chip label={row.status} color={row.status === 'active' ? 'success' : 'default'} size='small' />
              </TableCell>
              <TableCell align='center'>
                <Tooltip title="View Details">
                  <IconButton size='small' onClick={() => handleView(row)}>
                    <Icon icon='tabler:eye' fontSize={20} />
                  </IconButton>
                </Tooltip>
                <Tooltip title={row.status === 'active' ? 'Pause' : 'Activate'}>
                  <Switch 
                    size='small' 
                    checked={row.status === 'active'} 
                    onChange={() => handleToggleStatus(row)} 
                  />
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RecurringInvoices