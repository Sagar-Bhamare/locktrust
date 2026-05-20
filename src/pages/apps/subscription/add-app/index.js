import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import AppFilters from 'src/views/apps/subscription/add-app/AppFilters'
import AppTable from 'src/views/apps/subscription/add-app/AppTable'
import CreateAppDialog from 'src/views/apps/subscription/add-app/CreateAppDialog'
import EditAppDialog from 'src/views/apps/subscription/add-app/EditAppDialog'

// ** Dummy Data
const initialData = [
  {
    id: 1,
    srNo: 1,
    name: 'Marina One',
    modules: [
      { name: 'Ledger', isDefault: true },
      { name: 'Inverse Rent Roll', isDefault: false },
      { name: 'Branch Management', isDefault: true },
      { name: 'Dashboard', isDefault: false },
      { name: 'Crm Setting', isDefault: true },
      { name: 'Accounting', isDefault: false },
      { name: 'Sales', isDefault: true },
      { name: 'Qr Code Generator', isDefault: false },
      { name: 'Rent Roll', isDefault: true },
      { name: 'Room Management', isDefault: false },
      { name: 'Event Management', isDefault: true },
      { name: 'Parking Pass', isDefault: false },
      { name: 'Pos', isDefault: true },
      { name: 'User Management', isDefault: false },
      { name: 'Slip Management', isDefault: true }
    ]
  },
  {
    id: 2,
    srNo: 2,
    name: 'Harbor View',
    modules: [
      { name: 'Ledger', isDefault: true },
      { name: 'Dashboard', isDefault: true },
      { name: 'Accounting', isDefault: false },
      { name: 'Sales', isDefault: true },
      { name: 'User Management', isDefault: false }
    ]
  },
  {
    id: 3,
    srNo: 3,
    name: 'Sunset Tower',
    modules: [
      { name: 'Ledger', isDefault: false },
      { name: 'Branch Management', isDefault: true },
      { name: 'Crm Setting', isDefault: true },
      { name: 'Rent Roll', isDefault: false },
      { name: 'Event Management', isDefault: true }
    ]
  }
]

const AddApp = () => {
  const [data, setData] = useState(initialData)
  const [searchValue, setSearchValue] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedApp, setSelectedApp] = useState(null)

  const handleRefresh = () => {
    setData(initialData)
  }

  const handleCreateApp = (newApp) => {
    const newData = {
      id: data.length + 1,
      srNo: data.length + 1,
      name: newApp.name,
      modules: newApp.modules
    }
    setData(prev => [newData, ...prev])
  }

  const handleEdit = (row) => {
    setSelectedApp(row)
    setEditDialogOpen(true)
  }

  const handleUpdateApp = (updatedApp) => {
    setData(prev => prev.map(item => 
      item.id === updatedApp.id ? updatedApp : item
    ))
  }

  const filteredData = data.filter(item => {
    const matchesSearch = searchValue 
      ? item.name.toLowerCase().includes(searchValue.toLowerCase())
      : true
    return matchesSearch
  })

  return (
    <Box>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <Typography variant='h4' sx={{ fontWeight: 600, mb: 1 }}>
                  Manage App Store
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Create and manage applications with module configurations
                </Typography>
              </Box>
              <Button
                variant='contained'
                color='primary'
                onClick={() => setCreateDialogOpen(true)}
                startIcon={<Icon icon='tabler:plus' />}
                sx={{ textTransform: 'none' }}
              >
                Create App
              </Button>
            </Box>
          </Card>
        </Grid>


        <Grid item xs={12}>
          <AppFilters 
            searchValue={searchValue}
            onSearchChange={setSearchValue}
          />
        </Grid>

        <Grid item xs={12}>
          <AppTable 
            data={filteredData}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
            onEdit={handleEdit}
          />
        </Grid>
      </Grid>

      <CreateAppDialog 
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onSubmit={handleCreateApp}
      />

      <EditAppDialog 
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSubmit={handleUpdateApp}
        initialData={selectedApp}
      />
    </Box>
  )
}

export default AddApp


