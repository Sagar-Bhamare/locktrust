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
        import Typography from '@mui/material/Typography'
        import IconButton from '@mui/material/IconButton'
        import Tooltip from '@mui/material/Tooltip'

        // ** Icon Imports
        import Icon from 'src/@core/components/icon'

        // ** Toast
        import toast from 'react-hot-toast'

        const getInvoiceSentData = () => {
        return [
            { id: 'INV-001', to: 'John Client', item: 'Consulting Services', amount: 5000, dueDate: '2024-02-15', status: 'sent', date: '2024-02-01' },
            { id: 'INV-002', to: 'Sarah Company', item: 'Web Development', amount: 3500, dueDate: '2024-02-20', status: 'sent', date: '2024-02-05' },
            { id: 'INV-003', to: 'Mike Corp', item: 'Maintenance', amount: 1200, dueDate: '2024-02-25', status: 'sent', date: '2024-02-10' }
        ]
        }

        const InvoiceSent = ({ user, fromDate, toDate, searchValue }) => {
        const [data, setData] = React.useState(getInvoiceSentData())

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
                    <TableCell align='right'>Total Amount</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Date</TableCell>
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
                    <TableCell align='right' sx={{ fontWeight: 500 }}>{formatCurrency(row.amount)}</TableCell>
                    <TableCell>{row.dueDate}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell align='center'>
                        <Chip label={row.status} color='info' size='small' />
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

        export default InvoiceSent