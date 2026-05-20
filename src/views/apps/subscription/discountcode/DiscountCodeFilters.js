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

const DiscountCodeFilters = ({ searchValue, onSearchChange, moduleFilter, onModuleChange }) => {
  const modules = ['Payment Gateway', 'Escrow Service', 'Wire Transfer', 'Card Processing']

  return (
    <Card sx={{ p: 3, borderRadius: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size='small'
            placeholder='Search by Discount Code, Module or Subscription...'
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            InputProps={{
              startAdornment: <Icon icon='tabler:search' fontSize={20} style={{ marginRight: 8 }} />
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size='small'>
            <InputLabel>Module</InputLabel>
            <Select
              value={moduleFilter}
              label='Module'
              onChange={(e) => onModuleChange(e.target.value)}
            >
              <MenuItem value=''>All Modules</MenuItem>
              {modules.map(module => (
                <MenuItem key={module} value={module}>{module}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Card>
  )
}

export default DiscountCodeFilters