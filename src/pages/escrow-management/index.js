import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

// ** Custom Components
import EscrowHeader from 'src/views/pages/escrow-management/EscrowHeader'
import EscrowFilters from 'src/views/pages/escrow-management/EscrowFilters'
import EscrowTable from 'src/views/pages/escrow-management/EscrowTable'

// ** Dummy Data
const initialData = [
  {
    id: 1,
    fromWallet: '7453790029045194',
    fromWalletName: 'Lock Trust',
    toWallet: '7181776304095243',
    toWalletName: 'Gidget LeBlanc',
    amount: 100,
    escrowType: 'Multi Party Escrow',
    feesPaidBy: 'Receiver',
    transactionAmount: 2.5,
    status: 'active',
    actionText: 'Cancel Escrow'
  },
  {
    id: 2,
    fromWallet: '7453790029045194',
    fromWalletName: 'Lock Trust',
    toWallet: '7191235871054232',
    toWalletName: 'Gina Leblanc',
    amount: 32.69,
    escrowType: 'Multi Party Escrow',
    feesPaidBy: 'Receiver',
    transactionAmount: 0.82,
    status: 'active',
    actionText: 'Cancel Escrow'
  },
  {
    id: 3,
    fromWallet: '7181776304095243',
    fromWalletName: 'Gidget LeBlanc',
    toWallet: '7647161876845515',
    toWalletName: 'Lock Trust',
    amount: 1.00,
    escrowType: 'Single Escrow',
    feesPaidBy: 'Receiver',
    transactionAmount: 0.03,
    status: 'active',
    actionText: 'Cancel Escrow'
  },
  {
    id: 4,
    fromWallet: '7453790029045194',
    fromWalletName: 'Lock Trust',
    toWallet: '7191235871054232',
    toWalletName: 'Gina Leblanc',
    amount: 100,
    escrowType: 'Single Escrow',
    feesPaidBy: 'Receiver',
    transactionAmount: 2.5,
    status: 'cancelled',
    actionText: 'Escrow is already claimed OR cancelled'
  },
  {
    id: 5,
    fromWallet: '7367205549031496',
    fromWalletName: 'Sagar Kotak',
    toWallet: '7352012357935562',
    toWalletName: 'Nerkar Nerkar',
    amount: 11,
    escrowType: 'Single Escrow',
    feesPaidBy: 'Sender',
    transactionAmount: 0.28,
    status: 'active',
    actionText: 'Cancel Escrow'
  },
  {
    id: 6,
    fromWallet: '7352012357935562',
    fromWalletName: 'Nerkar Nerkar',
    toWallet: '7367205549031496',
    toWalletName: 'Sagar Kotak',
    amount: 13,
    escrowType: 'Multi Party Escrow',
    feesPaidBy: 'Receiver',
    transactionAmount: 0.33,
    status: 'active',
    actionText: 'Cancel Escrow'
  },
  {
    id: 7,
    fromWallet: '7352012357935562',
    fromWalletName: 'John Doe',
    toWallet: '7367205549031496',
    toWalletName: 'Smith',
    amount: 12,
    escrowType: 'Multi Party Escrow',
    feesPaidBy: 'Receiver',
    transactionAmount: 0.3,
    status: 'cancelled',
    actionText: 'Escrow is already claimed OR cancelled'
  },
  {
    id: 8,
    fromWallet: '7352012357935562',
    fromWalletName: 'kalpesh',
    toWallet: '7367205549031496',
    toWalletName: 'Rushi',
    amount: 10,
    escrowType: 'Multi Party Escrow',
    feesPaidBy: 'Receiver',
    transactionAmount: 0.25,
    status: 'cancelled',
    actionText: 'Escrow is already claimed OR cancelled'
  },
  {
    id: 9,
    fromWallet: '7352012357935562',
    fromWalletName: 'Kalpesh',
    toWallet: '7367205549031496',
    toWalletName: 'Hardik',
    amount: 12,
    escrowType: 'Single Escrow',
    feesPaidBy: 'Receiver',
    transactionAmount: 0.3,
    status: 'cancelled',
    actionText: 'Escrow is already claimed OR cancelled'
  },
  {
    id: 10,
    fromWallet: '7352012357935562',
    fromWalletName: 'Rutik',
    toWallet: '7367205549031496',
    toWalletName: 'Rohit',
    amount: 10,
    escrowType: 'Single Escrow',
    feesPaidBy: 'Receiver',
    transactionAmount: 0.25,
    status: 'cancelled',
    actionText: 'Escrow is already claimed OR cancelled'
  },
  {
    id: 11,
    fromWallet: '8765432109876543',
    fromWalletName: 'Alice Johnson',
    toWallet: '7654321098765432',
    toWalletName: 'Bob Williams',
    amount: 250.00,
    escrowType: 'Multi Party Escrow',
    feesPaidBy: 'Split 50/50',
    transactionAmount: 6.25,
    status: 'active',
    actionText: 'Cancel Escrow'
  },
  {
    id: 12,
    fromWallet: '9876543210987654',
    fromWalletName: 'Carol Davis',
    toWallet: '6543210987654321',
    toWalletName: 'David Brown',
    amount: 5000.00,
    escrowType: 'Single Escrow',
    feesPaidBy: 'Receiver',
    transactionAmount: 125.00,
    status: 'active',
    actionText: 'Cancel Escrow'
  },
  {
    id: 13,
    fromWallet: '5432109876543210',
    fromWalletName: 'Emma Wilson',
    toWallet: '4321098765432109',
    toWalletName: 'Frank Miller',
    amount: 750.00,
    escrowType: 'Multi Party Escrow',
    feesPaidBy: 'Sender',
    transactionAmount: 18.75,
    status: 'cancelled',
    actionText: 'Escrow is already claimed OR cancelled'
  },
  {
    id: 14,
    fromWallet: '3210987654321098',
    fromWalletName: 'Grace Lee',
    toWallet: '2109876543210987',
    toWalletName: 'Henry Taylor',
    amount: 1250.00,
    escrowType: 'Single Escrow',
    feesPaidBy: 'Receiver',
    transactionAmount: 31.25,
    status: 'active',
    actionText: 'Cancel Escrow'
  },
  {
    id: 15,
    fromWallet: '1098765432109876',
    fromWalletName: 'Ivy Martinez',
    toWallet: '0987654321098765',
    toWalletName: 'Jack Anderson',
    amount: 3250.00,
    escrowType: 'Multi Party Escrow',
    feesPaidBy: 'Split 60/40',
    transactionAmount: 81.25,
    status: 'cancelled',
    actionText: 'Escrow is already claimed OR cancelled'
  }
]

const EscrowManagement = () => {
  const [data, setData] = useState(initialData)
  const [searchValue, setSearchValue] = useState('')
  const [escrowTypeFilter, setEscrowTypeFilter] = useState('')
  const [pageSize, setPageSize] = useState(10)

  const handleRefresh = () => {
    setData(initialData)
  }

  const handleCancelEscrow = (row) => {
    const updatedData = data.map(item => 
      item.id === row.id 
        ? { 
            ...item, 
            status: 'cancelled', 
            actionText: 'Escrow is already claimed OR cancelled' 
          }
        : item
    )
    setData(updatedData)
  }

  const filteredData = data.filter(item => {
    const matchesSearch = searchValue 
      ? item.fromWallet.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.fromWalletName.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.toWallet.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.toWalletName.toLowerCase().includes(searchValue.toLowerCase())
      : true
    const matchesEscrowType = escrowTypeFilter ? item.escrowType === escrowTypeFilter : true
    return matchesSearch && matchesEscrowType
  })

  return (
    <Box>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant='h4' sx={{ fontWeight: 600, mb: 1 }}>
              Escrow Details
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Manage and track all escrow transactions
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <EscrowHeader onRefresh={handleRefresh} />
        </Grid>

        <Grid item xs={12}>
          <EscrowFilters 
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            escrowTypeFilter={escrowTypeFilter}
            onEscrowTypeChange={setEscrowTypeFilter}
          />
        </Grid>

        <Grid item xs={12}>
          <EscrowTable 
            data={filteredData}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
            onCancelEscrow={handleCancelEscrow}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default EscrowManagement