import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Icon from 'src/@core/components/icon'

const PrepaidCardFilters = ({ searchValue, onSearchChange, statusFilter, onStatusChange }) => {
  return (
    <Card sx={{ p: 3, borderRadius: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size='small'
            placeholder='Search by User Name, Wallet ID or Email'
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
              <MenuItem value='pending'>Pending</MenuItem>
              <MenuItem value='approved'>Approved</MenuItem>
              <MenuItem value='rejected'>Rejected</MenuItem>
              <MenuItem value='more_info'>More Info Required</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Card>
  )
}

export default PrepaidCardFilters
