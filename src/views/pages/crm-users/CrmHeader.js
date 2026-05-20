import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const CrmHeader = ({ onResetData }) => {
  return (
    <Card>
      <CardHeader title='CRM Users Management' subheader='Manage and monitor all CRM user subscriptions and addons' />
      <Box sx={{ p: 5, pt: 0, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        <Button variant='outlined' color='secondary' onClick={onResetData} startIcon={<Icon icon='tabler:refresh' />}>
          Reset Demo Data
        </Button>
      </Box>
    </Card>
  )
}

export default CrmHeader
