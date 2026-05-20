import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const MerchantFilters = ({ searchValue, onSearchChange, statusFilter, onStatusChange }) => {
  return (
    <Card sx={{ p: 3, borderRadius: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size='small'
            placeholder='Search by Business Name, Trade Name or Tax Number...'
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            InputProps={{
              startAdornment: <Icon icon='tabler:search' fontSize={20} style={{ marginRight: 8 }} />
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size='small'>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label='Status'
              onChange={(e) => onStatusChange(e.target.value)}
            >
              <MenuItem value=''>All</MenuItem>
              <MenuItem value='active'>Active</MenuItem>
              <MenuItem value='pending'>Pending</MenuItem>
              <MenuItem value='inactive'>Inactive</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Card>
  )
}

export default MerchantFilters