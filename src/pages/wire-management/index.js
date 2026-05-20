import React, { useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

// ** Custom Components
import WireHeader from 'src/views/pages/wire-management/WireHeader'
import DomesticBeneficiaryTable from 'src/views/pages/wire-management/DomesticBeneficiaryTable'
import InternationalBeneficiaryTable from 'src/views/pages/wire-management/InternationalBeneficiaryTable'

// ** Dummy Data
const initialDomesticData = [
  {
    id: 1,
    nickName: 'John Account',
    bankName: 'Chase Bank',
    accountNumber: '****1234',
    routingNumber: '021000021'
  },
  {
    id: 2,
    nickName: 'Sarah Business',
    bankName: 'Bank of America',
    accountNumber: '****5678',
    routingNumber: '026009593'
  },
  {
    id: 3,
    nickName: 'Mike Corp',
    bankName: 'Wells Fargo',
    accountNumber: '****9012',
    routingNumber: '121000248'
  }
]

const initialInternationalData = [
  {
    id: 1,
    nickName: 'UK Client',
    bankName: 'Barclays Bank',
    accountNumber: '****4321',
    swiftCode: 'BARCGB22'
  },
  {
    id: 2,
    nickName: 'EU Partner',
    bankName: 'Deutsche Bank',
    accountNumber: '****8765',
    swiftCode: 'DEUTDEFF'
  },
  {
    id: 3,
    nickName: 'Asia Supplier',
    bankName: 'HSBC Hong Kong',
    accountNumber: '****3456',
    swiftCode: 'HSBCHKHH'
  }
]

const Wire = () => {
  const router = useRouter()

  // ** State
  const [tabValue, setTabValue] = useState('domestic')
  const [domesticData, setDomesticData] = useState(initialDomesticData)
  const [internationalData, setInternationalData] = useState(initialInternationalData)

  // ** Handlers
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleAddDomestic = data => {
    const newBeneficiary = {
      id: domesticData.length + 1,
      nickName: data.nickname,
      bankName: data.bankName,
      accountNumber: `****${data.accountNumber.slice(-4)}`,
      routingNumber: data.routingNumber
    }
    setDomesticData(prev => [newBeneficiary, ...prev])
  }

  const handleAddInternational = data => {
    const newBeneficiary = {
      id: internationalData.length + 1,
      nickName: data.nickname,
      bankName: data.bankName,
      accountNumber: `****${data.accountNumber.slice(-4)}`,
      swiftCode: data.swiftCode
    }
    setInternationalData(prev => [newBeneficiary, ...prev])
  }

  const handleViewWires = () => {
    router.push('/wire-management/view-wires-list')
  }

  return (
    <Box>
      <Grid container spacing={6}>
        
        {/* Header Section */}
        <Grid item xs={12}>
          <WireHeader
            onAddDomestic={handleAddDomestic}
            onAddInternational={handleAddInternational}
            onViewWires={handleViewWires}
          />
        </Grid>

        {/* Tabs Section */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 2 }}>

            <TabContext value={tabValue}>

              {/* Tabs */}
              <Box
                sx={{
                  pt: 2,
                  borderBottom: 1,
                  borderColor: 'divider'
                }}
              >
                <TabList onChange={handleTabChange}>
                  <Tab value='domestic' label='Domestic Beneficiaries' />
                  <Tab value='international' label='International Beneficiaries' />
                </TabList>
              </Box>

              {/* Tab Content */}
              <TabPanel value='domestic' sx={{ p: 4 }}>
                <DomesticBeneficiaryTable data={domesticData} />
              </TabPanel>

              <TabPanel value='international' sx={{ p: 4 }}>
                <InternationalBeneficiaryTable data={internationalData} />
              </TabPanel>

            </TabContext>
          </Card>
        </Grid>

      </Grid>
    </Box>
  )
}

Wire.acl = {
  action: 'read',
  subject: 'wire-page'
}


export default Wire