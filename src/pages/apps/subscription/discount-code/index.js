import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import DiscountCodeHeader from 'src/views/apps/subscription/discountcode/DiscountCodeHeader'
import DiscountCodeFilters from 'src/views/apps/subscription/discountcode/DiscountCodeFilters'
import DiscountCodeTable from 'src/views/apps/subscription/discountcode/DiscountCodeTable'
import AddDiscountCodeDialog from 'src/views/apps/subscription/discountcode/AddDiscountCodeDialog'

// ** Dummy Data
const initialData = [
  {
    id: 1,
    srNo: 1,
    module: 'Payment Gateway',
    subscriptionName: 'Enterprise Plan',
    couponTimeFrame: '30 days',
    maxUsageCount: 100,
    couponEndDate: '2024-12-31',
    discountCode: 'SAVE20',
    discountValue: 20,
    discountType: 'Percentage'
  },
  {
    id: 2,
    srNo: 2,
    module: 'Escrow Service',
    subscriptionName: 'Business Pro',
    couponTimeFrame: '60 days',
    maxUsageCount: 50,
    couponEndDate: '2024-11-30',
    discountCode: 'FLAT50',
    discountValue: 50,
    discountType: 'Flat'
  },
  {
    id: 3,
    srNo: 3,
    module: 'Wire Transfer',
    subscriptionName: 'Basic Plan',
    couponTimeFrame: '90 days',
    maxUsageCount: 200,
    couponEndDate: '2025-01-15',
    discountCode: 'FREE30',
    discountValue: 30,
    discountType: 'Free Duration'
  },
  {
    id: 4,
    srNo: 4,
    module: 'Card Processing',
    subscriptionName: 'Premium Plan',
    couponTimeFrame: '45 days',
    maxUsageCount: 75,
    couponEndDate: '2024-10-31',
    discountCode: 'WELCOME10',
    discountValue: 10,
    discountType: 'Percentage'
  }
]

const DiscountCode = () => {
  const [data, setData] = useState(initialData)
  const [searchValue, setSearchValue] = useState('')
  const [moduleFilter, setModuleFilter] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleRefresh = () => {
    setData(initialData)
  }

  const handleAddDiscount = (newDiscount) => {
    const newData = {
      id: data.length + 1,
      srNo: data.length + 1,
      ...newDiscount
    }
    setData(prev => [newData, ...prev])
  }

  const handleDelete = (id) => {
    setData(prev => prev.filter(item => item.id !== id))
  }

  const filteredData = data.filter(item => {
    const matchesSearch = searchValue 
      ? item.discountCode.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.module.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.subscriptionName.toLowerCase().includes(searchValue.toLowerCase())
      : true
    const matchesModule = moduleFilter ? item.module === moduleFilter : true
    return matchesSearch && matchesModule
  })

  return (
    <Box>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <Typography variant='h4' sx={{ fontWeight: 600, mb: 1 }}>
                  Subscription Discount
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Manage and create discount codes for subscriptions
                </Typography>
              </Box>
              <Button
                variant='contained'
                color='primary'
                onClick={() => setDialogOpen(true)}
                startIcon={<Icon icon='tabler:plus' />}
                sx={{ textTransform: 'none' }}
              >
                Discount Code
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* <Grid item xs={12}>
          <DiscountCodeHeader onRefresh={handleRefresh} />
        </Grid> */}

        <Grid item xs={12}>
          <DiscountCodeFilters 
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            moduleFilter={moduleFilter}
            onModuleChange={setModuleFilter}
          />
        </Grid>

        <Grid item xs={12}>
          <DiscountCodeTable 
            data={filteredData}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
            onDelete={handleDelete}
          />
        </Grid>
      </Grid>

      <AddDiscountCodeDialog 
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleAddDiscount}
      />
    </Box>
  )
}

export default DiscountCode