import React, { useState, Fragment } from 'react'

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
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Credit Card Components
import Payment from 'payment'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'

// ** Utils
import { formatCVC, formatExpirationDate, formatCreditCardNumber } from 'src/@core/utils/format'

const AddCardDialog = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    nameOnCard: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardType: 'Visa',
    issuingBank: '',
    allotted: 0
  })
  const [focus, setFocus] = useState()
  const [errors, setErrors] = useState({})

  const handleInputChange = ({ target }) => {
    let value = target.value
    if (target.name === 'cardNumber') {
      value = formatCreditCardNumber(value, Payment)
    } else if (target.name === 'expiryDate') {
      value = formatExpirationDate(value)
    } else if (target.name === 'cvv') {
      value = formatCVC(value, formData.cardNumber, Payment)
    }

    setFormData(prev => ({ ...prev, [target.name]: value }))
    if (errors[target.name]) {
      setErrors(prev => ({ ...prev, [target.name]: '' }))
    }
  }

  const handleBlur = () => setFocus(undefined)
  const handleFocus = e => setFocus(e.target.name)

  const validate = () => {
    const newErrors = {}
    if (!formData.nameOnCard) newErrors.nameOnCard = 'Name on card is required'
    if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required'
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required'
    if (!formData.cvv) newErrors.cvv = 'CVV is required'
    if (!formData.issuingBank) newErrors.issuingBank = 'Issuing bank is required'
    if (formData.allotted < 0) newErrors.allotted = 'Allotted amount cannot be negative'
    return newErrors
  }

  const handleSubmit = () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    onSubmit(formData)
    setFormData({
      nameOnCard: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardType: 'Visa',
      issuingBank: '',
      allotted: 0
    })
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          Add New Card
          <IconButton onClick={onClose}>
            <Icon icon='tabler:x' />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Name on Card'
                  name='nameOnCard'
                  value={formData.nameOnCard}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  error={!!errors.nameOnCard}
                  helperText={errors.nameOnCard}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Card Number'
                  name='cardNumber'
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder='0000 0000 0000 0000'
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label='Expiry Date'
                  name='expiryDate'
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder='MM/YY'
                  error={!!errors.expiryDate}
                  helperText={errors.expiryDate}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label='CVV'
                  name='cvv'
                  value={formData.cvv}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder='123'
                  error={!!errors.cvv}
                  helperText={errors.cvv}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Card Type</InputLabel>
                  <Select name='cardType' value={formData.cardType} label='Card Type' onChange={handleInputChange}>
                    <MenuItem value='Visa'>Visa</MenuItem>
                    <MenuItem value='Mastercard'>Mastercard</MenuItem>
                    <MenuItem value='Amex'>American Express</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Issuing Bank'
                  name='issuingBank'
                  value={formData.issuingBank}
                  onChange={handleInputChange}
                  error={!!errors.issuingBank}
                  helperText={errors.issuingBank}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Allotted Amount'
                  name='allotted'
                  type='number'
                  value={formData.allotted}
                  onChange={handleInputChange}
                  InputProps={{ startAdornment: '$' }}
                  error={!!errors.allotted}
                  helperText={errors.allotted}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label='Save Card for future use?'
                  sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Cards
                cvc={formData.cvv}
                focused={focus}
                expiry={formData.expiryDate}
                name={formData.nameOnCard}
                number={formData.cardNumber}
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='secondary'>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant='contained'>
          Add Card
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddCardDialog
