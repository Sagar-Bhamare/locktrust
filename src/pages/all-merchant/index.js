import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

// ** Custom Components
import MerchantHeader from 'src/views/pages/all-merchant/MerchantHeader'
import MerchantFilters from 'src/views/pages/all-merchant/MerchantFilters'
import MerchantTable from 'src/views/pages/all-merchant/MerchantTable'

// ** Dummy Data
const initialData = [
  {
    id: 1,
    businessName: 'Lock Trust Inc',
    tradeName: 'Lock Trust',
    taxNumber: '12-3456789',
    businessPhone: '555-0100',
    servicePhone: '555-0101',
    email: 'info@locktrust.com',
    status: 'active'
  },
  {
    id: 2,
    businessName: 'Global Solutions LLC',
    tradeName: 'Global Sol',
    taxNumber: '98-7654321',
    businessPhone: '555-0200',
    servicePhone: '555-0201',
    email: 'contact@globalsol.com',
    status: 'pending'
  },
  {
    id: 3,
    businessName: 'Tech Innovations Inc',
    tradeName: 'TechInno',
    taxNumber: '34-5678901',
    businessPhone: '555-0300',
    servicePhone: '555-0301',
    email: 'support@techinno.com',
    status: 'active'
  },
  {
    id: 4,
    businessName: 'Merchant Services Group',
    tradeName: 'MSG',
    taxNumber: '56-7890123',
    businessPhone: '555-0400',
    servicePhone: '555-0401',
    email: 'info@msg.com',
    status: 'inactive'
  }
]

const AllMerchant = () => {
  const router = useRouter()
  const [data, setData] = useState(initialData)
  const [searchValue, setSearchValue] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [pageSize, setPageSize] = useState(10)

  const handleRefresh = () => {
    setData(initialData)
  }

  const handleView = (row) => {
    // Store merchant data in localStorage
    localStorage.setItem('viewMerchantData', JSON.stringify(row))
    router.push(`/all-merchant/view-merchant/${row.id}`)
  }

  const filteredData = data.filter(item => {
    const matchesSearch = searchValue 
      ? item.businessName.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.tradeName.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.taxNumber.toLowerCase().includes(searchValue.toLowerCase())
      : true
    const matchesStatus = statusFilter ? item.status === statusFilter : true
    return matchesSearch && matchesStatus
  })

  return (
    <Box>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant='h4' sx={{ fontWeight: 600, mb: 1 }}>
              Transactions
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Manage and view all merchant transactions
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <MerchantHeader onRefresh={handleRefresh} />
        </Grid>

        <Grid item xs={12}>
          <MerchantFilters 
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />
        </Grid>

        <Grid item xs={12}>
          <MerchantTable 
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

AllMerchant.acl = {
  action: 'read',
  subject: 'merchant-page'
}

export default AllMerchant