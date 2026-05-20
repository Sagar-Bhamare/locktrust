import React, { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Components
import TransactionHeader from 'src/views/pages/all-transactions/TransactionHeader'
import TransactionFilters from 'src/views/pages/all-transactions/TransactionFilters'
import TransactionTable from 'src/views/pages/all-transactions/TransactionTable'

// ** Toast
import toast from 'react-hot-toast'

// ** Dummy Data
const initialTransactionData = [
  {
    id: 1,
    date: '2024-01-15 10:30:00',
    transactionId: 'TRX123456789',
    description: 'Payment received from John Doe',
    credit: 5000,
    debit: 0,
    conixTransId: 'CNX789123456',
    invoiceId: 'INV-2024-001',
    receiverWalletId: 'WLT123456789',
    senderBankAccount: '****1234',
    account: 'Savings Account',
    status: 'completed'
  },
  {
    id: 2,
    date: '2024-01-16 14:45:00',
    transactionId: 'TRX987654321',
    description: 'Payment to Jane Smith',
    credit: 0,
    debit: 2500,
    conixTransId: 'CNX456789123',
    invoiceId: 'INV-2024-002',
    receiverWalletId: 'WLT987654321',
    senderBankAccount: '****5678',
    account: 'Business Account',
    status: 'completed'
  },
  {
    id: 3,
    date: '2024-01-18 09:15:00',
    transactionId: 'TRX456789123',
    description: 'Subscription payment',
    credit: 0,
    debit: 1500,
    conixTransId: 'CNX123789456',
    invoiceId: 'INV-2024-003',
    receiverWalletId: 'WLT456789123',
    senderBankAccount: '****9012',
    account: 'Checking Account',
    status: 'pending'
  },
  {
    id: 4,
    date: '2024-01-20 16:20:00',
    transactionId: 'TRX789123456',
    description: 'Refund processed',
    credit: 1200,
    debit: 0,
    conixTransId: 'CNX789456123',
    invoiceId: 'INV-2024-004',
    receiverWalletId: 'WLT789123456',
    senderBankAccount: '****3456',
    account: 'Savings Account',
    status: 'completed'
  },
  {
    id: 5,
    date: '2024-01-22 11:00:00',
    transactionId: 'TRX321654987',
    description: 'Transfer to external wallet',
    credit: 0,
    debit: 3500,
    conixTransId: 'CNX321654987',
    invoiceId: 'INV-2024-005',
    receiverWalletId: 'WLT321654987',
    senderBankAccount: '****7890',
    account: 'Business Account',
    status: 'completed'
  },
  {
    id: 6,
    date: '2024-01-25 13:30:00',
    transactionId: 'TRX654987321',
    description: 'Payment received from Client',
    credit: 10000,
    debit: 0,
    conixTransId: 'CNX654987321',
    invoiceId: 'INV-2024-006',
    receiverWalletId: 'WLT654987321',
    senderBankAccount: '****2345',
    account: 'Savings Account',
    status: 'completed'
  },
  {
    id: 7,
    date: '2024-01-28 08:45:00',
    transactionId: 'TRX147258369',
    description: 'Fee deduction',
    credit: 0,
    debit: 500,
    conixTransId: 'CNX147258369',
    invoiceId: 'INV-2024-007',
    receiverWalletId: 'WLT147258369',
    senderBankAccount: '****6789',
    account: 'Checking Account',
    status: 'completed'
  },
  {
    id: 8,
    date: '2024-02-01 10:00:00',
    transactionId: 'TRX963852741',
    description: 'International transfer',
    credit: 0,
    debit: 8000,
    conixTransId: 'CNX963852741',
    invoiceId: 'INV-2024-008',
    receiverWalletId: 'WLT963852741',
    senderBankAccount: '****0123',
    account: 'Business Account',
    status: 'pending'
  },
  {
    id: 9,
    date: '2024-02-05 15:30:00',
    transactionId: 'TRX741852963',
    description: 'Deposit received',
    credit: 20000,
    debit: 0,
    conixTransId: 'CNX741852963',
    invoiceId: 'INV-2024-009',
    receiverWalletId: 'WLT741852963',
    senderBankAccount: '****4567',
    account: 'Savings Account',
    status: 'completed'
  },
  {
    id: 10,
    date: '2024-02-10 12:15:00',
    transactionId: 'TRX159357486',
    description: 'Withdrawal request',
    credit: 0,
    debit: 5000,
    conixTransId: 'CNX159357486',
    invoiceId: 'INV-2024-010',
    receiverWalletId: 'WLT159357486',
    senderBankAccount: '****8901',
    account: 'Checking Account',
    status: 'failed'
  }
]

const AllTransaction = () => {
  const [transactionData] = useState(initialTransactionData)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [visibleColumns, setVisibleColumns] = useState({
    date: true,
    transactionId: true,
    description: true,
    credit: true,
    debit: true,
    conixTransId: true,
    invoiceId: true,
    receiverWalletId: true,
    senderBankAccount: true,
    account: true,
    action: true
  })

  // Filter data based on date range and search
  const filteredData = transactionData.filter(row => {
    const matchesDate = () => {
      if (!fromDate && !toDate) return true
      const rowDate = new Date(row.date.split(' ')[0])
      const startDate = fromDate ? new Date(fromDate) : null
      const endDate = toDate ? new Date(toDate) : null

      if (startDate && endDate) {
        return rowDate >= startDate && rowDate <= endDate
      } else if (startDate) {
        return rowDate >= startDate
      } else if (endDate) {
        return rowDate <= endDate
      }
      return true
    }

    const matchesSearch = searchValue
      ? row.transactionId.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.description.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.conixTransId.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.invoiceId.toLowerCase().includes(searchValue.toLowerCase())
      : true

    return matchesDate() && matchesSearch
  })

  const handleResetFilters = () => {
    setFromDate('')
    setToDate('')
    setSearchValue('')
    toast.success('Filters reset successfully!')
  }

  const handleToggleColumn = columnName => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnName]: !prev[columnName]
    }))
    toast.success(`${columnName} column ${!visibleColumns[columnName] ? 'shown' : 'hidden'}`)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TransactionHeader data={filteredData} visibleColumns={visibleColumns} onToggleColumn={handleToggleColumn} />
      </Grid>

      <Grid item xs={12}>
        <TransactionFilters
          fromDate={fromDate}
          toDate={toDate}
          searchValue={searchValue}
          onFromDateChange={setFromDate}
          onToDateChange={setToDate}
          onSearchChange={setSearchValue}
          onReset={handleResetFilters}
        />
      </Grid>

      <Grid item xs={12}>
        <TransactionTable data={filteredData} visibleColumns={visibleColumns} />
      </Grid>
    </Grid>
  )
}

AllTransaction.acl = {
  action: 'read',
  subject: 'transaction-page'
}

export default AllTransaction
