import React, { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const LoanCardDialog = ({ open, onClose, onSubmit, cards }) => {
  const [formData, setFormData] = useState({
    cardId: '',
    amount: 0,
    notes: ''
  })
  const [errors, setErrors] = useState({})

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.cardId) newErrors.cardId = 'Please select a card'
    if (!formData.amount || formData.amount <= 0) newErrors.amount = 'Amount must be greater than 0'
    return newErrors
  }

  const handleSubmit = () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    onSubmit(formData)
    setFormData({ cardId: '', amount: 0, notes: '' })
    onClose()
  }

  const selectedCard = cards.find(card => card.id === parseInt(formData.cardId))

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          Loan to Card
          <IconButton onClick={onClose}>
            <Icon icon='tabler:x' />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={4} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Select Card</InputLabel>
              <Select
                name='cardId'
                value={formData.cardId}
                label='Select Card'
                onChange={handleChange}
                error={!!errors.cardId}
              >
                <MenuItem value=''>Select a card</MenuItem>
                {cards.map(card => (
                  <MenuItem key={card.id} value={card.id}>
                    {card.cardNumber} - {card.nameOnCard} (Balance: ${card.balance})
                  </MenuItem>
                ))}
              </Select>
              {errors.cardId && <Box sx={{ color: 'error.main', fontSize: '0.75rem', mt: 1 }}>{errors.cardId}</Box>}
            </FormControl>
          </Grid>
          {selectedCard && (
            <>
              <Grid item xs={12}>
                <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant='body2'>Current Balance:</Typography>
                    <Typography variant='body2' sx={{ fontWeight: 600 }}>
                      ${selectedCard.balance}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='body2'>Allotted Amount:</Typography>
                    <Typography variant='body2' sx={{ fontWeight: 600 }}>
                      ${selectedCard.allotted}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Loan Amount'
              name='amount'
              type='number'
              value={formData.amount}
              onChange={handleChange}
              InputProps={{ startAdornment: '$' }}
              error={!!errors.amount}
              helperText={errors.amount}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Notes (Optional)'
              name='notes'
              multiline
              rows={3}
              value={formData.notes}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='secondary'>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant='contained' color='warning'>
          Loan Amount
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LoanCardDialog
