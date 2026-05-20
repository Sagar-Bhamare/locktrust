import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

// ** Custom Components
import RemoteDepositFilters from 'src/views/pages/RemoteDeposit/RemoteDepositFilters'
import RemoteDepositTable from 'src/views/pages/RemoteDeposit/RemoteDepositTable'

// ** Dummy Data
const initialData = [
  {
    id: 1,
    srNo: 1,
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main Street, Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    chequeImage: '/images/logos/locktrust.jpg',
    depositDate: '2024-02-15',
    amount: 5000
  },
  {
    id: 2,
    srNo: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    address: '456 Oak Avenue, Suite 100',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    chequeImage: '/images/logos/locktrust.jpg',
    depositDate: '2024-02-16',
    amount: 3500
  },
  {
    id: 3,
    srNo: 3,
    firstName: 'Robert',
    lastName: 'Johnson',
    address: '789 Pine Road, Apt 12',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60601',
    chequeImage: '/images/logos/locktrust.jpg',
    depositDate: '2024-02-18',
    amount: 12000
  },
  {
    id: 4,
    srNo: 4,
    firstName: 'Maria',
    lastName: 'Garcia',
    address: '321 Elm Street, Floor 5',
    city: 'Miami',
    state: 'FL',
    zipCode: '33101',
    chequeImage: '/images/logos/locktrust.jpg',
    depositDate: '2024-02-20',
    amount: 7500
  },
  {
    id: 5,
    srNo: 5,
    firstName: 'David',
    lastName: 'Wilson',
    address: '654 Maple Drive, House No 8',
    city: 'Houston',
    state: 'TX',
    zipCode: '77001',
    chequeImage: '/images/logos/locktrust.jpg',
    depositDate: '2024-02-22',
    amount: 2500
  }
]

const RemoteDeposit = () => {
  const [data, setData] = useState(initialData)
  const [searchValue, setSearchValue] = useState('')
  const [pageSize, setPageSize] = useState(10)

  const handleRefresh = () => {
    setData(initialData)
  }

  const filteredData = data.filter(item => {
    const matchesSearch = searchValue 
      ? item.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.city.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.state.toLowerCase().includes(searchValue.toLowerCase())
      : true
    return matchesSearch
  })

  return (
    <Box>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant='h4' sx={{ fontWeight: 600, mb: 1 }}>
              Remote Deposit Cheque
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Manage and view remote cheque deposits
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <RemoteDepositFilters 
            searchValue={searchValue}
            onSearchChange={setSearchValue}
          />
        </Grid>

        <Grid item xs={12}>
          <RemoteDepositTable 
            data={filteredData}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default RemoteDeposit