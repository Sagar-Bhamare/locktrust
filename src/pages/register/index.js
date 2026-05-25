// // ** React Imports
// import { useState, Fragment } from 'react'

// // ** Next Import
// import Link from 'next/link'
// import CryptoJS from 'crypto-js'

// // ** MUI Components
// import Button from '@mui/material/Button'
// import Checkbox from '@mui/material/Checkbox'
// import TextField from '@mui/material/TextField'
// import Typography from '@mui/material/Typography'
// import InputLabel from '@mui/material/InputLabel'
// import IconButton from '@mui/material/IconButton'
// import Box from '@mui/material/Box'
// import FormControl from '@mui/material/FormControl'
// import useMediaQuery from '@mui/material/useMediaQuery'
// import OutlinedInput from '@mui/material/OutlinedInput'
// import { styled, useTheme } from '@mui/material/styles'
// import FormHelperText from '@mui/material/FormHelperText'
// import InputAdornment from '@mui/material/InputAdornment'
// import MuiFormControlLabel from '@mui/material/FormControlLabel'
// import Autocomplete from '@mui/material/Autocomplete'
// import Alert from '@mui/material/Alert'
// import CircularProgress from '@mui/material/CircularProgress'

// // ** Icon Imports
// import Icon from 'src/@core/components/icon'

// // ** Third Party Imports
// import * as yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup'
// import { useForm, Controller } from 'react-hook-form'

// // ** Layout Import
// import BlankLayout from 'src/@core/layouts/BlankLayout'

// // ** Hooks
// import { useAuth } from 'src/hooks/useAuth'
// import { useSettings } from 'src/@core/hooks/useSettings'

// // ** Demo Imports
// import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// // ** Jwt import 
// import useJwt from "./../../endpoints/jwt/useJwt"

// // ** Toast
// import toast from 'react-hot-toast'

// // ** Data
// import { countries } from 'src/@fake-db/autocomplete'

// const defaultValues = {
//   firstName: '',
//   lastName: '',
//   email: '',
//   countryCode: null,
//   mobile: '',
//   password: '',
//   confirmPassword: '',
//   terms: false
// }

// // ** Styled Components
// const RegisterIllustration = styled('img')(({ theme }) => ({
//   zIndex: 2,
//   maxHeight: 600,
//   marginTop: theme.spacing(12),
//   marginBottom: theme.spacing(12),
//   [theme.breakpoints.down(1540)]: {
//     maxHeight: 550
//   },
//   [theme.breakpoints.down('lg')]: {
//     maxHeight: 500
//   }
// }))

// const RightWrapper = styled(Box)(({ theme }) => ({
//   width: '100%',
//   [theme.breakpoints.up('md')]: {
//     maxWidth: 450
//   },
//   [theme.breakpoints.up('lg')]: {
//     maxWidth: 600
//   },
//   [theme.breakpoints.up('xl')]: {
//     maxWidth: 750
//   }
// }))

// const LinkStyled = styled(Link)(({ theme }) => ({
//   fontSize: '0.875rem',
//   textDecoration: 'none',
//   color: theme.palette.primary.main
// }))

// const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
//   marginTop: theme.spacing(1.5),
//   marginBottom: theme.spacing(1.75),
//   '& .MuiFormControlLabel-label': {
//     fontSize: '0.875rem',
//     color: theme.palette.text.secondary
//   }
// }))

// const Register = () => {
//   // ** States
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [apiError, setApiError] = useState('')

//   // ** Hooks
//   const theme = useTheme()
//   const { register } = useAuth()
//   const { settings } = useSettings()
//   const hidden = useMediaQuery(theme.breakpoints.down('md'))
 

//   // ** Vars
//   const { skin } = settings

//   const schema = yup.object().shape({
//     firstName: yup.string().min(2, 'First name must be at least 2 characters').required('First name is required'),
//     lastName: yup.string().min(2, 'Last name must be at least 2 characters').required('Last name is required'),
//     email: yup.string().email('Invalid email format').required('Email is required'),
//     countryCode: yup.object().nullable().required('Please select a country code'),
//     mobile: yup
//       .string()
//       .matches(/^[0-9]+$/, 'Mobile number must contain only digits')
//       .min(6, 'Mobile number must be at least 6 digits')
//       .max(15, 'Mobile number must not exceed 15 digits')
//       .required('Mobile number is required'),
//     password: yup
//       .string()
//       .min(5, 'Password must be at least 5 characters')
//       .required('Password is required'),
//     confirmPassword: yup
//       .string()
//       .oneOf([yup.ref('password'), null], 'Passwords must match')
//       .required('Confirm password is required'),
//     terms: yup.bool().oneOf([true], 'You must accept the privacy policy & terms')
//   })

//   const {
//     control,
//     setError,
//     handleSubmit,
//     formState: { errors },
//     trigger,
//     reset
//   } = useForm({
//     defaultValues,
//     mode: 'onBlur',
//     resolver: yupResolver(schema)
//   })

//   // Function to handle server errors
//   const handleServerError = (error) => {
//     console.error('Server error details:', error)
    
//     let errorMessage = 'Registration failed. Please try again.'
    
//     if (error.response) {
//       const { status, data } = error.response
      
//       if (data) {
//         if (data.detail) {
//           errorMessage = data.detail
          
//           if (data.detail.toLowerCase().includes('email already exists')) {
//             toast.error('❌ Email already exists! Please use a different email address.')
//             setError('email', {
//               type: 'manual',
//               message: 'This email is already registered'
//             })
//             return
//           }
          
//           if (data.detail.toLowerCase().includes('mobile already exists')) {
//             toast.error('❌ Mobile number already exists! Please use a different mobile number.')
//             setError('mobile', {
//               type: 'manual',
//               message: 'This mobile number is already registered'
//             })
//             return
//           }
//         } else if (data.message) {
//           errorMessage = data.message
//         } else if (data.error) {
//           errorMessage = data.error
//         }
        
//         // Handle field-specific errors
//         if (data.errors && Array.isArray(data.errors)) {
//           data.errors.forEach(err => {
//             if (err.field) {
//               setError(err.field, {
//                 type: 'manual',
//                 message: err.message
//               })
//             }
//           })
//           toast.error('Please check the form for errors')
//           return
//         }
//       }
      
//       switch (status) {
//         case 400:
//           toast.error('Bad request. Please check your input.')
//           break
//         case 409:
//           toast.error('Conflict: User with this email or mobile already exists.')
//           break
//         case 500:
//           toast.error('Server error. Please try again later.')
//           break
//         default:
//           toast.error(errorMessage)
//       }
//     } else if (error.request) {
//       toast.error('Network error. Please check your connection.')
//       errorMessage = 'Unable to connect to server. Please check your network connection.'
//     } else {
//       toast.error(errorMessage)
//     }
    
//     setApiError(errorMessage)
//   }

//   const onSubmit = async (data) => {
//     const { firstName, lastName, email, countryCode, mobile, password, confirmPassword } = data
    
//     setIsSubmitting(true)
//     setApiError('')
    
//     try {
//       // Get the country dial code from the selected country object
//       const countryDialCode = countryCode?.dialCode || countryCode?.phone || ''
//       const countryCodeValue = countryCode?.code || countryCode?.iso2 || ''

//       // Encrypt password
// const encryptAES = text => {
//   const secretKey = 'zMWH89JA7Nix4HM+ij3sF6KO3ZumDInh/SQKutvhuO8=' // SAME as backend secretKey

//   // Generate SHA256 key
//   const key = CryptoJS.SHA256(secretKey)

//   // Generate random IV
//   const iv = CryptoJS.lib.WordArray.random(16)

//   // Encrypt
//   const encrypted = CryptoJS.AES.encrypt(text, key, {
//     iv: iv,
//     mode: CryptoJS.mode.CBC,
//     padding: CryptoJS.pad.Pkcs7
//   })

//   // Combine IV + Ciphertext
//   const combined = iv.clone().concat(encrypted.ciphertext)

//   // Convert to Base64
//   return CryptoJS.enc.Base64.stringify(combined)
// }

// const encryptedPassword = encryptAES(password)
      
//       // Prepare merchant registration data
//       const merchantData = {
//         first_name: firstName,
//         last_name: lastName,
//         email: email,
//         country_code: `+${countryDialCode}`,
//         dialCountryCode: countryCodeValue,
//         mobile: mobile,
//         password: encryptedPassword,
//         password2: encryptedPassword,
      
//       }
      
//       console.log('Registration Data:', merchantData)
//       console.log('Selected Country:', countryCode)
      
//       // Call the createMerchant API from jwt service
//       const response = await useJwt.createMerchant(merchantData)
  
//       console.log('Merchant created successfully:', response)
      
//       // Show success message
//       toast.success(`✅ Welcome ${firstName} ${lastName}! Your merchant account has been created successfully.`)
      
//       // Reset form after successful registration
//       reset(defaultValues)
      
//       // Optional: Redirect to login page after successful registration
//       setTimeout(() => {
//         window.location.href = '/login'
//       }, 2000)
      
//     } catch (error) {
//       handleServerError(error)
      
//       // If there's a specific error callback from the auth hook
//       if (error.response?.data) {
//         const errData = error.response.data
//         if (errData.email) {
//           setError('email', {
//             type: 'manual',
//             message: errData.email
//           })
//         }
//         if (errData.mobile) {
//           setError('mobile', {
//             type: 'manual',
//             message: errData.mobile
//           })
//         }
//         if (errData.username) {
//           setError('email', {
//             type: 'manual',
//             message: errData.username
//           })
//         }
//       }
//     } finally {
//       setIsSubmitting(false)
//     }
//   }
  
//   const imageSource = skin === 'bordered' ? 'auth-v2-register-illustration-bordered' : 'auth-v2-register-illustration'

//   return (
//     <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
//       {!hidden ? (
//         <Box
//           sx={{
//             flex: 1,
//             display: 'flex',
//             position: 'relative',
//             alignItems: 'center',
//             borderRadius: '20px',
//             justifyContent: 'center',
//             backgroundColor: 'customColors.bodyBg',
//             margin: theme => theme.spacing(8, 0, 8, 8)
//           }}
//         >
//           <RegisterIllustration
//             alt='register-illustration'
//             src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
//           />
//           <FooterIllustrationsV2 />
//         </Box>
//       ) : null}
//       <RightWrapper>
//         <Box
//           sx={{
//             p: [6, 12],
//             height: '100%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center'
//           }}
//         >
//           <Box sx={{ width: '100%', maxWidth: 400 }}>
//             <img
//               src='/images/logos/locktrust.png'
//               alt='LockTrust Logo'
//               style={{
//                 height: '60px',
//                 width: 'auto',
//                 objectFit: 'contain'
//               }}
//             />
//             <Box sx={{ my: 6 }}>
//               <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
//                 Adventure starts here 🚀
//               </Typography>
//               <Typography sx={{ color: 'text.secondary' }}>Make your app management easy and fun!</Typography>
//             </Box>
            
//             {apiError && (
//               <Alert severity="error" sx={{ mb: 3 }}>
//                 {apiError}
//               </Alert>
//             )}
            
//             <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
//               {/* First Name and Last Name Row */}
//               <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
//                 <FormControl fullWidth>
//                   <Controller
//                     name='firstName'
//                     control={control}
//                     rules={{ required: true }}
//                     render={({ field: { value, onChange, onBlur } }) => (
//                       <TextField
//                         autoFocus
//                         value={value}
//                         onBlur={onBlur}
//                         label='First Name'
//                         onChange={onChange}
//                         placeholder='John'
//                         error={Boolean(errors.firstName)}
//                         disabled={isSubmitting}
//                       />
//                     )}
//                   />
//                   {errors.firstName && (
//                     <FormHelperText sx={{ color: 'error.main' }}>{errors.firstName.message}</FormHelperText>
//                   )}
//                 </FormControl>
                
//                 <FormControl fullWidth>
//                   <Controller
//                     name='lastName'
//                     control={control}
//                     rules={{ required: true }}
//                     render={({ field: { value, onChange, onBlur } }) => (
//                       <TextField
//                         value={value}
//                         onBlur={onBlur}
//                         label='Last Name'
//                         onChange={onChange}
//                         placeholder='Doe'
//                         error={Boolean(errors.lastName)}
//                         disabled={isSubmitting}
//                       />
//                     )}
//                   />
//                   {errors.lastName && (
//                     <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>
//                   )}
//                 </FormControl>
//               </Box>

//               {/* Email Field */}
//               <FormControl fullWidth sx={{ mb: 4 }}>
//                 <Controller
//                   name='email'
//                   control={control}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange, onBlur } }) => (
//                     <TextField
//                       value={value}
//                       label='Email'
//                       onBlur={onBlur}
//                       onChange={onChange}
//                       error={Boolean(errors.email)}
//                       placeholder='user@email.com'
//                       disabled={isSubmitting}
//                     />
//                   )}
//                 />
//                 {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
//               </FormControl>

//               {/* Country Code and Mobile Row */}
//               <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
//                 <FormControl fullWidth sx={{ flex: 0.5 }}>
//                   <Controller
//                     name='countryCode'
//                     control={control}
//                     render={({ field: { onChange, value } }) => (
//                       <Autocomplete
//                         id='country-select'
//                         options={countries}
//                         autoHighlight
//                         getOptionLabel={(option) => {
//                           if (!option) return ''
//                           if (typeof option === 'string') return option
//                           const dialCode = option.dialCode || option.phoneCode || ''
//                           const name = option.name || option.label || ''
//                           return `${name} (${dialCode})`
//                         }}
//                         value={value}
//                         onChange={(event, newValue) => {
//                           onChange(newValue)
//                           trigger('countryCode')
//                         }}
//                         disabled={isSubmitting}
//                         renderOption={(props, option) => {
//                           const dialCode = option.dialCode || option.phoneCode || ''
//                           const name = option.name || option.label || ''
//                           const countryCodeISO = option.code || option.iso2 || ''
//                           return (
//                             <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
//                               <img
//                                 loading='lazy'
//                                 width='24'
//                                 height='18'
//                                 src={`https://flagcdn.com/w40/${countryCodeISO?.toLowerCase()}.png`}
//                                 srcSet={`https://flagcdn.com/w80/${countryCodeISO?.toLowerCase()}.png 2x`}
//                                 alt=""
//                                 style={{ marginRight: '12px' }}
//                               />
//                               <span style={{ fontWeight: 500 }}>{name}</span>
//                               <span style={{ marginLeft: '8px', color: '#666' }}>({dialCode})</span>
//                             </Box>
//                           )
//                         }}
//                         renderInput={(params) => (
//                           <TextField
//                             {...params}
//                             label='Country Code'
//                             placeholder='Select country'
//                             error={Boolean(errors.countryCode)}
//                             helperText={errors.countryCode?.message}
//                             disabled={isSubmitting}
//                             InputProps={{
//                               ...params.InputProps,
//                               startAdornment: value && (value.code || value.iso2) && (
//                                 <img
//                                   src={`https://flagcdn.com/w20/${(value.code || value.iso2)?.toLowerCase()}.png`}
//                                   style={{ marginLeft: '8px', marginRight: '8px', width: '24px', height: '18px' }}
//                                   width='24'
//                                   height='18'
//                                   alt="flag"
//                                 />
//                               ),
//                             }}
//                           />
//                         )}
//                       />
//                     )}
//                   />
//                 </FormControl>
                
//                 <FormControl fullWidth sx={{ flex: 0.5 }}>
//                   <Controller
//                     name='mobile'
//                     control={control}
//                     rules={{ required: true }}
//                     render={({ field: { value, onChange, onBlur } }) => (
//                       <TextField
//                         value={value}
//                         onBlur={onBlur}
//                         label='Mobile Number'
//                         onChange={onChange}
//                         placeholder='1234567890'
//                         error={Boolean(errors.mobile)}
//                         disabled={isSubmitting}
//                       />
//                     )}
//                   />
//                   {errors.mobile && (
//                     <FormHelperText sx={{ color: 'error.main' }}>{errors.mobile.message}</FormHelperText>
//                   )}
//                 </FormControl>
//               </Box>

//               {/* Password Field */}
//               <FormControl fullWidth sx={{ mb: 4 }}>
//                 <InputLabel htmlFor='register-password' error={Boolean(errors.password)}>
//                   Password
//                 </InputLabel>
//                 <Controller
//                   name='password'
//                   control={control}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange, onBlur } }) => (
//                     <OutlinedInput
//                       value={value}
//                       label='Password'
//                       onBlur={onBlur}
//                       onChange={onChange}
//                       id='register-password'
//                       error={Boolean(errors.password)}
//                       type={showPassword ? 'text' : 'password'}
//                       disabled={isSubmitting}
//                       endAdornment={
//                         <InputAdornment position='end'>
//                           <IconButton
//                             edge='end'
//                             onMouseDown={e => e.preventDefault()}
//                             onClick={() => setShowPassword(!showPassword)}
//                             disabled={isSubmitting}
//                           >
//                             <Icon icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} fontSize={20} />
//                           </IconButton>
//                         </InputAdornment>
//                       }
//                     />
//                   )}
//                 />
//                 {errors.password && (
//                   <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>
//                 )}
//               </FormControl>

//               {/* Confirm Password Field */}
//               <FormControl fullWidth sx={{ mb: 4 }}>
//                 <InputLabel htmlFor='register-confirm-password' error={Boolean(errors.confirmPassword)}>
//                   Confirm Password
//                 </InputLabel>
//                 <Controller
//                   name='confirmPassword'
//                   control={control}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange, onBlur } }) => (
//                     <OutlinedInput
//                       value={value}
//                       label='Confirm Password'
//                       onBlur={onBlur}
//                       onChange={onChange}
//                       id='register-confirm-password'
//                       error={Boolean(errors.confirmPassword)}
//                       type={showConfirmPassword ? 'text' : 'password'}
//                       disabled={isSubmitting}
//                       endAdornment={
//                         <InputAdornment position='end'>
//                           <IconButton
//                             edge='end'
//                             onMouseDown={e => e.preventDefault()}
//                             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                             disabled={isSubmitting}
//                           >
//                             <Icon icon={showConfirmPassword ? 'tabler:eye' : 'tabler:eye-off'} fontSize={20} />
//                           </IconButton>
//                         </InputAdornment>
//                       }
//                     />
//                   )}
//                 />
//                 {errors.confirmPassword && (
//                   <FormHelperText sx={{ color: 'error.main' }}>{errors.confirmPassword.message}</FormHelperText>
//                 )}
//               </FormControl>

//               {/* Terms and Conditions */}
//               <FormControl error={Boolean(errors.terms)}>
//                 <Controller
//                   name='terms'
//                   control={control}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange } }) => {
//                     return (
//                       <FormControlLabel
//                         sx={{
//                           ...(errors.terms ? { color: 'error.main' } : null),
//                           '& .MuiFormControlLabel-label': { fontSize: '0.875rem' }
//                         }}
//                         control={
//                           <Checkbox
//                             checked={value}
//                             onChange={onChange}
//                             sx={errors.terms ? { color: 'error.main' } : null}
//                             disabled={isSubmitting}
//                           />
//                         }
//                         label={
//                           <Fragment>
//                             <Typography
//                               variant='body2'
//                               component='span'
//                               sx={{ color: errors.terms ? 'error.main' : '' }}
//                             >
//                               I agree to{' '}
//                             </Typography>
//                             <LinkStyled href='/' onClick={e => e.preventDefault()}>
//                               privacy policy & terms
//                             </LinkStyled>
//                           </Fragment>
//                         }
//                       />
//                     )
//                   }}
//                 />
//                 {errors.terms && (
//                   <FormHelperText sx={{ mt: 0, color: 'error.main' }}>{errors.terms.message}</FormHelperText>
//                 )}
//               </FormControl>

//               {/* Sign Up Button */}
//               <Button 
//                 fullWidth 
//                 size='large' 
//                 type='submit' 
//                 variant='contained' 
//                 sx={{ mb: 4, mt: 2 }}
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? <CircularProgress size={24} /> : 'Sign Up'}
//               </Button>

//               {/* Login Link */}
//               <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
//                 <Typography sx={{ color: 'text.secondary', mr: 2 }}>Already have an account?</Typography>
//                 <Typography variant='body2'>
//                   <LinkStyled href='/login' sx={{ fontSize: '1rem' }}>
//                     Sign in instead
//                   </LinkStyled>
//                 </Typography>
//               </Box>
//             </form>
//           </Box>
//         </Box>
//       </RightWrapper>
//     </Box>
//   )
// }

// Register.getLayout = page => <BlankLayout>{page}</BlankLayout>
// Register.guestGuard = true

// export default Register


// new 
// ** React Imports
import { useState, Fragment, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'
import CryptoJS from 'crypto-js'

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

// Password validation rules (without special character requirement)
const PASSWORD_REQUIREMENTS = [
  { id: 'length', label: 'At least 12 characters long', validate: (pwd) => pwd.length >= 12 },
  { id: 'uppercase', label: 'At least one uppercase letter', validate: (pwd) => /[A-Z]/.test(pwd) },
  { id: 'lowercase', label: 'At least one lowercase letter', validate: (pwd) => /[a-z]/.test(pwd) },
  { id: 'number', label: 'At least one number', validate: (pwd) => /[0-9]/.test(pwd) },
  { id: 'alphanumeric', label: 'Only alphanumeric characters (no special characters)', validate: (pwd) => /^[a-zA-Z0-9]+$/.test(pwd) },
]

const Register = () => {
  // ** States
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState('')
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    alphanumeric: false
  })

  // ** Hooks
  const theme = useTheme()
  const { register } = useAuth()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const router = useRouter()

  // ** Vars
  const { skin } = settings

  // Function to check if password contains personal information
  const containsPersonalInfo = (password, firstName, lastName, email) => {
    const personalInfo = [
      firstName?.toLowerCase(),
      lastName?.toLowerCase(),
      email?.split('@')[0]?.toLowerCase(),
      `${firstName}${lastName}`?.toLowerCase(),
      `${lastName}${firstName}`?.toLowerCase()
    ].filter(Boolean)
    
    const lowerPassword = password.toLowerCase()
    return personalInfo.some(info => info && lowerPassword.includes(info))
  }

  // Real-time password validation
  const validatePasswordRealTime = (password, firstName, lastName, email) => {
    const validation = {
      length: password.length >= 12,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      alphanumeric: /^[a-zA-Z0-9]+$/.test(password)
    }
    setPasswordValidation(validation)
    
    // Check for alphanumeric requirement
    if (password.length > 0 && !/^[a-zA-Z0-9]+$/.test(password)) {
      return 'Password must contain only alphanumeric characters (letters and numbers)'
    }
    
    // Check for personal information
    if (containsPersonalInfo(password, firstName, lastName, email)) {
      return 'Password must not contain personal information'
    }
    
    return null
  }

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
      .min(12, 'Password must be at least 12 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/^[a-zA-Z0-9]+$/, 'Password must contain only alphanumeric characters (letters and numbers, no special characters)')
      .test('no-personal-info', 'Password must not contain personal information', function(value) {
        const { firstName, lastName, email } = this.parent
        if (!value || !firstName || !lastName || !email) return true
        const personalInfo = [
          firstName?.toLowerCase(),
          lastName?.toLowerCase(),
          email?.split('@')[0]?.toLowerCase(),
          `${firstName}${lastName}`?.toLowerCase(),
          `${lastName}${firstName}`?.toLowerCase()
        ].filter(Boolean)
        const lowerPassword = value.toLowerCase()
        return !personalInfo.some(info => info && lowerPassword.includes(info))
      })
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
    reset,
    watch,
    setValue
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  // Watch form values for real-time validation
  const watchedPassword = watch('password')
  const watchedFirstName = watch('firstName')
  const watchedLastName = watch('lastName')
  const watchedEmail = watch('email')

  // Update password validation in real-time
  useEffect(() => {
    if (watchedPassword) {
      validatePasswordRealTime(watchedPassword, watchedFirstName, watchedLastName, watchedEmail)
      trigger('password')
    }
  }, [watchedPassword, watchedFirstName, watchedLastName, watchedEmail, trigger])

  // Function to handle server errors
  const handleServerError = (error) => {
    console.error('Server error details:', error)
    
    let errorMessage = 'Registration failed. Please try again.'
    
    if (error.response) {
      const { status, data } = error.response
      
      if (data) {
        // Handle the specific error format from backend
        if (data.content) {
          errorMessage = data.content
          
          // Password length error
          if (data.content.includes('Password must be at least 12 characters')) {
            setError('password', {
              type: 'manual',
              message: data.content
            })
            toast.error('❌ ' + data.content)
            return
          }
          
          // Password alphanumeric error
          if (data.content.includes('Password must contain only alphanumeric characters')) {
            setError('password', {
              type: 'manual',
              message: data.content
            })
            toast.error('❌ ' + data.content)
            return
          }
          
          // Personal information error
          if (data.content.includes('Password must not contain personal information')) {
            setError('password', {
              type: 'manual',
              message: data.content
            })
            toast.error('❌ ' + data.content)
            return
          }
          
          // Email exists error
          if (data.content.includes('email already exists')) {
            setError('email', {
              type: 'manual',
              message: data.content
            })
            toast.error('❌ ' + data.content)
            return
          }
          
          // Mobile exists error
          if (data.content.includes('mobile already exists')) {
            setError('mobile', {
              type: 'manual',
              message: data.content
            })
            toast.error('❌ ' + data.content)
            return
          }
          
          toast.error('❌ ' + data.content)
        } else if (data.detail) {
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
          if (data.content) {
            errorMessage = data.content
          }
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
          if (!data?.content) toast.error('Bad request. Please check your input.')
          break
        case 409:
          toast.error('Conflict: User with this email or mobile already exists.')
          break
        case 500:
          toast.error('Server error. Please try again later.')
          break
        default:
          if (errorMessage !== 'Registration failed. Please try again.') {
            toast.error(errorMessage)
          }
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

      // Encrypt password
      const encryptAES = text => {
        const secretKey = 'zMWH89JA7Nix4HM+ij3sF6KO3ZumDInh/SQKutvhuO8='

        // Generate SHA256 key
        const key = CryptoJS.SHA256(secretKey)

        // Generate random IV
        const iv = CryptoJS.lib.WordArray.random(16)

        // Encrypt
        const encrypted = CryptoJS.AES.encrypt(text, key, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        })

        // Combine IV + Ciphertext
        const combined = iv.clone().concat(encrypted.ciphertext)

        // Convert to Base64
        return CryptoJS.enc.Base64.stringify(combined)
      }

      const encryptedPassword = encryptAES(password)
      
      // Prepare merchant registration data
      const merchantData = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        country_code: `+${countryDialCode}`,
        dialCountryCode: countryCodeValue,
        mobile: mobile,
        password: encryptedPassword,
        password2: encryptedPassword,
      }
      
      console.log('Registration Data:', merchantData)
      console.log('Selected Country:', countryCode)
      
      // Call the createMerchant API from jwt service
      const response = await useJwt.createMerchant(merchantData)
  
      console.log('Merchant created successfully:', response)
      
      // Handle the response structure
      if (response && response.code === 201) {
        // Show success message
        toast.success(`✅ Welcome ${firstName} ${lastName}! Your merchant account has been created successfully.`)
        
        // Store user data for verification page
        const verificationData = {
          email: response.content?.email || email,
          mobile: response.content?.mobile || mobile,
          firstName: firstName,
          lastName: lastName
        }
        
        // Store in session storage to pass to verification page
        sessionStorage.setItem('verificationData', JSON.stringify(verificationData))
        
        // Reset form
        reset(defaultValues)
        setPasswordValidation({
          length: false,
          uppercase: false,
          lowercase: false,
          number: false,
          alphanumeric: false
        })
        
        // Redirect to verification page after successful registration
        setTimeout(() => {
          router.push({
            pathname: '/verify',
            query: {
              email: verificationData.email,
              mobile: verificationData.mobile
            }
          })
        }, 1500)
      } else if (response && response.message) {
        toast.success(response.message)
        // Still redirect to verify page if merchant created
        if (response.content) {
          sessionStorage.setItem('verificationData', JSON.stringify({
            email: response.content.email || email,
            mobile: response.content.mobile || mobile,
            firstName: firstName,
            lastName: lastName
          }))
          setTimeout(() => {
            router.push('/verify')
          }, 1500)
        }
      }
      
    } catch (error) {
      handleServerError(error)
      
      // If there's a specific error callback from the auth hook
      if (error.response?.data) {
        const errData = error.response.data
        if (errData.email || (errData.content && errData.content.includes('email'))) {
          setError('email', {
            type: 'manual',
            message: errData.email || errData.content
          })
        }
        if (errData.mobile || (errData.content && errData.content.includes('mobile'))) {
          setError('mobile', {
            type: 'manual',
            message: errData.mobile || errData.content
          })
        }
        if (errData.password || (errData.content && errData.content.includes('Password'))) {
          setError('password', {
            type: 'manual',
            message: errData.password || errData.content
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
          <Box sx={{ width: '100%', maxWidth: 600 }}>
            <img
              src='/images/logos/locktrust-logo.png'
              alt='LockTrust Logo'
              style={{
                height: '50px',
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
                          const dialCode = option.dialCode || option.phone || option.phoneCode || ''
                          const name = option.name || option.label || ''
                          return dialCode ? `${name} (+${dialCode})` : name
                        }}
                        value={value}
                        onChange={(event, newValue) => {
                          onChange(newValue)
                          trigger('countryCode')
                        }}
                        disabled={isSubmitting}
                        renderOption={(props, option) => {
                          const dialCode = option.dialCode || option.phone || option.phoneCode || ''
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
                              {dialCode && (
                                <span style={{ marginLeft: '8px', color: '#666' }}>(+{dialCode})</span>
                              )}
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

              {/* Password Field with Real-time Validation */}
              <FormControl fullWidth sx={{ mb: 2 }}>
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
                      onChange={(e) => {
                        onChange(e)
                        validatePasswordRealTime(e.target.value, watchedFirstName, watchedLastName, watchedEmail)
                      }}
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

              {/* Password Requirements Checklist */}
              {watchedPassword && watchedPassword.length > 0 && (
                <Box sx={{ mb: 4, mt: 1, pl: 1 }}>
                  <Typography variant='caption' sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                    Password requirements:
                  </Typography>
                  {PASSWORD_REQUIREMENTS.map((req) => (
                    <Box key={req.id} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Icon 
                        icon={passwordValidation[req.id] ? 'tabler:check-circle' : 'tabler:circle'} 
                        fontSize={16} 
                        style={{ color: passwordValidation[req.id] ? '#4caf50' : '#9e9e9e' }}
                      />
                      <Typography 
                        variant='caption' 
                        sx={{ 
                          color: passwordValidation[req.id] ? '#4caf50' : '#757575',
                          textDecoration: passwordValidation[req.id] ? 'none' : 'none'
                        }}
                      >
                        {req.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}

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