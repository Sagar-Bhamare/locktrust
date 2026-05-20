import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputAdornment from '@mui/material/InputAdornment'
import Divider from '@mui/material/Divider'

const TransactionLimits = ({ data, onUpdate }) => {
  return (
    <Card>
      <CardHeader title='Transaction Limits' subheader='Daily, monthly and per-transaction limits' />
      <Box sx={{ p: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant='subtitle2' sx={{ mb: 2, fontWeight: 600 }}>
              Instant Transfer Limits
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label='Bank - Per Transaction'
              type='number'
              value={data.instantTransferBank.perTransaction}
              onChange={e => onUpdate('instantTransferBank', 'perTransaction', e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position='start'>$</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label='Card - Per Transaction'
              type='number'
              value={data.instantTransferCard.perTransaction}
              onChange={e => onUpdate('instantTransferCard', 'perTransaction', e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position='start'>$</InputAdornment>
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant='subtitle2' sx={{ mb: 2, fontWeight: 600 }}>
              Overall Limits
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label='Per Day Limit'
              type='number'
              value={data.perDay.amount}
              onChange={e => onUpdate('perDay', 'amount', e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position='start'>$</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label='Per Month Limit'
              type='number'
              value={data.perMonth.amount}
              onChange={e => onUpdate('perMonth', 'amount', e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position='start'>$</InputAdornment>
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
}

export default TransactionLimits
