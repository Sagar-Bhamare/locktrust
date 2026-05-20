// ** React Imports
import { useState, Fragment } from 'react'

// ** Next Import
import Link from 'next/link'


// heello 
// ** MUI Components
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import Autocomplete from '@mui/material/Autocomplete'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// ** Jwt import 
import useJwt from "./../../endpoints/jwt/useJwt"

// ** Toast
import toast from 'react-hot-toast'

// ** Data
import { countries } from 'src/@fake-db/autocomplete'

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  countryCode: null,
  mobile: '',
  password: '',
  confirmPassword: '',
  terms: false
}

// ** Styled Components
const RegisterIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 600,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1.75),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const Register = () => {
  // ** States
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState('')

  // ** Hooks
  const theme = useTheme()
  const { register } = useAuth()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
 

  // ** Vars
  const { skin } = settings

  const schema = yup.object().shape({
    firstName: yup.string().min(2, 'First name must be at least 2 characters').required('First name is required'),
    lastName: yup.string().min(2, 'Last name must be at least 2 characters').required('Last name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    countryCode: yup.object().nullable().required('Please select a country code'),
    mobile: yup
      .string()
      .matches(/^[0-9]+$/, 'Mobile number must contain only digits')
      .min(6, 'Mobile number must be at least 6 digits')
      .max(15, 'Mobile number must not exceed 15 digits')
      .required('Mobile number is required'),
    password: yup
      .string()
      .min(5, 'Password must be at least 5 characters')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    terms: yup.bool().oneOf([true], 'You must accept the privacy policy & terms')
  })

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    trigger,
    reset
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // Function to handle server errors
  const handleServerError = (error) => {
    console.error('Server error details:', error)
    
    let errorMessage = 'Registration failed. Please try again.'
    
    if (error.response) {
      const { status, data } = error.response
      
      if (data) {
        if (data.detail) {
          errorMessage = data.detail
          
          if (data.detail.toLowerCase().includes('email already exists')) {
            toast.error('❌ Email already exists! Please use a different email address.')
            setError('email', {
              type: 'manual',
              message: 'This email is already registered'
            })
            return
          }
          
          if (data.detail.toLowerCase().includes('mobile already exists')) {
            toast.error('❌ Mobile number already exists! Please use a different mobile number.')
            setError('mobile', {
              type: 'manual',
              message: 'This mobile number is already registered'
            })
            return
          }
        } else if (data.message) {
          errorMessage = data.message
        } else if (data.error) {
          errorMessage = data.error
        }
        
        // Handle field-specific errors
        if (data.errors && Array.isArray(data.errors)) {
          data.errors.forEach(err => {
            if (err.field) {
              setError(err.field, {
                type: 'manual',
                message: err.message
              })
            }
          })
          toast.error('Please check the form for errors')
          return
        }
      }
      
      switch (status) {
        case 400:
          toast.error('Bad request. Please check your input.')
          break
        case 409:
          toast.error('Conflict: User with this email or mobile already exists.')
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
    
    setApiError(errorMessage)
  }

  const onSubmit = async (data) => {
    const { firstName, lastName, email, countryCode, mobile, password, confirmPassword } = data
    
    setIsSubmitting(true)
    setApiError('')
    
    try {
      // Get the country dial code from the selected country object
      const countryDialCode = countryCode?.dialCode || countryCode?.phone || ''
      const countryCodeValue = countryCode?.code || countryCode?.iso2 || ''
      
      // Prepare merchant registration data
      const merchantData = {
        first_name: firstName,
  last_name: lastName,
        email: email,
        country_code: countryDialCode,
        dialCountryCode: `+${countryDialCode}`,
        mobile: mobile,
        password: password,
        password2: confirmPassword,
        // Additional merchant-specific fields if needed
        companyName: `${firstName} ${lastName}'s Company`, // You can modify this or add a company name field
        userType: 'Merchant' // Set user type as Merchant
      }
      
      console.log('Registration Data:', merchantData)
      console.log('Selected Country:', countryCode)
      
      // Call the createMerchant API from jwt service
      const response = await useJwt.createMerchant(merchantData)
      




      console.log('Merchant created successfully:', response)
      
      // Show success message
      toast.success(`✅ Welcome ${firstName} ${lastName}! Your merchant account has been created successfully.`)
      
      // Reset form after successful registration
      reset(defaultValues)
      
      // Optional: Redirect to login page after successful registration
      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)
      
    } catch (error) {
      handleServerError(error)
      
      // If there's a specific error callback from the auth hook
      if (error.response?.data) {
        const errData = error.response.data
        if (errData.email) {
          setError('email', {
            type: 'manual',
            message: errData.email
          })
        }
        if (errData.mobile) {
          setError('mobile', {
            type: 'manual',
            message: errData.mobile
          })
        }
        if (errData.username) {
          setError('email', {
            type: 'manual',
            message: errData.username
          })
        }
      }
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const imageSource = skin === 'bordered' ? 'auth-v2-register-illustration-bordered' : 'auth-v2-register-illustration'

  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
            backgroundColor: 'customColors.bodyBg',
            margin: theme => theme.spacing(8, 0, 8, 8)
          }}
        >
          <RegisterIllustration
            alt='register-illustration'
            src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
          />
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <img
              src='/images/logos/locktrust.png'
              alt='LockTrust Logo'
              style={{
                height: '60px',
                width: 'auto',
                objectFit: 'contain'
              }}
            />
            <Box sx={{ my: 6 }}>
              <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
                Adventure starts here 🚀
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Make your app management easy and fun!</Typography>
            </Box>
            
            {apiError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {apiError}
              </Alert>
            )}
            
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              {/* First Name and Last Name Row */}
              <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <FormControl fullWidth>
                  <Controller
                    name='firstName'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        autoFocus
                        value={value}
                        onBlur={onBlur}
                        label='First Name'
                        onChange={onChange}
                        placeholder='John'
                        error={Boolean(errors.firstName)}
                        disabled={isSubmitting}
                      />
                    )}
                  />
                  {errors.firstName && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.firstName.message}</FormHelperText>
                  )}
                </FormControl>
                
                <FormControl fullWidth>
                  <Controller
                    name='lastName'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        value={value}
                        onBlur={onBlur}
                        label='Last Name'
                        onChange={onChange}
                        placeholder='Doe'
                        error={Boolean(errors.lastName)}
                        disabled={isSubmitting}
                      />
                    )}
                  />
                  {errors.lastName && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>
                  )}
                </FormControl>
              </Box>

              {/* Email Field */}
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      value={value}
                      label='Email'
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      placeholder='user@email.com'
                      disabled={isSubmitting}
                    />
                  )}
                />
                {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
              </FormControl>

              {/* Country Code and Mobile Row */}
              <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <FormControl fullWidth sx={{ flex: 0.5 }}>
                  <Controller
                    name='countryCode'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        id='country-select'
                        options={countries}
                        autoHighlight
                        getOptionLabel={(option) => {
                          if (!option) return ''
                          if (typeof option === 'string') return option
                          const dialCode = option.dialCode || option.phoneCode || ''
                          const name = option.name || option.label || ''
                          return `${name} (${dialCode})`
                        }}
                        value={value}
                        onChange={(event, newValue) => {
                          onChange(newValue)
                          trigger('countryCode')
                        }}
                        disabled={isSubmitting}
                        renderOption={(props, option) => {
                          const dialCode = option.dialCode || option.phoneCode || ''
                          const name = option.name || option.label || ''
                          const countryCodeISO = option.code || option.iso2 || ''
                          return (
                            <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                              <img
                                loading='lazy'
                                width='24'
                                height='18'
                                src={`https://flagcdn.com/w40/${countryCodeISO?.toLowerCase()}.png`}
                                srcSet={`https://flagcdn.com/w80/${countryCodeISO?.toLowerCase()}.png 2x`}
                                alt=""
                                style={{ marginRight: '12px' }}
                              />
                              <span style={{ fontWeight: 500 }}>{name}</span>
                              <span style={{ marginLeft: '8px', color: '#666' }}>({dialCode})</span>
                            </Box>
                          )
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label='Country Code'
                            placeholder='Select country'
                            error={Boolean(errors.countryCode)}
                            helperText={errors.countryCode?.message}
                            disabled={isSubmitting}
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: value && (value.code || value.iso2) && (
                                <img
                                  src={`https://flagcdn.com/w20/${(value.code || value.iso2)?.toLowerCase()}.png`}
                                  style={{ marginLeft: '8px', marginRight: '8px', width: '24px', height: '18px' }}
                                  width='24'
                                  height='18'
                                  alt="flag"
                                />
                              ),
                            }}
                          />
                        )}
                      />
                    )}
                  />
                </FormControl>
                
                <FormControl fullWidth sx={{ flex: 0.5 }}>
                  <Controller
                    name='mobile'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        value={value}
                        onBlur={onBlur}
                        label='Mobile Number'
                        onChange={onChange}
                        placeholder='1234567890'
                        error={Boolean(errors.mobile)}
                        disabled={isSubmitting}
                      />
                    )}
                  />
                  {errors.mobile && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.mobile.message}</FormHelperText>
                  )}
                </FormControl>
              </Box>

              {/* Password Field */}
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor='register-password' error={Boolean(errors.password)}>
                  Password
                </InputLabel>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      label='Password'
                      onBlur={onBlur}
                      onChange={onChange}
                      id='register-password'
                      error={Boolean(errors.password)}
                      type={showPassword ? 'text' : 'password'}
                      disabled={isSubmitting}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isSubmitting}
                          >
                            <Icon icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} fontSize={20} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>
                )}
              </FormControl>

              {/* Confirm Password Field */}
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor='register-confirm-password' error={Boolean(errors.confirmPassword)}>
                  Confirm Password
                </InputLabel>
                <Controller
                  name='confirmPassword'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      label='Confirm Password'
                      onBlur={onBlur}
                      onChange={onChange}
                      id='register-confirm-password'
                      error={Boolean(errors.confirmPassword)}
                      type={showConfirmPassword ? 'text' : 'password'}
                      disabled={isSubmitting}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            disabled={isSubmitting}
                          >
                            <Icon icon={showConfirmPassword ? 'tabler:eye' : 'tabler:eye-off'} fontSize={20} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.confirmPassword.message}</FormHelperText>
                )}
              </FormControl>

              {/* Terms and Conditions */}
              <FormControl error={Boolean(errors.terms)}>
                <Controller
                  name='terms'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <FormControlLabel
                        sx={{
                          ...(errors.terms ? { color: 'error.main' } : null),
                          '& .MuiFormControlLabel-label': { fontSize: '0.875rem' }
                        }}
                        control={
                          <Checkbox
                            checked={value}
                            onChange={onChange}
                            sx={errors.terms ? { color: 'error.main' } : null}
                            disabled={isSubmitting}
                          />
                        }
                        label={
                          <Fragment>
                            <Typography
                              variant='body2'
                              component='span'
                              sx={{ color: errors.terms ? 'error.main' : '' }}
                            >
                              I agree to{' '}
                            </Typography>
                            <LinkStyled href='/' onClick={e => e.preventDefault()}>
                              privacy policy & terms
                            </LinkStyled>
                          </Fragment>
                        }
                      />
                    )
                  }}
                />
                {errors.terms && (
                  <FormHelperText sx={{ mt: 0, color: 'error.main' }}>{errors.terms.message}</FormHelperText>
                )}
              </FormControl>

              {/* Sign Up Button */}
              <Button 
                fullWidth 
                size='large' 
                type='submit' 
                variant='contained' 
                sx={{ mb: 4, mt: 2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={24} /> : 'Sign Up'}
              </Button>

              {/* Login Link */}
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ color: 'text.secondary', mr: 2 }}>Already have an account?</Typography>
                <Typography variant='body2'>
                  <LinkStyled href='/login' sx={{ fontSize: '1rem' }}>
                    Sign in instead
                  </LinkStyled>
                </Typography>
              </Box>
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}

Register.getLayout = page => <BlankLayout>{page}</BlankLayout>
Register.guestGuard = true

export default Register