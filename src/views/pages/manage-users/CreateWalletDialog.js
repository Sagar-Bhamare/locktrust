import React, { useState } from 'react'
import toast from 'react-hot-toast'

// MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import FormHelperText from '@mui/material/FormHelperText'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

// Jwt import 
import useJwt from "./../../../endpoints/jwt/useJwt"

// Icon
import Icon from 'src/@core/components/icon'

const USER_TYPES = [
  'Admin',
  'FRT',
  'ISO',
  'UnderWriter',
  'Merchant',
  'Bank',
  'Account',
  'SubISO'
]

const COUNTRY_CODES = [
  { code: 'IN', label: 'India (+91)' },
  { code: 'US', label: 'United States (+1)' },
  { code: 'GB', label: 'United Kingdom (+44)' },
  { code: 'AE', label: 'UAE (+971)' },
  { code: 'SG', label: 'Singapore (+65)' },
  { code: 'AU', label: 'Australia (+61)' },
]

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  companyName: '',
  countryCode: '',
  mobileNumber: '',
  userType: '',
}

const CreateUserDialog = ({ open, onClose, onSubmit, refreshUsers }) => {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = e => {
    const { name, value } = e.target
  
    setFormData(prev => ({ ...prev, [name]: value }))
  
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    
    if (errorMessage) {
      setErrorMessage('')
    }
  }

  const validate = () => {
    const newErrors = {}
  
    if (!formData.userType) newErrors.userType = 'User Type is required'
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required'
    if (!formData.companyName.trim()) newErrors.companyName = 'Company Name is required'
    if (!formData.countryCode) newErrors.countryCode = 'Country Code is required'
    
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile Number is required'
    } else if (!/^\d{7,15}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Enter a valid mobile number (digits only)'
    }
  
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }
  
    return newErrors
  }

  // Function to handle and parse server errors
  const handleServerError = (error) => {
    console.error('Server error details:', error)
    
    let errorMessage = 'Failed to create user. Please try again.'
    
    if (error.response) {
      const { status, data } = error.response
      
      if (data) {
        if (data.detail) {
          errorMessage = data.detail
          
          if (data.detail.toLowerCase().includes('email already exists')) {
            toast.error('❌ Email already exists! Please use a different email address.')
            setErrorMessage('This email is already registered. Please use a different email address.')
            return
          }
        } else if (data.message) {
          errorMessage = data.message
        } else if (data.error) {
          errorMessage = data.error
        }
        
        if (data.errors && Array.isArray(data.errors)) {
          const serverErrors = {}
          data.errors.forEach(err => {
            if (err.field) {
              serverErrors[err.field] = err.message
              setErrors(prev => ({ ...prev, [err.field]: err.message }))
            }
          })
          if (Object.keys(serverErrors).length > 0) {
            toast.error('Please check the form for errors')
            return
          }
        }
      }
      
      switch (status) {
        case 400:
          toast.error('Bad request. Please check your input.')
          break
        case 409:
          toast.error('Conflict: User with this email already exists.')
          break
        case 500:
          toast.error('Server error. Please try again later.')
          break
        default:
          toast.error(errorMessage)
      }
    } else if (error.request) {
      toast.error('Network error. Please check your connection.')
      errorMessage = 'Unable to connect to server. Please check your network connection.'
    } else {
      toast.error(errorMessage)
    }
    
    setErrorMessage(errorMessage)
  }

  const createUsr = async (formData) => {
    try {
      if (!useJwt || typeof useJwt.createAllUser !== 'function') {
        throw new Error('JWT service not properly initialized')
      }
      
      const response = await useJwt.createAllUser(formData)
      return response
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

  const handleSubmit = async () => {
    const newErrors = validate()
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      toast.error('Please fill all required fields correctly')
      return
    }

    setIsSubmitting(true)
    setErrorMessage('')
    
    try {
      const response = await createUsr(formData)
      console.log('User created successfully:', response)
      
      toast.success(`✅ User ${formData.firstName} ${formData.lastName} created successfully!`)
      
      if (onSubmit) {
        onSubmit(formData)
      }
      
      if (refreshUsers && typeof refreshUsers === 'function') {
        await refreshUsers()
      }
      
      setFormData(INITIAL_FORM)
      setErrors({})
      onClose()
    } catch (error) {
      handleServerError(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData(INITIAL_FORM)
    setErrors({})
    setErrorMessage('')
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
      <DialogTitle>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          Create User
          <IconButton onClick={handleClose} disabled={isSubmitting}>
            <Icon icon='tabler:x' />
          </IconButton>
        </Box>
      </DialogTitle>
  
      <DialogContent>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3, mt: 1 }}>
            {errorMessage}
          </Alert>
        )}
        
        <Grid container spacing={4} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.userType}>
              <InputLabel>User Type *</InputLabel>
              <Select
                name='userType'
                value={formData.userType}
                label='User Type *'
                onChange={handleChange}
                disabled={isSubmitting}
              >
                {USER_TYPES.map(type => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              {errors.userType && <FormHelperText>{errors.userType}</FormHelperText>}
            </FormControl>
          </Grid>
  
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='First Name *'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              disabled={isSubmitting}
            />
          </Grid>
  
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Last Name *'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              disabled={isSubmitting}
            />
          </Grid>
  
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Email *'
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              disabled={isSubmitting}
            />
          </Grid>
  
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Company Name *'
              name='companyName'
              value={formData.companyName}
              onChange={handleChange}
              error={!!errors.companyName}
              helperText={errors.companyName}
              disabled={isSubmitting}
            />
          </Grid>
  
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth error={!!errors.countryCode}>
              <InputLabel>Country Code *</InputLabel>
              <Select
                name='countryCode'
                value={formData.countryCode}
                label='Country Code *'
                onChange={handleChange}
                disabled={isSubmitting}
              >
                {COUNTRY_CODES.map(({ code, label }) => (
                  <MenuItem key={code} value={code}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
              {errors.countryCode && <FormHelperText>{errors.countryCode}</FormHelperText>}
            </FormControl>
          </Grid>
  
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label='Mobile Number *'
              name='mobileNumber'
              value={formData.mobileNumber}
              onChange={handleChange}
              error={!!errors.mobileNumber}
              helperText={errors.mobileNumber}
              inputProps={{ inputMode: 'numeric', maxLength: 15 }}
              disabled={isSubmitting}
            />
          </Grid>
        </Grid>
      </DialogContent>
  
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleClose} color='secondary' variant='outlined' disabled={isSubmitting}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant='contained' disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateUserDialog