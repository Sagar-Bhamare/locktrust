import React, { useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

// ** Custom Components
import PrepaidCardHeader from 'src/views/pages/prepaid-card-applications/PrepaidCardHeader'
import PrepaidCardFilters from 'src/views/pages/prepaid-card-applications/PrepaidCardFilters'
import PrepaidCardTable from 'src/views/pages/prepaid-card-applications/PrepaidCardTable'

// ** Dummy Data
const initialData = [
  {
    id: 1,
    srNo: 1,
    userName: 'Gaurav Nerkar',
    walletId: '7352012357935562',
    ssnNumber: 'XXXX-789',
    contactNo: '+919579668524',
    emailAddress: 'nerkargaurav40@gmail.com',
    status: 'pending',
    firstName: 'Gaurav',
    lastName: 'Nerkar',
    dateOfBirth: '1993-08-02',
    photoImage: '/images/photo.jpg',
    addressProof: '/images/address.jpg',
    kycProof: '/images/kyc.jpg'
  },
  {
    id: 2,
    srNo: 2,
    userName: 'John Doe',
    walletId: '7453790029045194',
    ssnNumber: 'XXXX-456',
    contactNo: '+17023727551',
    emailAddress: 'john.doe@example.com',
    status: 'approved',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1990-05-15',
    photoImage: '/images/photo2.jpg',
    addressProof: '/images/address2.jpg',
    kycProof: '/images/kyc2.jpg'
  },
  {
    id: 3,
    srNo: 3,
    userName: 'Jane Smith',
    walletId: '7001501151826232',
    ssnNumber: 'XXXX-123',
    contactNo: '+17023727552',
    emailAddress: 'jane.smith@example.com',
    status: 'rejected',
    firstName: 'Jane',
    lastName: 'Smith',
    dateOfBirth: '1988-08-22',
    photoImage: '/images/photo3.jpg',
    addressProof: '/images/address3.jpg',
    kycProof: '/images/kyc3.jpg'
  },
  {
    id: 4,
    srNo: 4,
    userName: 'Robert Johnson',
    walletId: '7345958904452512',
    ssnNumber: 'XXXX-789',
    contactNo: '+17023727553',
    emailAddress: 'robert.j@example.com',
    status: 'approved',
    firstName: 'Robert',
    lastName: 'Johnson',
    dateOfBirth: '1975-12-10',
    photoImage: '/images/photo4.jpg',
    addressProof: '/images/address4.jpg',
    kycProof: '/images/kyc4.jpg'
  },
  {
    id: 5,
    srNo: 5,
    userName: 'Maria Garcia',
    walletId: '7891234567891234',
    ssnNumber: 'XXXX-456',
    contactNo: '+17023727554',
    emailAddress: 'maria.g@example.com',
    status: 'more_info',
    firstName: 'Maria',
    lastName: 'Garcia',
    dateOfBirth: '1992-03-18',
    photoImage: '/images/photo5.jpg',
    addressProof: '/images/address5.jpg',
    kycProof: '/images/kyc5.jpg'
  }
]

const PrepaidCard = () => {
  const router = useRouter()
  const [data, setData] = useState(initialData)
  const [searchValue, setSearchValue] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [pageSize, setPageSize] = useState(10)

  const handleView = (row) => {
    // Store data in localStorage
    localStorage.setItem('viewApplicationData', JSON.stringify(row))
    router.push('/prepaid-card-applications/view-application')
  }

  const filteredData = data.filter(item => {
    const matchesSearch = searchValue 
      ? item.userName.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.walletId.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.emailAddress.toLowerCase().includes(searchValue.toLowerCase())
      : true
    const matchesStatus = statusFilter ? item.status === statusFilter : true
    return matchesSearch && matchesStatus
  })

  return (
    <Box >
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 2, p: 3 }}>
            <Typography variant='h4' sx={{ mb: 1, fontWeight: 600 }}>
              Prepaid Card Applications
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Manage and review prepaid card applications
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <PrepaidCardHeader 
            data={filteredData}
            onRefresh={() => setData(initialData)}
          />
        </Grid>

        <Grid item xs={12}>
          <PrepaidCardFilters 
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />
        </Grid>

        <Grid item xs={12}>
          <PrepaidCardTable 
            data={filteredData}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
            onView={handleView}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default PrepaidCard