import React, { SyntheticEvent, useState } from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

// ** Sub Components
import SenderOverdueInvoice from './SenderOverdueInvoice'
import ReceiverOverdueInvoice from './ReceiverOverdueInvoice'

const InvoiceDue = ({ user, fromDate, toDate, searchValue }) => {
  const [value, setValue] = useState('sender')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper', py: 3}}>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='overdue invoice tabs'>
          <Tab label='Sender Overdue Invoice' value='sender' />
          <Tab label='Receiver Overdue Invoice' value='receiver' />
        </TabList>
        <TabPanel value='sender' sx={{ p: 0 }}>
          <SenderOverdueInvoice user={user} fromDate={fromDate} toDate={toDate} searchValue={searchValue} />
        </TabPanel>
        <TabPanel value='receiver' sx={{ p: 0 }}>
          <ReceiverOverdueInvoice user={user} fromDate={fromDate} toDate={toDate} searchValue={searchValue} />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default InvoiceDue