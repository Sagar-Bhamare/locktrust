import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputAdornment from '@mui/material/InputAdornment'

const OtherFees = ({ data, onUpdate }) => {
  const feeItems = [
    { key: 'achReturns', label: 'ACH Returns' },
    { key: 'achChargebacks', label: 'ACH Chargebacks' },
    { key: 'stopPayments', label: 'Stop Payments' }
  ]

  return (
    <Card>
      <CardHeader title='Other Fees' subheader='Additional fees for special cases' />
      <Box sx={{ p: 5 }}>
        <Grid container spacing={4}>
          {feeItems.map(item => (
            <Grid item xs={12} md={4} key={item.key}>
              <TextField
                fullWidth
                label={item.label}
                type='number'
                value={data[item.key]}
                onChange={e => onUpdate(item.key, e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>$</InputAdornment>
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Card>
  )
}

export default OtherFees
