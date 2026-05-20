import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Toast
import toast from 'react-hot-toast'

const InternationalBeneficiaryForm = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    recipientType: 'individual',
    beneficiaryName: '',
    nickname: '',
    country: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    swiftCode: '',
    bankName: '',
    bankAddress: '',
    bankCountry: '',
    internationalRoutingCode: '',
    accountNumber: '',
    confirmAccountNumber: ''
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.beneficiaryName) newErrors.beneficiaryName = 'Beneficiary Name is required'
    if (!formData.nickname) newErrors.nickname = 'Recipient Nickname is required'
    if (!formData.country) newErrors.country = 'Country is required'
    if (!formData.address) newErrors.address = 'Address is required'
    if (!formData.city) newErrors.city = 'City is required'
    if (!formData.state) newErrors.state = 'State/Province is required'
    if (!formData.zipCode) newErrors.zipCode = 'Zip Code is required'
    if (!formData.swiftCode) newErrors.swiftCode = 'Swift/Bank Identification Code is required'
    if (!formData.bankName) newErrors.bankName = 'Bank Name is required'
    if (!formData.bankAddress) newErrors.bankAddress = 'Bank Address is required'
    if (!formData.bankCountry) newErrors.bankCountry = 'Bank Country is required'
    if (!formData.accountNumber) newErrors.accountNumber = 'Account Number is required'
    if (formData.accountNumber !== formData.confirmAccountNumber) {
      newErrors.confirmAccountNumber = 'Account Numbers do not match'
    }
    return newErrors
  }

  const handleSubmit = () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    onSubmit(formData)
    toast.success('International beneficiary added successfully!')
    setFormData({
      recipientType: 'individual',
      beneficiaryName: '',
      nickname: '',
      country: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      swiftCode: '',
      bankName: '',
      bankAddress: '',
      bankCountry: '',
      internationalRoutingCode: '',
      accountNumber: '',
      confirmAccountNumber: ''
    })
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='h5' sx={{ fontWeight: 600 }}>International Recipient</Typography>
          <IconButton onClick={onClose}>
            <Icon icon='tabler:x' />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <FormLabel component="legend">Recipient Type</FormLabel>
            <RadioGroup row name="recipientType" value={formData.recipientType} onChange={handleChange}>
              <FormControlLabel value="individual" control={<Radio />} label="Individual" />
              <FormControlLabel value="business" control={<Radio />} label="Business" />
            </RadioGroup>
          </FormControl>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Beneficiary Name"
                name="beneficiaryName"
                value={formData.beneficiaryName}
                onChange={handleChange}
                error={!!errors.beneficiaryName}
                helperText={errors.beneficiaryName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Recipient Nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                error={!!errors.nickname}
                helperText={errors.nickname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                error={!!errors.country}
                helperText={errors.country}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                error={!!errors.city}
                helperText={errors.city}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State/Province/Region"
                name="state"
                value={formData.state}
                onChange={handleChange}
                error={!!errors.state}
                helperText={errors.state}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Zip Code/Postal Code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                error={!!errors.zipCode}
                helperText={errors.zipCode}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6' sx={{ mt: 2, mb: 2, fontWeight: 600 }}>Account Information</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Swift/Bank Identification Code"
                name="swiftCode"
                value={formData.swiftCode}
                onChange={handleChange}
                error={!!errors.swiftCode}
                helperText={errors.swiftCode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bank Name"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                error={!!errors.bankName}
                helperText={errors.bankName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bank Address"
                name="bankAddress"
                value={formData.bankAddress}
                onChange={handleChange}
                error={!!errors.bankAddress}
                helperText={errors.bankAddress}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bank Country"
                name="bankCountry"
                value={formData.bankCountry}
                onChange={handleChange}
                error={!!errors.bankCountry}
                helperText={errors.bankCountry}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="International Routing Code"
                name="internationalRoutingCode"
                value={formData.internationalRoutingCode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Account Number"
                name="accountNumber"
                type="password"
                value={formData.accountNumber}
                onChange={handleChange}
                error={!!errors.accountNumber}
                helperText={errors.accountNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Re-enter Account Number"
                name="confirmAccountNumber"
                type="password"
                value={formData.confirmAccountNumber}
                onChange={handleChange}
                error={!!errors.confirmAccountNumber}
                helperText={errors.confirmAccountNumber}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Add Beneficiary</Button>
      </DialogActions>
    </Dialog>
  )
}

export default InternationalBeneficiaryForm