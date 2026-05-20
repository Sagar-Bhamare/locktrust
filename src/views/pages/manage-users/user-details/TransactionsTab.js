import React, { SyntheticEvent, useState } from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

// ** Sub Components
import InvoiceTransactions from './transactions/InvoiceTransactions'
import WalletTransactions from './transactions/WalletTransactions'
import EscrowTransaction from './transactions/EscrowTransaction'


const TransactionsTab = ({ user }) => {
  const [value, setValue] = useState('invoice')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper', py: 2, px: 2}}>
      <TabContext value={value}>
        <TabList  onChange={handleChange} aria-label='transaction tabs'>
          <Tab label='Invoice Transaction' value='invoice' />
          <Tab label='Wallet Transaction' value='wallet' />
          <Tab label='Escrow Transaction' value='escrow' />
        </TabList>
        <TabPanel value='invoice' sx={{ p: 0 }}>
          <InvoiceTransactions user={user} />
        </TabPanel>
        <TabPanel value='wallet' sx={{ p: 0 }}>
          <WalletTransactions user={user} />
        </TabPanel>
           <TabPanel value='escrow' sx={{ p: 0 }}>
          <EscrowTransaction user={user} />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default TransactionsTab