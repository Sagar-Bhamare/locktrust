import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const RemoteDepositFilters = ({ searchValue, onSearchChange }) => {
  return (
    <Card sx={{ p: 3, borderRadius: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size='small'
            placeholder='Search by First Name, Last Name, City or State...'
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            InputProps={{
              startAdornment: <Icon icon='tabler:search' fontSize={20} style={{ marginRight: 8 }} />
            }}
          />
        </Grid>
      </Grid>
    </Card>
  )
}

export default RemoteDepositFilters