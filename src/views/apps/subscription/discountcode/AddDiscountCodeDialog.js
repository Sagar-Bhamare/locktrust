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
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Toast
import toast from 'react-hot-toast'

const AddDiscountCodeDialog = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    module: '',
    subscriptionName: '',
    couponCode: '',
    amount: '',
    discountType: 'Percentage',
    couponType: '',
    maximumUsageLimit: '',
    durationUnit: '',
    durationValue: ''
  })
  const [errors, setErrors] = useState({})

  const modules = ['Payment Gateway', 'Escrow Service', 'Wire Transfer', 'Card Processing']
  const couponTypes = ['Public', 'Private', 'One-time', 'Multi-use']
  const durationUnits = ['Days', 'Weeks', 'Months', 'Years']
  
  const subscriptionNames = {
    'Payment Gateway': ['Basic Plan', 'Pro Plan', 'Enterprise Plan'],
    'Escrow Service': ['Standard', 'Business Pro', 'Enterprise'],
    'Wire Transfer': ['Basic', 'Premium', 'Corporate'],
    'Card Processing': ['Starter', 'Professional', 'Premium Plan']
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (field === 'module') {
      setFormData(prev => ({ ...prev, subscriptionName: '' }))
    }
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.module) newErrors.module = 'Module is required'
    if (!formData.subscriptionName) newErrors.subscriptionName = 'Subscription Name is required'
    if (!formData.couponCode) newErrors.couponCode = 'Coupon Code is required'
    if (!formData.amount) newErrors.amount = 'Amount is required'
    if (!formData.couponType) newErrors.couponType = 'Coupon Type is required'
    if (!formData.maximumUsageLimit) newErrors.maximumUsageLimit = 'Maximum Usage Limit is required'
    
    if (formData.discountType === 'Free Duration') {
      if (!formData.durationUnit) newErrors.durationUnit = 'Duration Unit is required'
      if (!formData.durationValue) newErrors.durationValue = 'Duration Value is required'
    }
    
    return newErrors
  }

  const handleSubmit = () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const newDiscount = {
      srNo: 0,
      module: formData.module,
      subscriptionName: formData.subscriptionName,
      couponTimeFrame: formData.discountType === 'Free Duration' ? `${formData.durationValue} ${formData.durationUnit}` : '30 days',
      maxUsageCount: parseInt(formData.maximumUsageLimit),
      couponEndDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      discountCode: formData.couponCode.toUpperCase(),
      discountValue: formData.discountType === 'Free Duration' ? formData.durationValue : parseFloat(formData.amount),
      discountType: formData.discountType,
      couponType: formData.couponType
    }

    onSubmit(newDiscount)
    toast.success('Discount code added successfully!')
    setFormData({
      module: '',
      subscriptionName: '',
      couponCode: '',
      amount: '',
      discountType: 'Percentage',
      couponType: '',
      maximumUsageLimit: '',
      durationUnit: '',
      durationValue: ''
    })
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='h5' sx={{ fontWeight: 600 }}>Add Subscription Discount</Typography>
          <IconButton onClick={onClose}>
            <Icon icon='tabler:x' />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.module}>
                <InputLabel>Module</InputLabel>
                <Select
                  value={formData.module}
                  label="Module"
                  onChange={(e) => handleChange('module', e.target.value)}
                >
                  <MenuItem value="">--- Select ---</MenuItem>
                  {modules.map(module => (
                    <MenuItem key={module} value={module}>{module}</MenuItem>
                  ))}
                </Select>
                {errors.module && <Typography variant='caption' color='error'>{errors.module}</Typography>}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.subscriptionName} disabled={!formData.module}>
                <InputLabel>Subscription Name</InputLabel>
                <Select
                  value={formData.subscriptionName}
                  label="Subscription Name"
                  onChange={(e) => handleChange('subscriptionName', e.target.value)}
                >
                  <MenuItem value="">--- Select ---</MenuItem>
                  {formData.module && subscriptionNames[formData.module]?.map(sub => (
                    <MenuItem key={sub} value={sub}>{sub}</MenuItem>
                  ))}
                </Select>
                {errors.subscriptionName && <Typography variant='caption' color='error'>{errors.subscriptionName}</Typography>}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Coupon Code"
                value={formData.couponCode}
                onChange={(e) => handleChange('couponCode', e.target.value)}
                error={!!errors.couponCode}
                helperText={errors.couponCode}
                placeholder="Enter coupon code"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                error={!!errors.amount}
                helperText={errors.amount}
                placeholder="Enter amount"
                disabled={formData.discountType === 'Free Duration'}
                InputProps={{
                  startAdornment: formData.discountType !== 'Free Duration' ? 
                    (formData.discountType === 'Percentage' ? '%' : '$') : null
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel>Discount Type</FormLabel>
                <RadioGroup 
                  row 
                  value={formData.discountType} 
                  onChange={(e) => handleChange('discountType', e.target.value)}
                >
                  <FormControlLabel value="Percentage" control={<Radio />} label="Percentage" />
                  <FormControlLabel value="Flat" control={<Radio />} label="Flat" />
                  <FormControlLabel value="Free Duration" control={<Radio />} label="Free Duration" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Coupon Type - Common for all */}
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.couponType}>
                <InputLabel>Coupon Type</InputLabel>
                <Select
                  value={formData.couponType}
                  label="Coupon Type"
                  onChange={(e) => handleChange('couponType', e.target.value)}
                >
                  <MenuItem value="">--- Select ---</MenuItem>
                  {couponTypes.map(type => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
                {errors.couponType && <Typography variant='caption' color='error'>{errors.couponType}</Typography>}
              </FormControl>
            </Grid>

            {/* Maximum Usage Limit - Common for all */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Maximum Usage Limit"
                type="number"
                value={formData.maximumUsageLimit}
                onChange={(e) => handleChange('maximumUsageLimit', e.target.value)}
                error={!!errors.maximumUsageLimit}
                helperText={errors.maximumUsageLimit}
                placeholder="Enter maximum number of uses"
                InputProps={{ endAdornment: 'uses' }}
              />
            </Grid>

            {/* Free Duration specific fields */}
            {formData.discountType === 'Free Duration' && (
              <>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' sx={{ mb: 1, fontWeight: 500, color: 'text.secondary' }}>
                    Free Duration Details
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!errors.durationUnit}>
                    <InputLabel>Duration Unit</InputLabel>
                    <Select
                      value={formData.durationUnit}
                      label="Duration Unit"
                      onChange={(e) => handleChange('durationUnit', e.target.value)}
                    >
                      <MenuItem value="">--- Select ---</MenuItem>
                      {durationUnits.map(unit => (
                        <MenuItem key={unit} value={unit}>{unit}</MenuItem>
                      ))}
                    </Select>
                    {errors.durationUnit && <Typography variant='caption' color='error'>{errors.durationUnit}</Typography>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Duration Value"
                    type="number"
                    value={formData.durationValue}
                    onChange={(e) => handleChange('durationValue', e.target.value)}
                    error={!!errors.durationValue}
                    helperText={errors.durationValue}
                    placeholder="Enter duration value"
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" sx={{ textTransform: 'none' }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" sx={{ textTransform: 'none' }}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddDiscountCodeDialog