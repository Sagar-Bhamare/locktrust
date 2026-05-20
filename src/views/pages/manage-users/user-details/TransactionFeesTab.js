import React, { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Toast
import toast from 'react-hot-toast'

const TransactionFeesTab = ({ user }) => {
  const [isConfirmed, setIsConfirmed] = useState(false)
  
  // Fee data state
  const [incomingFees, setIncomingFees] = useState({
    ach: { percentage: 1.25, fixed: 0 },
    wire: { percentage: 0, fixed: 0 },
    rtpFednow: { percentage: 1.70, fixed: 1 },
    zelle: { percentage: 1.70, fixed: 1 },
    cards: { percentage: 0, fixed: 0 },
    wallet: { percentage: 0, fixed: 0 },
    invoice: { percentage: 0, fixed: 0 },
    escrow: { percentage: 1.95, fixed: 0 },
    billPayment: { percentage: 0, fixed: 0 },
    voucher: { percentage: 0, fixed: 0 },
    check21: { percentage: 0, fixed: 0 },
    sepaPayment: { percentage: 0, fixed: 0 }
  })

  const [outgoingFees, setOutgoingFees] = useState({
    ach: { percentage: 1.25, fixed: 0 },
    wire: { percentage: 0, fixed: 0 },
    rtpFednow: { percentage: 1.75, fixed: 0 },
    zelle: { percentage: 0, fixed: 0 },
    cards: { percentage: 1.70, fixed: 0 },
    wallet: { percentage: 0, fixed: 0 },
    invoice: { percentage: 0, fixed: 0 },
    escrow: { percentage: 1.95, fixed: 0 },
    billPayment: { percentage: 0, fixed: 0 },
    voucher: { percentage: 0, fixed: 0 },
    check21: { percentage: 0, fixed: 0 },
    sepaPayment: { percentage: 0, fixed: 0 },
    escrowCancellation: { percentage: 0.25, fixed: 2.95 }
  })

  const [escrowTiers, setEscrowTiers] = useState([
    { min: 0, max: 5000, fee: 2.5, note: 'Ideal for small transactions' },
    { min: 5001, max: 25000, fee: 2.0, note: '' },
    { min: 25001, max: 100000, fee: 1.5, note: 'Volume discounts apply' },
    { min: 100001, max: 500000, fee: 1.0, note: '' },
    { min: 500001, max: null, fee: 0.5, note: 'Contact sales for high-value deals' }
  ])

  const updateIncomingFee = (key, field, value) => {
    setIncomingFees(prev => ({
      ...prev,
      [key]: { ...prev[key], [field]: parseFloat(value) || 0 }
    }))
    setIsConfirmed(false)
  }

  const updateOutgoingFee = (key, field, value) => {
    setOutgoingFees(prev => ({
      ...prev,
      [key]: { ...prev[key], [field]: parseFloat(value) || 0 }
    }))
    setIsConfirmed(false)
  }

  const handleUpdateFees = () => {
    if (!isConfirmed) {
      toast.error('Please confirm that you want to assign these fees to all users except special users')
      return
    }
    toast.success(`Fees updated successfully for ${user.nameOnWallet}!`)
    setIsConfirmed(false)
  }

  const formatRange = (min, max) => {
    if (max === null) return `$${min.toLocaleString()}+`
    return `$${min.toLocaleString()} – $${max.toLocaleString()}`
  }

  return (
    <Box>
      <Typography variant='h6' sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Icon icon='tabler:wallet' /> Wallet ID: {user.walletId}
      </Typography>

      <Grid container spacing={4}>
        {/* Incoming Fees */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant='h6' sx={{ mb: 2 }}>Incoming Fees</Typography>
            <TableContainer>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell align='right'>% Fee</TableCell>
                    <TableCell align='right'>Fixed Fee (USD)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(incomingFees).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</TableCell>
                      <TableCell align='right'>
                        <TextField
                          size='small'
                          type='number'
                          value={value.percentage}
                          onChange={(e) => updateIncomingFee(key, 'percentage', e.target.value)}
                          InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                          sx={{ width: 100 }}
                        />
                      </TableCell>
                      <TableCell align='right'>
                        <TextField
                          size='small'
                          type='number'
                          value={value.fixed}
                          onChange={(e) => updateIncomingFee(key, 'fixed', e.target.value)}
                          InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                          sx={{ width: 100 }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* Outgoing Fees */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant='h6' sx={{ mb: 2 }}>Outgoing Fees</Typography>
            <TableContainer>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell align='right'>% Fee</TableCell>
                    <TableCell align='right'>Fixed Fee (USD)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(outgoingFees).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</TableCell>
                      <TableCell align='right'>
                        <TextField
                          size='small'
                          type='number'
                          value={value.percentage}
                          onChange={(e) => updateOutgoingFee(key, 'percentage', e.target.value)}
                          InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                          sx={{ width: 100 }}
                        />
                      </TableCell>
                      <TableCell align='right'>
                        <TextField
                          size='small'
                          type='number'
                          value={value.fixed}
                          onChange={(e) => updateOutgoingFee(key, 'fixed', e.target.value)}
                          InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                          sx={{ width: 100 }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* Escrow Fees */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant='h6' sx={{ mb: 2 }}>Escrow Fees</Typography>
            <TableContainer>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Transaction Amount (USD)</TableCell>
                    <TableCell align='center'>Standard Fee (%)</TableCell>
                    <TableCell>Notes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {escrowTiers.map((tier, index) => (
                    <TableRow key={index}>
                      <TableCell>{formatRange(tier.min, tier.max)}</TableCell>
                      <TableCell align='center'>
                        <TextField
                          size='small'
                          type='number'
                          value={tier.fee}
                          onChange={(e) => {
                            const newTiers = [...escrowTiers]
                            newTiers[index].fee = parseFloat(e.target.value) || 0
                            setEscrowTiers(newTiers)
                            setIsConfirmed(false)
                          }}
                          InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                          sx={{ width: 100 }}
                        />
                      </TableCell>
                      <TableCell>
                        {tier.note && <Typography variant='caption' color='text.secondary'>{tier.note}</Typography>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* Transaction Limits */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant='h6' sx={{ mb: 2 }}>Transaction Limits</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant='caption' color='text.secondary'>Instant Transfer for Bank</Typography>
                <Typography variant='body1'>Per Transaction: 10,000 USD</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant='caption' color='text.secondary'>Instant Transfer for Card</Typography>
                <Typography variant='body1'>Per Transaction: 10,000 USD</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant='caption' color='text.secondary'>Per Month Limit</Typography>
                <Typography variant='body1'>150,000 USD</Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* Other Fees */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant='h6' sx={{ mb: 2 }}>Other Fees</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant='caption' color='text.secondary'>ACH Returns</Typography>
                <Typography variant='body1'>25 USD</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant='caption' color='text.secondary'>ACH Chargebacks</Typography>
                <Typography variant='body1'>45 USD</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant='caption' color='text.secondary'>Stop Payments</Typography>
                <Typography variant='body1'>35 USD</Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* Update Fees Section */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant='body2'>
                <strong>Note:</strong> These fees will be applied to {user.nameOnWallet}'s account
              </Typography>
            </Alert>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
              <FormControlLabel
                control={<Checkbox checked={isConfirmed} onChange={(e) => setIsConfirmed(e.target.checked)} />}
                label="I confirm that I want to assign these fees to this user"
              />
              <Button
                variant='contained'
                color='primary'
                onClick={handleUpdateFees}
                disabled={!isConfirmed}
                startIcon={<Icon icon='tabler:device-floppy' />}
              >
                Update Fees for {user.nameOnWallet}
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TransactionFeesTab