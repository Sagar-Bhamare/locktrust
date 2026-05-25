    // import { useState, useEffect, useRef, ReactNode } from 'react'

    // // ** Next Imports
    // import Link from 'next/link'
    // import { useRouter } from 'next/router'
    // import UseJwt from "./../../endpoints/jwt/useJwt"
    // // ** MUI Components
    // import Button from '@mui/material/Button'
    // import Typography from '@mui/material/Typography'
    // import Box from '@mui/material/Box'
    // import FormControl from '@mui/material/FormControl'
    // import useMediaQuery from '@mui/material/useMediaQuery'
    // import { styled, useTheme } from '@mui/material/styles'
    // import FormHelperText from '@mui/material/FormHelperText'
    // import Alert from '@mui/material/Alert'
    // import CircularProgress from '@mui/material/CircularProgress'
    // import Paper from '@mui/material/Paper'

    // // ** Animation Imports
    // import { AnimatePresence, motion } from 'framer-motion'

    // // ** Icon Imports
    // import Icon from 'src/@core/components/icon'

    // // ** Third Party Imports
    // import Cleave from 'cleave.js/react'
    // import { useForm, Controller } from 'react-hook-form'
    // import CryptoJS from 'crypto-js'

    // // ** Hooks
    // import { useAuth } from 'src/hooks/useAuth'
    // import { useSettings } from 'src/@core/hooks/useSettings'

    // // ** Configs
    // import themeConfig from 'src/configs/themeConfig'

    // // ** Layout Import
    // import BlankLayout from 'src/@core/layouts/BlankLayout'

    // // ** Custom Styled Component
    // import CleaveWrapper from 'src/@core/styles/libs/react-cleave'

    // // ** Util Import
    // import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

    // // ** Styles
    // import 'cleave.js/dist/addons/cleave-phone.us'
    // import { token } from 'stylis'

    // // ** Animation Variants
    // const slideVariants = {
    // hiddenLeft: { x: -400, opacity: 0 },
    // hiddenRight: { x: 400, opacity: 0 },
    // visible: { x: 0, opacity: 1 },
    // exitLeft: { x: -400, opacity: 0 },
    // exitRight: { x: 400, opacity: 0 }
    // }

    // // ** Styled Components
    // const TwoStepsIllustration = styled('img')(({ theme }) => ({
    // zIndex: 2,
    // maxHeight: 650,
    // marginTop: theme.spacing(12),
    // marginBottom: theme.spacing(12),
    // [theme.breakpoints.down(1540)]: {
    //     maxHeight: 550
    // },
    // [theme.breakpoints.down('lg')]: {
    //     maxHeight: 500
    // }
    // }))

    // const RightWrapper = styled(Box)(({ theme }) => ({
    // width: '100%',
    // [theme.breakpoints.up('md')]: {
    //     maxWidth: 450
    // },
    // [theme.breakpoints.up('lg')]: {
    //     maxWidth: 600
    // },
    // [theme.breakpoints.up('xl')]: {
    //     maxWidth: 750
    // }
    // }))

    // const LinkStyled = styled(Link)(({ theme }) => ({
    // fontSize: '1rem',
    // textDecoration: 'none',
    // marginLeft: theme.spacing(2),
    // color: theme.palette.primary.main
    // }))

    // const CleaveInput = styled(Cleave)(({ theme }) => ({
    // maxWidth: 48,
    // textAlign: 'center',
    // height: '48px !important',
    // fontSize: '150% !important',
    // marginTop: theme.spacing(2),
    // marginBottom: theme.spacing(2),
    // '&:not(:last-child)': {
    //     marginRight: theme.spacing(2)
    // },
    // '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    //     margin: 0,
    //     WebkitAppearance: 'none'
    // },
    // [theme.breakpoints.down('sm')]: {
    //     maxWidth: 40,
    //     height: '40px !important',
    //     fontSize: '120% !important'
    // }
    // }))

    // const defaultValues = {
    // val1: '',
    // val2: '',
    // val3: '',
    // val4: '',
    // val5: '',
    // val6: ''
    // }

    // // Encryption key
    // const ENCRYPTION_KEY = 'zMWH89JA7Nix4HM+ij3sF6KO3ZumDInh/SQKutvhuO8='

    // const EmailVerify = () => {
    // const [isVerifying, setIsVerifying] = useState(false)
    // const [isResending, setIsResending] = useState(false)
    // const [resendDisabled, setResendDisabled] = useState(false)
    // const [countdown, setCountdown] = useState(0)
    // const [error, setError] = useState('')
    // const [successMessage, setSuccessMessage] = useState('')
    // const [isBackspace, setIsBackspace] = useState(false)
    // const [isNavigating, setIsNavigating] = useState(false)
    // const [isTokenReady, setIsTokenReady] = useState(false)

    // const router = useRouter()
    // const { token } = router.query

    // // ** Hooks
    // const auth = useAuth()
    // const theme = useTheme()
    
    // const { settings } = useSettings()
    // const hidden = useMediaQuery(theme.breakpoints.down('md'))
    // const { email } = router.query

    // // ** Vars
    // const { skin } = settings

    // const {
    //     control,
    //     handleSubmit,
    //     setValue,
    //     formState: { errors }
    // } = useForm({ defaultValues })

    // // ** Vars
    // const errorsArray = Object.keys(errors)

    // // Function to encrypt OTP
    // const encryptOTP = (otp) => {
    //     try {
    //     const encrypted = CryptoJS.AES.encrypt(otp, ENCRYPTION_KEY).toString()
    //     return encrypted
    //     } catch (error) {
    //     console.error('Encryption error:', error)
    //     return null
    //     }
    // }

    // // Handle token availability - remove alert and just log
    // useEffect(() => {
    //     if (token) {
    //     console.log('Token received:', token)
    //     setIsTokenReady(true)
    //     // You can perform token validation here
    //     }
    // }, [token])

    // // Check if token exists in URL, if not redirect
    // useEffect(() => {
    //     // Wait for router to be ready
    //     if (router.isReady) {
    //     const { token } = router.query
    //     if (!token) {
    //         // No token found, redirect to login
    //         console.log('No token found, redirecting to login')
    //         router.push('/login')
    //     }
    //     }
    // }, [router.isReady, router.query, router])

    // // Countdown timer for resend cooldown
    // useEffect(() => {
    //     let timer
    //     if (resendDisabled && countdown > 0) {
    //     timer = setTimeout(() => {
    //         setCountdown(prev => prev - 1)
    //     }, 1000)
    //     } else if (countdown === 0 && resendDisabled) {
    //     setResendDisabled(false)
    //     }
    //     return () => {
    //     if (timer) clearTimeout(timer)
    //     }
    // }, [resendDisabled, countdown])

    // const handleChange = (event, onChange) => {
    //     if (!isBackspace) {
    //     onChange(event)

    //     // @ts-ignore
    //     const form = event.target.form
    //     const index = [...form].indexOf(event.target)
    //     if (form[index].value && form[index].value.length) {
    //         form.elements[index + 1].focus()
    //     }
    //     event.preventDefault()
    //     }
    // }

    // const handleKeyDown = (event) => {
    //     if (event.key === 'Backspace') {
    //     setIsBackspace(true)

    //     // @ts-ignore
    //     const form = event.target.form
    //     const index = [...form].indexOf(event.target)
    //     if (index >= 1) {
    //         if (!(form[index].value && form[index].value.length)) {
    //         form.elements[index - 1].focus()
    //         }
    //     }
    //     } else {
    //     setIsBackspace(false)
    //     }
    // }

    // const renderInputs = () => {
    //     const inputKeys = ['val1', 'val2', 'val3', 'val4', 'val5', 'val6']
        
    //     return inputKeys.map((val, index) => (
    //     <Controller
    //         key={val}
    //         name={val}
    //         control={control}
    //         rules={{ required: true }}
    //         render={({ field: { value, onChange } }) => (
    //         <Box
    //             type='tel'
    //             value={value}
    //             autoFocus={index === 0}
    //             component={CleaveInput}
    //             onKeyDown={handleKeyDown}
    //             onChange={(event) => handleChange(event, onChange)}
    //             options={{ blocks: [1], numeral: true, numeralPositiveOnly: true }}
    //             sx={{ 
    //             [theme.breakpoints.down('sm')]: { 
    //                 px: `${theme.spacing(2)} !important`,
    //                 marginRight: `${theme.spacing(1)} !important`
    //             } 
    //             }}
    //         />
    //         )}
    //     />
    //     ))
    // }

    // const onSubmit = async (data) => {
    //     if (isVerifying) return

    //     setIsVerifying(true)
    //     setError('')

    //     const enteredOtp = Object.values(data).join('')
        
    //     // Encrypt the OTP before sending
    //     const encryptedOtp = encryptOTP(enteredOtp)
        
    //     if (!encryptedOtp) {
    //     setError('Failed to encrypt verification code. Please try again.')
    //     setIsVerifying(false)
    //     return
    //     }
        
    //     console.log('Original OTP:', enteredOtp)
    //     console.log('Encrypted OTP:', encryptedOtp)

    //     const payload = {
    //             "otp": encryptedOtp
    //     }

    // const sendOtp = async () => {
    // try {
    //     const response = await UseJwt.sendOtpForEmail(token, payload)

    //     console.log(response.data)
    // } catch (error) {
    //     console.error(error)
    // }
    // }

   

    //     sendOtp()

   







    //     // Here you would send the encrypted OTP to your API
    //     // For example:
    //     // const response = await verifyEmail({ otp: encryptedOtp, token })
        
    //     // Simulate API call
    //     setTimeout(() => {
    //     console.log('Sending encrypted OTP to server:', encryptedOtp)
    //     setIsVerifying(false)
    //     // Handle response here
    //     }, 1000)
    // }

    // const handleResendOTP = () => {
    //     if (isResending || resendDisabled) return

    //     setIsResending(true)
    //     setError('')
    //     setSuccessMessage('')

    //     // Simulate API delay for resending OTP
    //     setTimeout(() => {
    //     // Generate random OTP for demo
    //     const newOTP = Math.floor(100000 + Math.random() * 900000).toString()
        
    //     // Here you would make an API call to resend the verification email
    //     // For demo, we'll just show a message
    //     setSuccessMessage(`Verification code has been resent to your email!`)
    //     setResendDisabled(true)
    //     setCountdown(30) // 30 seconds cooldown
    //     setIsResending(false)
        
    //     // Clear success message after 5 seconds
    //     setTimeout(() => {
    //         setSuccessMessage('')
    //     }, 5000)
    //     }, 1000)
    // }

    // const imageSource = skin === 'bordered' ? 'auth-v2-two-steps-illustration-bordered' : 'auth-v2-two-steps-illustration'

    // // Don't render anything until router is ready and token is checked
    // if (!router.isReady) {
    //     return (
    //     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    //         <CircularProgress />
    //     </Box>
    //     )
    // }

    // return (
    //     <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
    //     {!hidden ? (
    //         <Box
    //         sx={{
    //             flex: 1,
    //             display: 'flex',
    //             position: 'relative',
    //             alignItems: 'center',
    //             borderRadius: '20px',
    //             justifyContent: 'center',
    //             backgroundColor: 'customColors.bodyBg',
    //             margin: theme => theme.spacing(8, 0, 8, 8)
    //         }}
    //         >
    //         <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
    //             <AnimatePresence mode='wait'>
    //             <motion.div
    //                 key='verify'
    //                 initial={{ opacity: 0 }}
    //                 animate={{ opacity: 1 }}
    //                 exit={{ opacity: 0 }}
    //                 transition={{ delay: 0.3, duration: 0.5, ease: 'easeInOut' }}
    //                 style={{
    //                 position: 'absolute',
    //                 width: '100%',
    //                 height: '100%',
    //                 display: 'flex',
    //                 justifyContent: 'center',
    //                 alignItems: 'center'
    //                 }}
    //             >
    //                 <TwoStepsIllustration 
    //                 alt='two-steps-illustration' 
    //                 src={`/images/pages/${imageSource}-${theme.palette.mode}.png`} 
    //                 />
    //             </motion.div>
    //             </AnimatePresence>
    //         </Box>
    //         </Box>
    //     ) : null}

    //     <RightWrapper>
    //         <Box
    //         sx={{
    //             p: [6, 12],
    //             height: '100%',
    //             display: 'flex',
    //             alignItems: 'center',
    //             justifyContent: 'center'
    //         }}
    //         >
    //         <AnimatePresence mode='wait'>
    //             {!isNavigating ? (
    //             <motion.div
    //                 key='verify-form'
    //                 initial='hiddenRight'
    //                 animate='visible'
    //                 exit='exitLeft'
    //                 variants={slideVariants}
    //                 transition={{ duration: 0.5 }}
    //                 style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
    //             >
    //                 <Box sx={{ width: '100%', maxWidth: 400 }}>
    //                 {/* Logo SVG with animation */}
    //                 <img
    //           src='/images/logos/locktrust-logo.png'
    //           alt='LockTrust Logo'
    //           style={{
    //             height: '60px',
    //             width: 'auto',
    //             objectFit: 'contain'
    //           }}
    //         />

    //                 {/* Title */}
    //                 <motion.div
    //                     initial={{ y: -20, opacity: 0 }}
    //                     animate={{ y: 0, opacity: 1 }}
    //                     transition={{ delay: 0.3, duration: 0.5 }}
    //                 >
    //                     <Box sx={{ my: 6 }}>
    //                     <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
    //                         Verify Your Email 💬
    //                     </Typography>
    //                     <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>
    //                         We sent a verification code to your email. Enter the code in the field below to verify your email address.
    //                     </Typography>
    //                     <Typography sx={{ fontWeight: 500, color: theme.palette.primary.main }}>
    //                         {email || 'your email address'}
    //                     </Typography>
    //                     </Box>
    //                 </motion.div>

    //                 {/* Success Alert */}
    //                 <motion.div
    //                     initial={{ scale: 0.95, opacity: 0 }}
    //                     animate={{ scale: 1, opacity: 1 }}
    //                     transition={{ delay: 0.4, duration: 0.5 }}
    //                 >
    //                     {successMessage && (
    //                     <Alert 
    //                         severity='success' 
    //                         sx={{ mb: 4 }}
    //                         onClose={() => setSuccessMessage('')}
    //                     >
    //                         {successMessage}
    //                     </Alert>
    //                     )}
    //                 </motion.div>

    //                 {/* Error Alert */}
    //                 <motion.div
    //                     initial={{ scale: 0.95, opacity: 0 }}
    //                     animate={{ scale: 1, opacity: 1 }}
    //                     transition={{ delay: 0.45, duration: 0.5 }}
    //                 >
    //                     {error && (
    //                     <Alert severity='error' sx={{ mb: 4 }} onClose={() => setError('')}>
    //                         {error}
    //                     </Alert>
    //                     )}
    //                 </motion.div>

    //                 <motion.div
    //                     initial={{ y: 20, opacity: 0 }}
    //                     animate={{ y: 0, opacity: 1 }}
    //                     transition={{ delay: 0.5, duration: 0.5 }}
    //                 >
    //                     <Typography sx={{ fontWeight: 500, color: 'text.secondary', mb: 2 }}>
    //                     Type your 6-digit verification code
    //                     </Typography>
    //                 </motion.div>

    //                 {/* Verification Form */}
    //                 <motion.form
    //                     onSubmit={handleSubmit(onSubmit)}
    //                     initial={{ y: 20, opacity: 0 }}
    //                     animate={{ y: 0, opacity: 1 }}
    //                     transition={{ delay: 0.6, duration: 0.5 }}
    //                 >
    //                     <CleaveWrapper
    //                     sx={{
    //                         display: 'flex',
    //                         alignItems: 'center',
    //                         justifyContent: 'space-between',
    //                         ...(errorsArray.length && {
    //                         '& .invalid:focus': {
    //                             borderColor: theme => `${theme.palette.error.main} !important`,
    //                             boxShadow: theme => `0 1px 3px 0 ${hexToRGBA(theme.palette.error.main, 0.4)}`
    //                         }
    //                         })
    //                     }}
    //                     >
    //                     {renderInputs()}
    //                     </CleaveWrapper>
                        
    //                     {errorsArray.length ? (
    //                     <FormHelperText sx={{ color: 'error.main' }}>Please enter a valid verification code</FormHelperText>
    //                     ) : null}

    //                     <Button 
    //                     fullWidth 
    //                     type='submit' 
    //                     variant='contained' 
    //                     disabled={isVerifying} 
    //                     sx={{ mt: 4 }}
    //                     >
    //                     {isVerifying ? (
    //                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    //                         <CircularProgress size={24} color='inherit' />
    //                         Verifying...
    //                         </Box>
    //                     ) : (
    //                         'Verify Email'
    //                     )}
    //                     </Button>
    //                 </motion.form>

    //                 <motion.div
    //                     initial={{ y: 20, opacity: 0 }}
    //                     animate={{ y: 0, opacity: 1 }}
    //                     transition={{ delay: 0.7, duration: 0.5 }}
    //                 >
    //                     <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    //                     <Typography sx={{ color: 'text.secondary' }}>Didn't get the code?</Typography>
    //                     <LinkStyled 
    //                         href='#' 
    //                         onClick={(e) => {
    //                         e.preventDefault()
    //                         handleResendOTP()
    //                         }}
    //                     >
    //                         {isResending ? (
    //                         <CircularProgress size={20} />
    //                         ) : resendDisabled ? (
    //                         `Resend in ${countdown}s`
    //                         ) : (
    //                         'Resend'
    //                         )}
    //                     </LinkStyled>
    //                     </Box>
    //                 </motion.div>

    //                 <motion.div
    //                     initial={{ y: 20, opacity: 0 }}
    //                     animate={{ y: 0, opacity: 1 }}
    //                     transition={{ delay: 0.9, duration: 0.5 }}
    //                 >
    //                     <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    //                     <Button
    //                         variant='text'
    //                         onClick={() => router.push('/login')}
    //                         sx={{ textTransform: 'none' }}
    //                         startIcon={<Icon icon='tabler:arrow-left' />}
    //                     >
    //                         Back to Login
    //                     </Button>
    //                     </Box>
    //                 </motion.div>
    //                 </Box>
    //             </motion.div>
    //             ) : (
    //             <motion.div
    //                 key='loading'
    //                 initial='hiddenRight'
    //                 animate='visible'
    //                 exit='exitRight'
    //                 variants={slideVariants}
    //                 transition={{ duration: 0.5 }}
    //                 style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
    //             >
    //                 <Box sx={{ width: '100%', maxWidth: 400, textAlign: 'center' }}>
    //                 <motion.div
    //                     animate={{ 
    //                     scale: [1, 1.2, 1],
    //                     rotate: [0, 360]
    //                     }}
    //                     transition={{ 
    //                     duration: 1,
    //                     repeat: Infinity,
    //                     ease: "linear"
    //                     }}
    //                 >
    //                     <Icon icon='tabler:loader' width={60} height={60} style={{ color: theme.palette.primary.main }} />
    //                 </motion.div>
    //                 <Typography sx={{ mt: 4, color: 'text.secondary' }}>
    //                     Verifying and redirecting...
    //                 </Typography>
    //                 </Box>
    //             </motion.div>
    //             )}
    //         </AnimatePresence>
    //         </Box>
    //     </RightWrapper>
    //     </Box>
    // )
    // }

    // EmailVerify.getLayout = page => <BlankLayout>{page}</BlankLayout>
    // EmailVerify.guestGuard = true

    // export default EmailVerify



  // EmailVerify.jsx

import { useState, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
import UseJwt from "./../../endpoints/jwt/useJwt"

// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Autocomplete from '@mui/material/Autocomplete'

// ** Animation Imports
import { AnimatePresence, motion } from 'framer-motion'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import Cleave from 'cleave.js/react'
import { useForm, Controller } from 'react-hook-form'
import CryptoJS from 'crypto-js'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Custom Styled Component
import CleaveWrapper from 'src/@core/styles/libs/react-cleave'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Fake DB Import for countries
import { countries } from 'src/@fake-db/autocomplete'

// ** Toast
import toast from 'react-hot-toast'

// ** Styles
import 'cleave.js/dist/addons/cleave-phone.us'

// ** Animation Variants
const slideVariants = {
  hiddenLeft: { x: -400, opacity: 0 },
  hiddenRight: { x: 400, opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exitLeft: { x: -400, opacity: 0 },
  exitRight: { x: 400, opacity: 0 }
}

// ** Styled Components
const TwoStepsIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 650,
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
  fontSize: '1rem',
  textDecoration: 'none',
  marginLeft: theme.spacing(2),
  color: theme.palette.primary.main
}))

const CleaveInput = styled(Cleave)(({ theme }) => ({
  maxWidth: 48,
  textAlign: 'center',
  height: '48px !important',
  fontSize: '150% !important',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  '&:not(:last-child)': {
    marginRight: theme.spacing(2)
  },
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    margin: 0,
    WebkitAppearance: 'none'
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: 40,
    height: '40px !important',
    fontSize: '120% !important'
  }
}))

const defaultValues = {
  val1: '',
  val2: '',
  val3: '',
  val4: '',
  val5: '',
  val6: ''
}

// Secret key for AES encryption - must match the backend secretKey exactly
const SECRET_KEY = 'zMWH89JA7Nix4HM+ij3sF6KO3ZumDInh/SQKutvhuO8='

// Helper function to derive AES key using SHA-256 (matching Java backend)
const deriveAESKey = () => {
  const secretWordArray = CryptoJS.enc.Utf8.parse(SECRET_KEY)
  const keyHash = CryptoJS.SHA256(secretWordArray)
  return keyHash
}

// Encryption function that matches Java backend exactly
const encryptAES = (plainText) => {
  try {
    const iv = CryptoJS.lib.WordArray.random(16)
    const key = deriveAESKey()
    const encrypted = CryptoJS.AES.encrypt(plainText, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    const combined = iv.concat(encrypted.ciphertext)
    return CryptoJS.enc.Base64.stringify(combined)
  } catch (error) {
    console.error('Encryption error:', error)
    return null
  }
}

const EmailVerify = () => {
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [resendDisabled, setResendDisabled] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isBackspace, setIsBackspace] = useState(false)
  const [isVerifyingInitial, setIsVerifyingInitial] = useState(true)
  const [emailAddress, setEmailAddress] = useState('')
  const [userDetails, setUserDetails] = useState(null)
  const [isEditingPhone, setIsEditingPhone] = useState(false)
  const [selectedCountryCode, setSelectedCountryCode] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isUpdatingPhone, setIsUpdatingPhone] = useState(false)

  const router = useRouter()
  const { token, email: emailFromQuery } = router.query

  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const { skin } = settings

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({ defaultValues })

  const errorsArray = Object.keys(errors)

  // Function to decrypt token and get user details
  const decryptTokenAndGetUserDetails = async () => {
    try {
      const response = await UseJwt.decryptToken(token)
      console.log('Decrypted user details:', response.data)
      
      if (response.data) {
        setUserDetails(response.data)
        setEmailAddress(response.data.emailId || emailFromQuery || 'your email address')
        
        // Find and set the country code object
        if (response.data.countryCode || response.data.dialCountryCode) {
          const countryCodeValue = response.data.dialCountryCode || response.data.countryCode
          const foundCountry = countries.find(
            country => country.code === countryCodeValue || country.iso2 === countryCodeValue
          )
          setSelectedCountryCode(foundCountry || null)
        }
        
        // Set phone number
        if (response.data.mobile) {
          setPhoneNumber(response.data.mobile)
        }
      }
    } catch (error) {
      console.error('Error decrypting token:', error)
      setEmailAddress(emailFromQuery || 'your email address')
    }
  }

  // Handle token availability and auto-verify on page load
  useEffect(() => {
    const verifyTokenOnLoad = async () => {
      if (router.isReady && token && !isVerifyingInitial) {
        return
      }
      
      if (router.isReady && token) {
        console.log('Token found in URL:', token)
        
        // First, decrypt token to get user details
        await decryptTokenAndGetUserDetails()
        
        // Then automatically call the verify endpoint on page load
        await verifyTokenWithBackend()
      } else if (router.isReady && !token) {
        console.log('No token found, redirecting to login')
        setError('Invalid verification link. Please try again.')
        setTimeout(() => {
          router.push('/login')
        }, 3000)
      }
    }

    verifyTokenOnLoad()
  }, [router.isReady, token])

  const verifyTokenWithBackend = async () => {
    try {
      setIsVerifyingInitial(true)
      setError('')
      
      const response = await UseJwt.verifyEmailToken(token)
      
      console.log('Token verification response:', response.data)
      
      if (response.data && response.data.success) {
        setSuccessMessage('Email verified successfully! Redirecting to login...')
        setTimeout(() => {
          router.push('/login')
        }, 3000)
      } else {
        setIsVerifyingInitial(false)
      }
    } catch (error) {
      console.error('Token verification error:', error)
      const errorMessage = error.response?.data?.message || 'Verification link is invalid or has expired. Please use OTP verification below.'
      setError(errorMessage)
      setIsVerifyingInitial(false)
    }
  }

  // Countdown timer for resend cooldown
  useEffect(() => {
    let timer
    if (resendDisabled && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [resendDisabled, countdown])

  const handleChange = (event, onChange) => {
    if (!isBackspace) {
      onChange(event)

      const form = event.target.form
      const index = [...form].indexOf(event.target)
      if (form[index].value && form[index].value.length) {
        if (form.elements[index + 1]) {
          form.elements[index + 1].focus()
        }
      }
      event.preventDefault()
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Backspace') {
      setIsBackspace(true)

      const form = event.target.form
      const index = [...form].indexOf(event.target)
      if (index >= 1) {
        if (!(form[index].value && form[index].value.length)) {
          if (form.elements[index - 1]) {
            form.elements[index - 1].focus()
          }
        }
      }
    } else {
      setIsBackspace(false)
    }
  }

  const renderInputs = () => {
    const inputKeys = ['val1', 'val2', 'val3', 'val4', 'val5', 'val6']
    
    return inputKeys.map((val, index) => (
      <Controller
        key={val}
        name={val}
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <Box
            type='tel'
            value={value}
            autoFocus={index === 0}
            component={CleaveInput}
            onKeyDown={handleKeyDown}
            onChange={(event) => handleChange(event, onChange)}
            options={{ blocks: [1], numeral: true, numeralPositiveOnly: true }}
            sx={{ 
              [theme.breakpoints.down('sm')]: { 
                px: `${theme.spacing(2)} !important`,
                marginRight: `${theme.spacing(1)} !important`
              } 
            }}
          />
        )}
      />
    ))
  }

  const handleEditPhone = () => {
    setIsEditingPhone(true)
  }

  const handleCancelEdit = () => {
    setIsEditingPhone(false)
    // Reset to original values
    if (userDetails) {
      const foundCountry = countries.find(
        country => country.code === (userDetails.dialCountryCode || userDetails.countryCode)
      )
      setSelectedCountryCode(foundCountry || null)
      setPhoneNumber(userDetails.mobile || '')
    }
  }

  const handleUpdatePhone = async () => {
    if (!phoneNumber || phoneNumber.length < 6) {
      toast.error('Please enter a valid phone number')
      return
    }

    if (!selectedCountryCode) {
      toast.error('Please select a country code')
      return
    }

    setIsUpdatingPhone(true)
    try {
      const payload = {
        dialCountryCode: selectedCountryCode.code || selectedCountryCode.iso2,
        countryCode: `+${selectedCountryCode.dialCode || selectedCountryCode.phone}`,
        mobile: phoneNumber,
        token: token
      }
      
      const response = await UseJwt.updatePhoneNumber(payload)
      
      if (response.data && response.data.success) {
        toast.success('Phone number updated successfully!')
        setIsEditingPhone(false)
        
        // Update local state
        setUserDetails({
          ...userDetails,
          dialCountryCode: selectedCountryCode.code || selectedCountryCode.iso2,
          countryCode: `+${selectedCountryCode.dialCode || selectedCountryCode.phone}`,
          mobile: phoneNumber
        })
      } else {
        toast.error(response.data?.message || 'Failed to update phone number')
      }
    } catch (error) {
      console.error('Error updating phone:', error)
      toast.error(error.response?.data?.message || 'Failed to update phone number')
    } finally {
      setIsUpdatingPhone(false)
    }
  }

  const onSubmit = async (data) => {
    if (isVerifying) return

    setIsVerifying(true)
    setError('')

    const enteredOtp = Object.values(data).join('')
    
    if (enteredOtp.length !== 6) {
      setError('Please enter a valid 6-digit verification code')
      setIsVerifying(false)
      return
    }
    
    const encryptedOtp = encryptAES(enteredOtp)
    
    if (!encryptedOtp) {
      setError('Failed to encrypt verification code. Please try again.')
      setIsVerifying(false)
      return
    }
    
    console.log('Original OTP:', enteredOtp)
    console.log('Encrypted OTP (Base64):', encryptedOtp)

    const payload = {
      otp: encryptedOtp
    }

    try {
      const response = await UseJwt.sendOtpForEmail(token, payload)
      console.log('API Response:', response.data)
      
      if (response.data && response.data.success) {
        setSuccessMessage('Email verified successfully! Redirecting to login...')
        setTimeout(() => {
          router.push('/login')
        }, 3000)
      } else {
        setError(response.data?.message || 'Invalid verification code. Please try again.')
      }
    } catch (error) {
      console.error('Verification error:', error)
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to verify email. Please try again.'
      setError(errorMessage)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResendOTP = async () => {
    if (isResending || resendDisabled) return

    setIsResending(true)
    setError('')
    setSuccessMessage('')

    try {
      const response = await UseJwt.resendVerificationOtp(token)
      
      if (response.data && response.data.success) {
        setSuccessMessage(`Verification code has been resent to your email!`)
        setResendDisabled(true)
        setCountdown(30)
        
        setTimeout(() => {
          setSuccessMessage('')
        }, 5000)
      } else {
        setError(response.data?.message || 'Failed to resend verification code')
      }
    } catch (error) {
      console.error('Resend error:', error)
      setError(error.response?.data?.message || 'Failed to resend verification code. Please try again.')
    } finally {
      setIsResending(false)
    }
  }

  const imageSource = skin === 'bordered' ? 'auth-v2-two-steps-illustration-bordered' : 'auth-v2-two-steps-illustration'

  if (isVerifyingInitial && router.isReady && token) {
    return (
      <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
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
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress size={60} />
              <Typography sx={{ mt: 4, color: 'text.secondary' }}>
                Verifying your email...
              </Typography>
            </Box>
          </Box>
        </RightWrapper>
      </Box>
    )
  }

  if (!router.isReady) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

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
          <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <AnimatePresence mode='wait'>
              <motion.div
                key='verify'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <TwoStepsIllustration 
                  alt='two-steps-illustration' 
                  src={`/images/pages/${imageSource}-${theme.palette.mode}.png`} 
                />
              </motion.div>
            </AnimatePresence>
          </Box>
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
          <AnimatePresence mode='wait'>
            <motion.div
              key='verify-form'
              initial='hiddenRight'
              animate='visible'
              exit='exitLeft'
              variants={slideVariants}
              transition={{ duration: 0.5 }}
              style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <Box sx={{ width: '100%', maxWidth: 400 }}>
                {/* Logo */}
                <img
                  src='/images/logos/locktrust-logo.png'
                  alt='LockTrust Logo'
                  style={{
                    height: '60px',
                    width: 'auto',
                    objectFit: 'contain'
                  }}
                />

                {/* Title */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Box sx={{ mb: 6 }}>
                    <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
                      Verify Your Email 💬
                    </Typography>
                    <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>
                      Enter the verification code sent to your email to verify your email address.
                    </Typography>
                    
                    {/* Email with verification badge */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <Typography sx={{ fontWeight: 500, color: theme.palette.primary.main }}>
                        {emailAddress}
                      </Typography>
                      {userDetails?.emailVerified && (
                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
                          <Icon icon='tabler:circle-check-filled' fontSize={20} />
                          <Typography variant='caption' sx={{ ml: 0.5, color: 'success.main' }}>
                            Verified
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </motion.div>

                {/* Phone Number Section - Inline Edit */}
                {userDetails && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                  >
                    <Box sx={{ mb: 4, p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant='body2' sx={{ fontWeight: 500, color: 'text.secondary' }}>
                          Phone Number
                        </Typography>
                        {!isEditingPhone && (
                          <IconButton size='small' onClick={handleEditPhone} sx={{ color: 'primary.main' }}>
                            <Icon icon='tabler:edit' fontSize={20} />
                          </IconButton>
                        )}
                      </Box>
                      
                      {!isEditingPhone ? (
                        <>
                          <Typography variant='body1' sx={{ fontWeight: 500 }}>
                            {userDetails.countryCode || '+91'} {userDetails.mobile}
                          </Typography>
                          {!userDetails.phoneVerified && (
                            <Typography variant='caption' sx={{ color: 'warning.main', display: 'block', mt: 0.5 }}>
                              Not verified yet
                            </Typography>
                          )}
                        </>
                      ) : (
                        <Box sx={{ mt: 2 }}>
                          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <FormControl fullWidth sx={{ flex: 0.5 }}>
                              <Autocomplete
                                id='country-select'
                                options={countries}
                                autoHighlight
                                getOptionLabel={(option) => {
                                  if (!option) return ''
                                  const dialCode = option.dialCode || option.phone || ''
                                  const name = option.name || option.label || ''
                                  return dialCode ? `${name} (+${dialCode})` : name
                                }}
                                value={selectedCountryCode}
                                onChange={(event, newValue) => {
                                  setSelectedCountryCode(newValue)
                                }}
                                renderOption={(props, option) => {
                                  const dialCode = option.dialCode || option.phone || ''
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
                                    size='small'
                                    InputProps={{
                                      ...params.InputProps,
                                      startAdornment: selectedCountryCode && (selectedCountryCode.code || selectedCountryCode.iso2) && (
                                        <img
                                          src={`https://flagcdn.com/w20/${(selectedCountryCode.code || selectedCountryCode.iso2)?.toLowerCase()}.png`}
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
                            </FormControl>
                            
                            <TextField
                              fullWidth
                              size='small'
                              label='Phone Number'
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                              placeholder='Enter phone number'
                              inputProps={{ maxLength: 15 }}
                              sx={{ flex: 0.5 }}
                            />
                          </Box>
                          
                          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                            <Button size='small' onClick={handleCancelEdit} disabled={isUpdatingPhone}>
                              Cancel
                            </Button>
                            <Button 
                              size='small' 
                              variant='contained' 
                              onClick={handleUpdatePhone} 
                              disabled={isUpdatingPhone}
                            >
                              {isUpdatingPhone ? <CircularProgress size={20} /> : 'Save'}
                            </Button>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </motion.div>
                )}

                {/* Success Alert */}
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {successMessage && (
                    <Alert 
                      severity='success' 
                      sx={{ mb: 4 }}
                      onClose={() => setSuccessMessage('')}
                    >
                      {successMessage}
                    </Alert>
                  )}
                </motion.div>

                {/* Error Alert */}
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                >
                  {error && (
                    <Alert severity='error' sx={{ mb: 4 }} onClose={() => setError('')}>
                      {error}
                    </Alert>
                  )}
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Typography sx={{ fontWeight: 500, color: 'text.secondary', mb: 2 }}>
                    Type your 6-digit verification code
                  </Typography>
                </motion.div>

                {/* Verification Form */}
                <motion.form
                  onSubmit={handleSubmit(onSubmit)}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <CleaveWrapper
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      ...(errorsArray.length && {
                        '& .invalid:focus': {
                          borderColor: theme => `${theme.palette.error.main} !important`,
                          boxShadow: theme => `0 1px 3px 0 ${hexToRGBA(theme.palette.error.main, 0.4)}`
                        }
                      })
                    }}
                  >
                    {renderInputs()}
                  </CleaveWrapper>
                  
                  {errorsArray.length ? (
                    <FormHelperText sx={{ color: 'error.main' }}>Please enter a valid verification code</FormHelperText>
                  ) : null}

                  <Button 
                    fullWidth 
                    type='submit' 
                    variant='contained' 
                    disabled={isVerifying} 
                    sx={{ mt: 4 }}
                  >
                    {isVerifying ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CircularProgress size={24} color='inherit' />
                        Verifying...
                      </Box>
                    ) : (
                      'Verify Email'
                    )}
                  </Button>
                </motion.form>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography sx={{ color: 'text.secondary' }}>Didn't get the code?</Typography>
                    <LinkStyled 
                      href='#' 
                      onClick={(e) => {
                        e.preventDefault()
                        handleResendOTP()
                      }}
                    >
                      {isResending ? (
                        <CircularProgress size={20} />
                      ) : resendDisabled ? (
                        `Resend in ${countdown}s`
                      ) : (
                        'Resend'
                      )}
                    </LinkStyled>
                  </Box>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button
                      variant='text'
                      onClick={() => router.push('/login')}
                      sx={{ textTransform: 'none' }}
                      startIcon={<Icon icon='tabler:arrow-left' />}
                    >
                      Back to Login
                    </Button>
                  </Box>
                </motion.div>
              </Box>
            </motion.div>
          </AnimatePresence>
        </Box>
      </RightWrapper>
    </Box>
  )
}

EmailVerify.getLayout = page => <BlankLayout>{page}</BlankLayout>
EmailVerify.guestGuard = true

export default EmailVerify