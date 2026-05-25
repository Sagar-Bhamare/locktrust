import { useState, useEffect, useRef, ReactNode } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

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
import Paper from '@mui/material/Paper'

// ** Animation Imports
import { AnimatePresence, motion } from 'framer-motion'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import Cleave from 'cleave.js/react'
import { useForm, Controller } from 'react-hook-form'

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

const VerifyOTPPage = () => {
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [resendDisabled, setResendDisabled] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [generatedOTP, setGeneratedOTP] = useState('')
  const [isBackspace, setIsBackspace] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)

  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const router = useRouter()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const { email } = router.query

  // ** Vars
  const { skin } = settings

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** Vars
  const errorsArray = Object.keys(errors)

  // Generate dummy OTP on component mount
  useEffect(() => {
    // Generate a random 6-digit OTP for demo
    const dummyOTP = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedOTP(dummyOTP)
    
    // Auto-fill OTP for demo convenience
    const otpDigits = dummyOTP.split('')
    otpDigits.forEach((digit, index) => {
      setValue(`val${index + 1}`, digit)
    })
  }, [setValue])

  // Check if email exists in session storage
  useEffect(() => {
    const tempEmail = sessionStorage.getItem('tempEmail')
    if (!tempEmail && !email) {
      // No email found, redirect to login
      router.push('/login')
    }
  }, [email, router])

  // Handle countdown for resend button
  useEffect(() => {
    let timer
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    } else {
      setResendDisabled(false)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  const handleChange = (event, onChange) => {
    if (!isBackspace) {
      onChange(event)

      // @ts-ignore
      const form = event.target.form
      const index = [...form].indexOf(event.target)
      if (form[index].value && form[index].value.length) {
        form.elements[index + 1].focus()
      }
      event.preventDefault()
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Backspace') {
      setIsBackspace(true)

      // @ts-ignore
      const form = event.target.form
      const index = [...form].indexOf(event.target)
      if (index >= 1) {
        if (!(form[index].value && form[index].value.length)) {
          form.elements[index - 1].focus()
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

  const onSubmit = async (data) => {
    if (isVerifying) return

    setIsVerifying(true)
    setError('')

    const enteredOtp = Object.values(data).join('')

    // Simulate API delay
    setTimeout(() => {
      // Check if entered OTP matches the generated dummy OTP
      if (enteredOtp === generatedOTP) {
        // Get stored login credentials
        const tempEmail = sessionStorage.getItem('tempEmail')
        const tempPassword = sessionStorage.getItem('tempPassword')
        const rememberMe = sessionStorage.getItem('rememberMe') === 'true'

        if (tempEmail && tempPassword) {
          // Trigger exit animation - Slide OUT to LEFT
          setIsNavigating(true)
          
          // Wait for animation to complete then complete login
          setTimeout(() => {
            // Complete the login process using auth context
            auth.login({ 
              email: tempEmail, 
              password: tempPassword, 
              rememberMe 
            }, (error) => {
              if (error) {
                setError('Login failed. Please try again.')
                setIsVerifying(false)
                setIsNavigating(false)
              } else {
                // Clear temporary data
                sessionStorage.removeItem('tempEmail')
                sessionStorage.removeItem('tempPassword')
                sessionStorage.removeItem('rememberMe')
                
                // Redirect to dashboard
                const returnUrl = router.query.returnUrl || '/dashboards/crm/'
                router.push(returnUrl)
              }
            })
          }, 500) // Match animation duration
        } else {
          setError('Session expired. Please login again.')
          setIsVerifying(false)
          setTimeout(() => {
            router.push('/login')
          }, 2000)
        }
      } else {
        setError(`Invalid OTP. The correct OTP is ${generatedOTP}`)
        setIsVerifying(false)
      }
    }, 1000) // Simulate network delay
  }

  const handleResendOTP = () => {
    if (isResending || resendDisabled) return

    setIsResending(true)
    setError('')
    setSuccessMessage('')

    // Simulate API delay for resending OTP
    setTimeout(() => {
      // Generate new dummy OTP
      const newOTP = Math.floor(100000 + Math.random() * 900000).toString()
      setGeneratedOTP(newOTP)
      
      // Auto-fill new OTP for convenience
      const otpDigits = newOTP.split('')
      otpDigits.forEach((digit, index) => {
        setValue(`val${index + 1}`, digit)
      })
      
      setSuccessMessage(`New OTP has been generated! Your OTP is: ${newOTP}`)
      setResendDisabled(true)
      setCountdown(30) // 30 seconds cooldown
      setIsResending(false)
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage('')
      }, 5000)
    }, 1000)
  }

  const imageSource = skin === 'bordered' ? 'auth-v2-two-steps-illustration-bordered' : 'auth-v2-two-steps-illustration'

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
            {!isNavigating ? (
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
                  {/* Logo SVG with animation */}
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
                    <Box sx={{ my: 6 }}>
                      <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
                        Two-Step Verification 💬
                      </Typography>
                      <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>
                        We sent a verification code to your email. Enter the code in the field below.
                      </Typography>
                      <Typography sx={{ fontWeight: 500, color: theme.palette.primary.main }}>
                        {email || sessionStorage.getItem('tempEmail')}
                      </Typography>
                    </Box>
                  </motion.div>

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
                        action={
                          <Button color="inherit" size="small" onClick={() => {
                            const otpDigits = generatedOTP.split('')
                            otpDigits.forEach((digit, index) => {
                              setValue(`val${index + 1}`, digit)
                            })
                          }}>
                            Auto-fill
                          </Button>
                        }
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
                      Type your 6-digit security code
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
                      <FormHelperText sx={{ color: 'error.main' }}>Please enter a valid OTP</FormHelperText>
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
                        'Verify My Account'
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

                  {/* Demo OTP Info Card */}
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <Paper
                      variant='outlined'
                      sx={{
                        mt: 4,
                        p: 2,
                        bgcolor: 'info.lighter',
                        borderColor: 'info.main',
                        borderRadius: 2
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                        <Icon icon='tabler:info-circle' color='#0284c7' fontSize={20} />
                        <Box>
                          <Typography variant='subtitle2' sx={{ fontWeight: 600, color: 'info.main' }}>
                            Demo OTP Information
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            Your verification code is: <strong style={{ fontSize: '1.1rem', color: '#0284c7' }}>{generatedOTP}</strong>
                          </Typography>
                          <Typography variant='caption' color='text.secondary'>
                            This code is auto-filled. You can modify it for testing.
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
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
            ) : (
              <motion.div
                key='loading'
                initial='hiddenRight'
                animate='visible'
                exit='exitRight'
                variants={slideVariants}
                transition={{ duration: 0.5 }}
                style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
              >
                <Box sx={{ width: '100%', maxWidth: 400, textAlign: 'center' }}>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 360]
                    }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <Icon icon='tabler:loader' width={60} height={60} style={{ color: theme.palette.primary.main }} />
                  </motion.div>
                  <Typography sx={{ mt: 4, color: 'text.secondary' }}>
                    Verifying and redirecting...
                  </Typography>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </RightWrapper>
    </Box>
  )
}

VerifyOTPPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
VerifyOTPPage.guestGuard = true

export default VerifyOTPPage