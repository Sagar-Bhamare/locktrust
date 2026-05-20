import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const CrmFilters = ({
  searchValue,
  onSearchChange,
  crmFilter,
  onCrmChange,
  statusFilter,
  onStatusChange,
  crmNames
}) => {
  return (
    <Card>
      <CardHeader title='Filters' />
      <Box sx={{ p: 5, pt: 0 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              size='small'
              placeholder='Search by Wallet ID, Username or Email'
              value={searchValue}
              onChange={e => onSearchChange(e.target.value)}
              InputProps={{
                startAdornment: <Icon icon='tabler:search' fontSize={20} style={{ marginRight: 8 }} />
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size='small'>
              <InputLabel>CRM Name</InputLabel>
              <Select value={crmFilter} label='CRM Name' onChange={e => onCrmChange(e.target.value)}>
                <MenuItem value=''>All CRMs</MenuItem>
                {crmNames.map(crm => (
                  <MenuItem key={crm} value={crm}>
                    {crm}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size='small'>
              <InputLabel>Status</InputLabel>
              <Select value={statusFilter} label='Status' onChange={e => onStatusChange(e.target.value)}>
                <MenuItem value=''>All</MenuItem>
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='inactive'>Inactive</MenuItem>
                <MenuItem value='suspended'>Suspended</MenuItem>
                <MenuItem value='pending'>Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
}

export default CrmFilters
