import React, { SyntheticEvent, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Sub Components
import InvoiceSent from './InvoiceSent'
import InvoiceReceived from './InvoiceReceived'
import PendingInvoices from './PendingInvoices'
import RecurringInvoices from './RecurringInvoices'
import PaidInvoices from './PaidInvoices'
import CancelledInvoices from './CancelledInvoices'
import InvoiceDue from './InvoiceDue'

const InvoiceTransactions = ({ user }) => {
  const [value, setValue] = useState('sent')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const clearFilters = () => {
    setFromDate('')
    setToDate('')
    setSearchValue('')
  }

  return (
    <Box>
      {/* Date Filter Section */}
      <Card sx={{ py: 6,px: 3,mb: 4 }}>
        <Grid container spacing={3} alignItems='center'>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              type='date'
              label='From'
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              size='small'
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              type='date'
              label='To'
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              size='small'
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              size='small'
              placeholder='Search by ID, To, or Item'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon='tabler:search' fontSize={20} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              fullWidth
              variant='outlined'
              color='secondary'
              onClick={clearFilters}
              startIcon={<Icon icon='tabler:refresh' />}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Invoice Type Tabs */}
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='invoice tabs'>
          <Tab label='Invoices Sent' value='sent' />
          <Tab label='Invoices Received' value='received' />
          <Tab label='Pending Invoices' value='pending' />
          <Tab label='Recurring Invoices' value='recurring' />
          <Tab label='Paid Invoices' value='paid' />
          <Tab label='Cancelled Invoices' value='cancelled' />
          <Tab label='Invoice Due' value='due' />
        </TabList>
        <TabPanel value='sent' sx={{ p: 0 }}>
          <InvoiceSent user={user} fromDate={fromDate} toDate={toDate} searchValue={searchValue} />
        </TabPanel>
        <TabPanel value='received' sx={{ p: 0 }}>
          <InvoiceReceived user={user} fromDate={fromDate} toDate={toDate} searchValue={searchValue} />
        </TabPanel>
        <TabPanel value='pending' sx={{ p: 0 }}>
          <PendingInvoices user={user} fromDate={fromDate} toDate={toDate} searchValue={searchValue} />
        </TabPanel>
        <TabPanel value='recurring' sx={{ p: 0 }}>
          <RecurringInvoices user={user} fromDate={fromDate} toDate={toDate} searchValue={searchValue} />
        </TabPanel>
        <TabPanel value='paid' sx={{ p: 0 }}>
          <PaidInvoices user={user} fromDate={fromDate} toDate={toDate} searchValue={searchValue} />
        </TabPanel>
        <TabPanel value='cancelled' sx={{ p: 0 }}>
          <CancelledInvoices user={user} fromDate={fromDate} toDate={toDate} searchValue={searchValue} />
        </TabPanel>
        <TabPanel value='due' sx={{ p: 0 }}>
          <InvoiceDue user={user} fromDate={fromDate} toDate={toDate} searchValue={searchValue} />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default InvoiceTransactions