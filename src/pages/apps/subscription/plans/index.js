import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
// import SubscriptionHeader from 'src/views/apps/subscription/plans/SubscriptionHeader'
import SubscriptionFilters from 'src/views/apps/subscription/plans/SubscriptionFilters'
import SubscriptionTable from 'src/views/apps/subscription/plans/SubscriptionTable'
import CreateSubscriptionDialog from 'src/views/apps/subscription/plans/CreateSubscriptionDialog'
import EditSubscriptionDialog from 'src/views/apps/subscription/plans/EditSubscriptionDialog'

// ** Dummy Data
const initialData = [
  {
    id: 1,
    srNo: 1,
    module: 'Payment Gateway',
    name: 'Basic Plan',
    amount: 49.99,
    type: 'Monthly',
    isAddonPackage: false,
    slipCount: null,
    subscriptionModule: null,
    description: 'Basic payment gateway services for small businesses'
  },
  {
    id: 2,
    srNo: 2,
    module: 'Payment Gateway',
    name: 'Pro Plan',
    amount: 99.99,
    type: 'Monthly',
    isAddonPackage: false,
    slipCount: null,
    subscriptionModule: null,
    description: 'Advanced payment gateway with analytics'
  },
  {
    id: 3,
    srNo: 3,
    module: 'Escrow Service',
    name: 'Standard Escrow',
    amount: 149.99,
    type: 'Monthly',
    isAddonPackage: false,
    slipCount: null,
    subscriptionModule: null,
    description: 'Secure escrow services for transactions'
  },
  {
    id: 4,
    srNo: 4,
    module: 'Wire Transfer',
    name: 'Wire Plus',
    amount: 79.99,
    type: 'Monthly',
    isAddonPackage: true,
    slipCount: 5,
    subscriptionModule: 'Dock Basic - monthly',
    description: 'Additional wire transfer features'
  },
  {
    id: 5,
    srNo: 5,
    module: 'Card Processing',
    name: 'Card Premium',
    amount: 199.99,
    type: 'Monthly',
    isAddonPackage: false,
    slipCount: null,
    subscriptionModule: null,
    description: 'Premium card processing with lower fees'
  }
]

const SubscriptionPlans = () => {
  const router = useRouter()
  const [data, setData] = useState(initialData)
  const [searchValue, setSearchValue] = useState('')
  const [moduleFilter, setModuleFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState(null)

  const handleRefresh = () => {
    setData(initialData)
  }

  const handleDiscountCode = () => {
    router.push('/apps/subscription/discount-code')
  }

  const handleCreateSubscription = (newSubscription) => {
    const newData = {
      id: data.length + 1,
      srNo: data.length + 1,
      ...newSubscription
    }
    setData(prev => [newData, ...prev])
  }

  const handleEdit = (row) => {
    setSelectedSubscription(row)
    setEditDialogOpen(true)
  }

  const handleUpdateSubscription = (updatedSubscription) => {
    setData(prev => prev.map(item => 
      item.id === updatedSubscription.id ? updatedSubscription : item
    ))
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      setData(prev => prev.filter(item => item.id !== id))
    }
  }

  const filteredData = data.filter(item => {
    const matchesSearch = searchValue 
      ? item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.module.toLowerCase().includes(searchValue.toLowerCase())
      : true
    const matchesModule = moduleFilter ? item.module === moduleFilter : true
    const matchesType = typeFilter ? item.type === typeFilter : true
    return matchesSearch && matchesModule && matchesType
  })

  return (
    <Box>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <Typography variant='h4' sx={{ fontWeight: 600, mb: 1 }}>
                  Manage Subscription
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Create and manage subscription plans for your business
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={handleDiscountCode}
                  startIcon={<Icon icon='tabler:code' />}
                  sx={{ textTransform: 'none' }}
                >
                  Discount Code
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => setCreateDialogOpen(true)}
                  startIcon={<Icon icon='tabler:plus' />}
                  sx={{ textTransform: 'none' }}
                >
                  Create Subscription
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <SubscriptionFilters 
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            moduleFilter={moduleFilter}
            onModuleChange={setModuleFilter}
            typeFilter={typeFilter}
            onTypeChange={setTypeFilter}
          />
        </Grid>

        <Grid item xs={12}>
          <SubscriptionTable 
            data={filteredData}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Grid>
      </Grid>

      <CreateSubscriptionDialog 
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onSubmit={handleCreateSubscription}
      />

      <EditSubscriptionDialog 
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSubmit={handleUpdateSubscription}
        initialData={selectedSubscription}
      />
    </Box>
  )
}

export default SubscriptionPlans