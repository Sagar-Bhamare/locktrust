import React, { useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import WiresListTable from 'src/views/pages/wire-management/WiresListTable'

// ** Dummy Data
const outgoingDomesticData = [
  { id: 1, nickName: 'John Account', bankName: 'Chase Bank', accountNumber: '****1234', totalAmount: 5000, status: 'processed' },
  { id: 2, nickName: 'Sarah Business', bankName: 'Bank of America', accountNumber: '****5678', totalAmount: 12500, status: 'in_process' },
  { id: 3, nickName: 'Mike Corp', bankName: 'Wells Fargo', accountNumber: '****9012', totalAmount: 3500, status: 'processed' }
]

const outgoingInternationalData = [
  { id: 1, nickName: 'UK Client', bankName: 'Barclays Bank', accountNumber: '****4321', totalAmount: 8000, status: 'processed' },
  { id: 2, nickName: 'EU Partner', bankName: 'Deutsche Bank', accountNumber: '****8765', totalAmount: 15000, status: 'in_process' },
  { id: 3, nickName: 'Asia Supplier', bankName: 'HSBC', accountNumber: '****3456', totalAmount: 6200, status: 'processed' }
]

const ViewWiresList = () => {
  const router = useRouter()

  // ** State
  const [tabValue, setTabValue] = useState('domestic')

  // ** Handlers
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Box>
      <Grid container spacing={6}>

        {/* Header */}
        <Grid item xs={12}>
          <Card sx={{ p: 4, borderRadius: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2
              }}
            >
              <Typography variant='h5' sx={{ fontWeight: 600 }}>
                Wire Transactions
              </Typography>

              <Button
                variant='outlined'
                color='secondary'
                onClick={() => router.back()}
                startIcon={<Icon icon='tabler:arrow-left' />}
                sx={{ textTransform: 'none' }}
              >
                Back
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* Tabs Section */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 2 }}>

            <TabContext value={tabValue}>

              {/* Tabs */}
              <Box
                sx={{
                  px: 4,
                  pt: 2,
                  borderBottom: 1,
                  borderColor: 'divider'
                }}
              >
                <TabList onChange={handleTabChange}>
                  <Tab value='domestic' label='Outgoing Domestic Wires' />
                  <Tab value='international' label='Outgoing International Wires' />
                </TabList>
              </Box>

              {/* Tab Content */}
              <TabPanel value='domestic' sx={{ p: 4 }}>
                <WiresListTable data={outgoingDomesticData} />
              </TabPanel>

              <TabPanel value='international' sx={{ p: 4 }}>
                <WiresListTable data={outgoingInternationalData} />
              </TabPanel>

            </TabContext>
          </Card>
        </Grid>

      </Grid>
    </Box>
  )
}

export default ViewWiresList