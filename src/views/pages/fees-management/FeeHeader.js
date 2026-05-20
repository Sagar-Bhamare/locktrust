import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const FeeHeader = ({ onReset }) => {
  return (
    <Card>
      <CardHeader title='Fees Management' subheader='Configure and manage transaction fees for all payment methods' />
      <Box sx={{ p: 5, pt: 0, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        <Button variant='outlined' color='secondary' onClick={onReset} startIcon={<Icon icon='tabler:refresh' />}>
          Reset to Default
        </Button>
      </Box>
    </Card>
  )
}

export default FeeHeader
