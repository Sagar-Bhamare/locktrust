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

const EscrowFilters = ({ searchValue, onSearchChange, escrowTypeFilter, onEscrowTypeChange }) => {
  return (
    <Card sx={{ p: 3, borderRadius: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size='small'
            placeholder='Search by From Wallet, To Wallet or Name...'
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            InputProps={{
              startAdornment: <Icon icon='tabler:search' fontSize={20} style={{ marginRight: 8 }} />
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size='small'>
            <InputLabel>Escrow Type</InputLabel>
            <Select
              value={escrowTypeFilter}
              label='Escrow Type'
              onChange={(e) => onEscrowTypeChange(e.target.value)}
            >
              <MenuItem value=''>All</MenuItem>
              <MenuItem value='Single Escrow'>Single Escrow</MenuItem>
              <MenuItem value='Multi Party Escrow'>Multi Party Escrow</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Card>
  )
}

export default EscrowFilters