import React, { useState, useEffect } from 'react'
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
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Alert from '@mui/material/Alert'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Toast
import toast from 'react-hot-toast'

const EditSubscriptionDialog = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    id: null,
    module: '',
    name: '',
    amount: '',
    type: 'Monthly',
    isAddonPackage: false,
    slipCount: '',
    subscriptionModule: '',
    description: ''
  })
  const [errors, setErrors] = useState({})

  const modules = ['Payment Gateway', 'Escrow Service', 'Wire Transfer', 'Card Processing']
  const timeFrames = ['Monthly', 'Quarterly', 'Yearly']
  const subscriptionModules = [
    'Dock Basic - monthly',
    'Dock Pro - monthly',
    'Escrow Standard - monthly',
    'Wire Basic - monthly'
  ]

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        module: initialData.module,
        name: initialData.name,
        amount: initialData.amount,
        type: initialData.type,
        isAddonPackage: initialData.isAddonPackage || false,
        slipCount: initialData.slipCount || '',
        subscriptionModule: initialData.subscriptionModule || '',
        description: initialData.description || ''
      })
    }
  }, [initialData])

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (field === 'isAddonPackage' && !value) {
      setFormData(prev => ({ ...prev, slipCount: '', subscriptionModule: '' }))
    }
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const calculateFinalAmount = () => {
    const amount = parseFloat(formData.amount) || 0
    if (formData.isAddonPackage) {
      const addonAmount = amount * 0.3
      return amount + addonAmount
    }
    return amount
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.module) newErrors.module = 'Module is required'
    if (!formData.name) newErrors.name = 'Subscription Name is required'
    if (!formData.amount) newErrors.amount = 'Amount is required'
    if (formData.isAddonPackage) {
      if (!formData.slipCount) newErrors.slipCount = 'Slip Count is required'
      if (!formData.subscriptionModule) newErrors.subscriptionModule = 'Subscription Module is required'
    }
    return newErrors
  }

  const handleSubmit = () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const updatedSubscription = {
      ...formData,
      amount: parseFloat(formData.amount),
      finalAmount: calculateFinalAmount(),
      slipCount: formData.isAddonPackage ? parseInt(formData.slipCount) : null
    }

    onSubmit(updatedSubscription)
    toast.success('Subscription updated successfully!')
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='h5' sx={{ fontWeight: 600 }}>Edit Subscription</Typography>
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
                {errors.module && <FormHelperText>{errors.module}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subscription Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                error={!!errors.amount}
                helperText={errors.amount}
                InputProps={{ startAdornment: '$' }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Time Frame</InputLabel>
                <Select
                  value={formData.type}
                  label="Time Frame"
                  onChange={(e) => handleChange('type', e.target.value)}
                >
                  {timeFrames.map(frame => (
                    <MenuItem key={frame} value={frame}>{frame}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Final Amount"
                type="number"
                value={calculateFinalAmount()}
                disabled
                InputProps={{ startAdornment: '$' }}
                helperText="Auto-calculated based on add-on package selection"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isAddonPackage}
                    onChange={(e) => handleChange('isAddonPackage', e.target.checked)}
                    color='primary'
                  />
                }
                label="Is Addon Package?"
              />
            </Grid>

            {formData.isAddonPackage && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Slip Count"
                    type="number"
                    value={formData.slipCount}
                    onChange={(e) => handleChange('slipCount', e.target.value)}
                    error={!!errors.slipCount}
                    helperText={errors.slipCount}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!errors.subscriptionModule}>
                    <InputLabel>Subscription Module</InputLabel>
                    <Select
                      value={formData.subscriptionModule}
                      label="Subscription Module"
                      onChange={(e) => handleChange('subscriptionModule', e.target.value)}
                    >
                      <MenuItem value="">--- Select ---</MenuItem>
                      {subscriptionModules.map(module => (
                        <MenuItem key={module} value={module}>{module}</MenuItem>
                      ))}
                    </Select>
                    {errors.subscriptionModule && <FormHelperText>{errors.subscriptionModule}</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    <Typography variant='caption'>
                      Select a subscription only when you are creating an add-on for the branch.
                    </Typography>
                  </Alert>
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Enter subscription description..."
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" sx={{ textTransform: 'none' }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" sx={{ textTransform: 'none' }}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditSubscriptionDialog