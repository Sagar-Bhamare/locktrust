// // ** React Imports
// import { useState } from 'react'

// // ** Next Imports
// import Link from 'next/link'

// // ** MUI Components
// import Alert from '@mui/material/Alert'
// import Button from '@mui/material/Button'
// import Divider from '@mui/material/Divider'
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

// // ** Icon Imports
// import Icon from 'src/@core/components/icon'

// // ** Third Party Imports
// import * as yup from 'yup'
// import { useForm, Controller } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'

// // ** Hooks
// import { useAuth } from 'src/hooks/useAuth'
// import useBgColor from 'src/@core/hooks/useBgColor'
// import { useSettings } from 'src/@core/hooks/useSettings'

// // ** Configs
// import themeConfig from 'src/configs/themeConfig'

// // ** Layout Import
// import BlankLayout from 'src/@core/layouts/BlankLayout'

// // ** Demo Imports
// import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// // ** Styled Components
// const LoginIllustration = styled('img')(({ theme }) => ({
//   zIndex: 2,
//   maxHeight: 680,
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
//   '& .MuiFormControlLabel-label': {
//     fontSize: '0.875rem',
//     color: theme.palette.text.secondary
//   }
// }))

// const schema = yup.object().shape({
//   email: yup.string().email().required(),
//   password: yup.string().min(5).required()
// })

// const defaultValues = {
//   password: 'admin',
//   email: 'admin@vuexy.com'
// }

// const LoginPage = () => {
//   const [rememberMe, setRememberMe] = useState(true)
//   const [showPassword, setShowPassword] = useState(false)

//   // ** Hooks
//   const auth = useAuth()
//   const theme = useTheme()
//   const bgColors = useBgColor()
//   const { settings } = useSettings()
//   const hidden = useMediaQuery(theme.breakpoints.down('md'))

//   // ** Vars
//   const { skin } = settings

//   const {
//     control,
//     setError,
//     handleSubmit,
//     formState: { errors }
//   } = useForm({
//     defaultValues,
//     mode: 'onBlur',
//     resolver: yupResolver(schema)
//   })

//   const onSubmit = data => {
//     const { email, password } = data
//     auth.login({ email, password, rememberMe }, () => {
//       setError('email', {
//         type: 'manual',
//         message: 'Email or Password is invalid'
//       })
//     })
//   }
//   const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

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
//           <LoginIllustration alt='login-illustration' src={`/images/pages/${imageSource}-${theme.palette.mode}.png`} />
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
//             <svg width={34} height={23.375} viewBox='0 0 32 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
//               <path
//                 fillRule='evenodd'
//                 clipRule='evenodd'
//                 fill={theme.palette.primary.main}
//                 d='M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z'
//               />
//               <path
//                 fill='#161616'
//                 opacity={0.06}
//                 fillRule='evenodd'
//                 clipRule='evenodd'
//                 d='M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z'
//               />
//               <path
//                 fill='#161616'
//                 opacity={0.06}
//                 fillRule='evenodd'
//                 clipRule='evenodd'
//                 d='M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z'
//               />
//               <path
//                 fillRule='evenodd'
//                 clipRule='evenodd'
//                 fill={theme.palette.primary.main}
//                 d='M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z'
//               />
//             </svg>
//             <Box sx={{ my: 6 }}>
//               <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
//                 {`Welcome to ${themeConfig.templateName}! 👋🏻`}
//               </Typography>
//               <Typography sx={{ color: 'text.secondary' }}>
//                 Please sign-in to your account and start the adventure
//               </Typography>
//             </Box>
//             <Alert icon={false} sx={{ py: 3, mb: 6, ...bgColors.primaryLight, '& .MuiAlert-message': { p: 0 } }}>
//               <Typography variant='body2' sx={{ mb: 2, color: 'primary.main' }}>
//                 Admin: <strong>admin@vuexy.com</strong> / Pass: <strong>admin</strong>
//               </Typography>
//               <Typography variant='body2' sx={{ color: 'primary.main' }}>
//                 Client: <strong>client@vuexy.com</strong> / Pass: <strong>client</strong>
//               </Typography>
//             </Alert>
//             <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
//               <FormControl fullWidth sx={{ mb: 4 }}>
//                 <Controller
//                   name='email'
//                   control={control}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange, onBlur } }) => (
//                     <TextField
//                       autoFocus
//                       label='Email'
//                       value={value}
//                       onBlur={onBlur}
//                       onChange={onChange}
//                       error={Boolean(errors.email)}
//                       placeholder='admin@vuexy.com'
//                     />
//                   )}
//                 />
//                 {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
//               </FormControl>
//               <FormControl fullWidth sx={{ mb: 1.5 }}>
//                 <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
//                   Password
//                 </InputLabel>
//                 <Controller
//                   name='password'
//                   control={control}
//                   rules={{ required: true }}
//                   render={({ field: { value, onChange, onBlur } }) => (
//                     <OutlinedInput
//                       value={value}
//                       onBlur={onBlur}
//                       label='Password'
//                       onChange={onChange}
//                       id='auth-login-v2-password'
//                       error={Boolean(errors.password)}
//                       type={showPassword ? 'text' : 'password'}
//                       endAdornment={
//                         <InputAdornment position='end'>
//                           <IconButton
//                             edge='end'
//                             onMouseDown={e => e.preventDefault()}
//                             onClick={() => setShowPassword(!showPassword)}
//                           >
//                             <Icon icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} fontSize={20} />
//                           </IconButton>
//                         </InputAdornment>
//                       }
//                     />
//                   )}
//                 />
//                 {errors.password && (
//                   <FormHelperText sx={{ color: 'error.main' }} id=''>
//                     {errors.password.message}
//                   </FormHelperText>
//                 )}
//               </FormControl>
//               <Box
//                 sx={{
//                   mb: 1.75,
//                   display: 'flex',
//                   flexWrap: 'wrap',
//                   alignItems: 'center',
//                   justifyContent: 'space-between'
//                 }}
//               >
//                 <FormControlLabel
//                   label='Remember Me'
//                   control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
//                 />
//                 <LinkStyled href='/forgot-password'>Forgot Password?</LinkStyled>
//               </Box>
//               <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4 }}>
//                 Login
//               </Button>
//               <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
//                 <Typography sx={{ color: 'text.secondary', mr: 2 }}>New on our platform?</Typography>
//                 <Typography variant='body2'>
//                   <LinkStyled href='/register' sx={{ fontSize: '1rem' }}>
//                     Create an account
//                   </LinkStyled>
//                 </Typography>
//               </Box>
//               {/* <Divider
//                 sx={{
//                   fontSize: '0.875rem',
//                   color: 'text.disabled',
//                   '& .MuiDivider-wrapper': { px: 6 },
//                   my: theme => `${theme.spacing(6)} !important`
//                 }}
//               >
//                 or
//               </Divider>
//               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                 <IconButton href='/' component={Link} sx={{ color: '#497ce2' }} onClick={e => e.preventDefault()}>
//                   <Icon icon='mdi:facebook' />
//                 </IconButton>
//                 <IconButton href='/' component={Link} sx={{ color: '#1da1f2' }} onClick={e => e.preventDefault()}>
//                   <Icon icon='mdi:twitter' />
//                 </IconButton>
//                 <IconButton
//                   href='/'
//                   component={Link}
//                   onClick={e => e.preventDefault()}
//                   sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
//                 >
//                   <Icon icon='mdi:github' />
//                 </IconButton>
//                 <IconButton href='/' component={Link} sx={{ color: '#db4437' }} onClick={e => e.preventDefault()}>
//                   <Icon icon='mdi:google' />
//                 </IconButton>
//               </Box> */}
//             </form>
//           </Box>
//         </Box>
//       </RightWrapper>
//     </Box>
//   )
// }
// LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
// LoginPage.guestGuard = true

// export default LoginPage

// ** React Imports
  // import { useState } from 'react'

  // // ** Next Imports
  // import Link from 'next/link'
  // import { useRouter } from 'next/router'

  // // ** MUI Components
  // import Alert from '@mui/material/Alert'
  // import Button from '@mui/material/Button'
  // import Divider from '@mui/material/Divider'
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

  // // ** Icon Imports
  // import Icon from 'src/@core/components/icon'

  // // ** Third Party Imports
  // import * as yup from 'yup'
  // import { useForm, Controller } from 'react-hook-form'
  // import { yupResolver } from '@hookform/resolvers/yup'

  // // ** Hooks
  // import { useAuth } from 'src/hooks/useAuth'
  // import useBgColor from 'src/@core/hooks/useBgColor'
  // import { useSettings } from 'src/@core/hooks/useSettings'

  // // ** Configs
  // import themeConfig from 'src/configs/themeConfig'

  // // ** Layout Import
  // import BlankLayout from 'src/@core/layouts/BlankLayout'

  // // ** Demo Imports
  // import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

  // // ** Styled Components
  // const LoginIllustration = styled('img')(({ theme }) => ({
  //   zIndex: 2,
  //   maxHeight: 680,
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
  //   '& .MuiFormControlLabel-label': {
  //     fontSize: '0.875rem',
  //     color: theme.palette.text.secondary
  //   }
  // }))

  // // ** Validation Schema
  // const schema = yup.object().shape({
  //   email: yup.string().email().required('Email is required'),
  //   password: yup.string().min(5, 'Password must be at least 5 characters').required('Password is required')
  // })

  // const defaultValues = {
  //   password: 'admin',
  //   email: 'admin@vuexy.com'
  // }

  // const LoginPage = () => {
  //   const [rememberMe, setRememberMe] = useState(true)
  //   const [showPassword, setShowPassword] = useState(false)
  //   const [isLoggingIn, setIsLoggingIn] = useState(false)

  //   // ** Hooks
  //   const auth = useAuth()
  //   const theme = useTheme()
  //   const router = useRouter()
  //   const bgColors = useBgColor()
  //   const { settings } = useSettings()
  //   const hidden = useMediaQuery(theme.breakpoints.down('md'))

  //   // ** Vars
  //   const { skin } = settings

  //   const {
  //     control,
  //     setError,
  //     handleSubmit,
  //     formState: { errors }
  //   } = useForm({
  //     defaultValues,
  //     mode: 'onBlur',
  //     resolver: yupResolver(schema)
  //   })

  //   const onSubmit = async data => {
  //     if (isLoggingIn) return // Prevent multiple submissions

  //     setIsLoggingIn(true)
  //     const { email, password } = data

  //     // Get return URL from query params or default to dashboard
  //     const returnUrl = router.query.returnUrl || '/dashboards/crm/'

  //     try {
  //       await auth.login({ email, password, rememberMe }, error => {
  //         if (error) {
  //           setIsLoggingIn(false)
  //           setError('email', {
  //             type: 'manual',
  //             message: 'Email or Password is invalid'
  //           })
  //         } else {
  //           // Successful login - redirect to return URL or dashboard
  //           router.push(returnUrl)
  //         }
  //       })
  //     } catch (error) {
  //       setIsLoggingIn(false)
  //       setError('email', {
  //         type: 'manual',
  //         message: 'An error occurred. Please try again.'
  //       })
  //     }
  //   }

  //   const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

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
  //           <LoginIllustration alt='login-illustration' src={`/images/pages/${imageSource}-${theme.palette.mode}.png`} />
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
  //             {/* Logo */}
  //             <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
  //               <img
  //                 src='/images/logos/locktrust.png'
  //                 alt='LockTrust Logo'
  //                 style={{
  //                   height: '60px',
  //                   width: 'auto',
  //                   objectFit: 'contain'
  //                 }}
  //               />
  //             </Box>

  //             {/* Welcome Text */}
  //             <Box sx={{ my: 6 }}>
  //               <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
  //                 {`Welcome to ${themeConfig.templateName}! 👋🏻`}
  //               </Typography>
  //               <Typography sx={{ color: 'text.secondary' }}>
  //                 Please sign-in to your account and start the adventure
  //               </Typography>
  //             </Box>

  //             {/* Demo Credentials Alert */}
  //             <Alert
  //               icon={false}
  //               sx={{
  //                 py: 3,
  //                 mb: 6,
  //                 ...bgColors.primaryLight,
  //                 '& .MuiAlert-message': { p: 0 }
  //               }}
  //             >
  //               <Typography variant='body2' sx={{ mb: 2, color: 'primary.main' }}>
  //                 Admin: <strong>admin@vuexy.com</strong> / Pass: <strong>admin</strong>
  //               </Typography>
  //               <Typography variant='body2' sx={{ color: 'primary.main' }}>
  //                 Client: <strong>client@vuexy.com</strong> / Pass: <strong>client</strong>
  //               </Typography>
  //             </Alert>

  //             {/* Login Form */}
  //             <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
  //               <FormControl fullWidth sx={{ mb: 4 }}>
  //                 <Controller
  //                   name='email'
  //                   control={control}
  //                   rules={{ required: true }}
  //                   render={({ field: { value, onChange, onBlur } }) => (
  //                     <TextField
  //                       autoFocus
  //                       label='Email'
  //                       value={value}
  //                       onBlur={onBlur}
  //                       onChange={onChange}
  //                       error={Boolean(errors.email)}
  //                       placeholder='admin@vuexy.com'
  //                       disabled={isLoggingIn}
  //                     />
  //                   )}
  //                 />
  //                 {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
  //               </FormControl>

  //               <FormControl fullWidth sx={{ mb: 1.5 }}>
  //                 <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
  //                   Password
  //                 </InputLabel>
  //                 <Controller
  //                   name='password'
  //                   control={control}
  //                   rules={{ required: true }}
  //                   render={({ field: { value, onChange, onBlur } }) => (
  //                     <OutlinedInput
  //                       value={value}
  //                       onBlur={onBlur}
  //                       label='Password'
  //                       onChange={onChange}
  //                       id='auth-login-v2-password'
  //                       error={Boolean(errors.password)}
  //                       type={showPassword ? 'text' : 'password'}
  //                       disabled={isLoggingIn}
  //                       endAdornment={
  //                         <InputAdornment position='end'>
  //                           <IconButton
  //                             edge='end'
  //                             disabled={isLoggingIn}
  //                             onMouseDown={e => e.preventDefault()}
  //                             onClick={() => setShowPassword(!showPassword)}
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

  //               <Box
  //                 sx={{
  //                   mb: 1.75,
  //                   display: 'flex',
  //                   flexWrap: 'wrap',
  //                   alignItems: 'center',
  //                   justifyContent: 'space-between'
  //                 }}
  //               >
  //                 <FormControlLabel
  //                   label='Remember Me'
  //                   control={
  //                     <Checkbox
  //                       checked={rememberMe}
  //                       onChange={e => setRememberMe(e.target.checked)}
  //                       disabled={isLoggingIn}
  //                     />
  //                   }
  //                 />
  //                 <LinkStyled href='/forgot-password'>Forgot Password?</LinkStyled>
  //               </Box>

  //               <Button fullWidth size='large' type='submit' variant='contained' disabled={isLoggingIn} sx={{ mb: 4 }}>
  //                 {isLoggingIn ? 'Logging in...' : 'Login'}
  //               </Button>

  //               <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
  //                 <Typography sx={{ color: 'text.secondary', mr: 2 }}>New on our platform?</Typography>
  //                 <Typography variant='body2'>
  //                   <LinkStyled href='/register' sx={{ fontSize: '1rem' }}>
  //                     Create an account
  //                   </LinkStyled>
  //                 </Typography>
  //               </Box>

  //               {/* Social Login Section - Uncomment if needed */}
  //               {/* <Divider
  //                 sx={{
  //                   fontSize: '0.875rem',
  //                   color: 'text.disabled',
  //                   '& .MuiDivider-wrapper': { px: 6 },
  //                   my: theme => `${theme.spacing(6)} !important`
  //                 }}
  //               >
  //                 or
  //               </Divider>
  //               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  //                 <IconButton href='/' component={Link} sx={{ color: '#497ce2' }} onClick={e => e.preventDefault()}>
  //                   <Icon icon='mdi:facebook' />
  //                 </IconButton>
  //                 <IconButton href='/' component={Link} sx={{ color: '#1da1f2' }} onClick={e => e.preventDefault()}>
  //                   <Icon icon='mdi:twitter' />
  //                 </IconButton>
  //                 <IconButton
  //                   href='/'
  //                   component={Link}
  //                   onClick={e => e.preventDefault()}
  //                   sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
  //                 >
  //                   <Icon icon='mdi:github' />
  //                 </IconButton>
  //                 <IconButton href='/' component={Link} sx={{ color: '#db4437' }} onClick={e => e.preventDefault()}>
  //                   <Icon icon='mdi:google' />
  //                 </IconButton>
  //               </Box> */}
  //             </form>
  //           </Box>
  //         </Box>
  //       </RightWrapper>
  //     </Box>
  //   )
  // }

  // LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
  // LoginPage.guestGuard = true

  // export default LoginPage


  // new 7-5-2026 
// import { useState, ReactNode } from 'react'

// // ** Next Imports
// import Link from 'next/link'
// import { useRouter } from 'next/router'

// // ** MUI Components
// import Alert from '@mui/material/Alert'
// import Button from '@mui/material/Button'
// import Divider from '@mui/material/Divider'
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

// // ** Animation Imports
// import { AnimatePresence, motion } from 'framer-motion'

// // ** Icon Imports
// import Icon from 'src/@core/components/icon'

// // ** Third Party Imports
// import * as yup from 'yup'
// import { useForm, Controller } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'

// // ** Hooks
// import { useAuth } from 'src/hooks/useAuth'
// import useBgColor from 'src/@core/hooks/useBgColor'
// import { useSettings } from 'src/@core/hooks/useSettings'

// // ** Configs
// import themeConfig from 'src/configs/themeConfig'

// // ** Layout Import
// import BlankLayout from 'src/@core/layouts/BlankLayout'

// // ** Demo Imports
// import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// // ** Styled Components
// const LoginIllustration = styled('img')(({ theme }) => ({
//   zIndex: 2,
//   maxHeight: 680,
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
//   '& .MuiFormControlLabel-label': {
//     fontSize: '0.875rem',
//     color: theme.palette.text.secondary
//   }
// }))

// // ** Animation Variants - Left to Right for navigation
// const slideVariants = {
//   hiddenLeft: { x: -400, opacity: 0 },
//   hiddenRight: { x: 400, opacity: 0 },
//   visible: { x: 0, opacity: 1 },
//   exitLeft: { x: -400, opacity: 0 },
//   exitRight: { x: 400, opacity: 0 }
// }

// // ** Validation Schema
// const schema = yup.object().shape({
//   email: yup.string().email().required('Email is required'),
//   password: yup.string().min(5, 'Password must be at least 5 characters').required('Password is required')
// })

// const defaultValues = {
//   password: 'admin',
//   email: 'admin@vuexy.com'
// }

// const LoginPage = () => {
//   const [rememberMe, setRememberMe] = useState(true)
//   const [showPassword, setShowPassword] = useState(false)
//   const [isLoggingIn, setIsLoggingIn] = useState(false)
//   const [isNavigating, setIsNavigating] = useState(false)

//   // ** Hooks
//   const auth = useAuth()
//   const theme = useTheme()
//   const router = useRouter()
//   const bgColors = useBgColor()
//   const { settings } = useSettings()
//   const hidden = useMediaQuery(theme.breakpoints.down('md'))

//   // ** Vars
//   const { skin } = settings

//   const {
//     control,
//     setError,
//     handleSubmit,
//     formState: { errors }
//   } = useForm({
//     defaultValues,
//     mode: 'onBlur',
//     resolver: yupResolver(schema)
//   })

//   const onSubmit = async data => {
//     if (isLoggingIn) return

//     setIsLoggingIn(true)
//     const { email, password } = data


//     // For demo purposes, accept any email/password combination
//     // You can add your own validation logic here
//     if (email && password) {
//       // Store credentials temporarily for OTP verification
//       sessionStorage.setItem('tempEmail', email)
//       sessionStorage.setItem('tempPassword', password)
//       sessionStorage.setItem('rememberMe', rememberMe)
      
//       // Trigger exit animation before navigation - Slide OUT to LEFT
//       setIsNavigating(true)
      
//       // Wait for animation to complete then navigate
//       setTimeout(() => {
//         router.push({
//           pathname: '/login/verify',
//           query: { email: email }
//         })
//       }, 500) // Match animation duration
//     } else {
//       setIsLoggingIn(false)
//       setError('email', {
//         type: 'manual',
//         message: 'Invalid credentials'
//       })
//     }
//   }

//   const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

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
//           <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
//             <AnimatePresence mode='wait'>
//               <motion.div
//                 key='login'
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ delay: 0.3, duration: 0.5, ease: 'easeInOut' }}
//                 style={{
//                   position: 'absolute',
//                   width: '100%',
//                   height: '100%',
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center'
//                 }}
//               >
//                 <LoginIllustration 
//                   alt='login-illustration' 
//                   src={`/images/pages/${imageSource}-${theme.palette.mode}.png`} 
//                 />
//               </motion.div>
//             </AnimatePresence>
//           </Box>
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
//           <AnimatePresence mode='wait'>
//             {!isNavigating ? (
//               <motion.div
//                 key='login-form'
//                 initial='hiddenLeft'
//                 animate='visible'
//                 exit='exitLeft'
//                 variants={slideVariants}
//                 transition={{ duration: 0.5 }}
//                 style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
//               >
//                 <Box sx={{ width: '100%', maxWidth: 400 }}>
//                   <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
//                     <img
//                       src='/images/logos/locktrust-logo.png'
//                       alt='LockTrust Logo'
//                       style={{
//                         height: '60px',
//                         width: 'auto',
//                         objectFit: 'contain'
//                       }}
//                     />
//                   </Box>

//                   <Box sx={{ my: 6 }}>
//                     <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
//                       {`Welcome to ${themeConfig.templateName}! 👋🏻`}
//                     </Typography>
//                     <Typography sx={{ color: 'text.secondary' }}>
//                       Please sign-in to your account and start the adventure
//                     </Typography>
//                   </Box>

//                   <Alert
//                     icon={false}
//                     sx={{
//                       py: 3,
//                       mb: 6,
//                       ...bgColors.primaryLight,
//                       '& .MuiAlert-message': { p: 0 }
//                     }}
//                   >
//                     <Typography variant='body2' sx={{ mb: 2, color: 'primary.main' }}>
//                       Admin: <strong>admin@vuexy.com</strong> / Pass: <strong>admin</strong>
//                     </Typography>
//                     <Typography variant='body2' sx={{ color: 'primary.main' }}>
//                       Client: <strong>client@vuexy.com</strong> / Pass: <strong>client</strong>
//                     </Typography>
//                   </Alert>

//                   <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
//                     <FormControl fullWidth sx={{ mb: 4 }}>
//                       <Controller
//                         name='email'
//                         control={control}
//                         rules={{ required: true }}
//                         render={({ field: { value, onChange, onBlur } }) => (
//                           <TextField
//                             autoFocus
//                             label='Email'
//                             value={value}
//                             onBlur={onBlur}
//                             onChange={onChange}
//                             error={Boolean(errors.email)}
//                             placeholder='admin@vuexy.com'
//                             disabled={isLoggingIn}
//                           />
//                         )}
//                       />
//                       {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
//                     </FormControl>

//                     <FormControl fullWidth sx={{ mb: 1.5 }}>
//                       <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
//                         Password
//                       </InputLabel>
//                       <Controller
//                         name='password'
//                         control={control}
//                         rules={{ required: true }}
//                         render={({ field: { value, onChange, onBlur } }) => (
//                           <OutlinedInput
//                             value={value}
//                             onBlur={onBlur}
//                             label='Password'
//                             onChange={onChange}
//                             id='auth-login-v2-password'
//                             error={Boolean(errors.password)}
//                             type={showPassword ? 'text' : 'password'}
//                             disabled={isLoggingIn}
//                             endAdornment={
//                               <InputAdornment position='end'>
//                                 <IconButton
//                                   edge='end'
//                                   disabled={isLoggingIn}
//                                   onMouseDown={e => e.preventDefault()}
//                                   onClick={() => setShowPassword(!showPassword)}
//                                 >
//                                   <Icon icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} fontSize={20} />
//                                 </IconButton>
//                               </InputAdornment>
//                             }
//                           />
//                         )}
//                       />
//                       {errors.password && (
//                         <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>
//                       )}
//                     </FormControl>

//                     <Box
//                       sx={{
//                         mb: 1.75,
//                         display: 'flex',
//                         flexWrap: 'wrap',
//                         alignItems: 'center',
//                         justifyContent: 'space-between'
//                       }}
//                     >
//                       <FormControlLabel
//                         label='Remember Me'
//                         control={
//                           <Checkbox
//                             checked={rememberMe}
//                             onChange={e => setRememberMe(e.target.checked)}
//                             disabled={isLoggingIn}
//                           />
//                         }
//                       />
//                       <LinkStyled href='/forgot-password'>Forgot Password?</LinkStyled>
//                     </Box>

//                     <Button fullWidth size='large' type='submit' variant='contained' disabled={isLoggingIn} sx={{ mb: 4 }}>
//                       {isLoggingIn ? 'Logging in...' : 'Login'}
//                     </Button>

//                     <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
//                       <Typography sx={{ color: 'text.secondary', mr: 2 }}>New on our platform?</Typography>
//                       <Typography variant='body2'>
//                         <LinkStyled href='/register' sx={{ fontSize: '1rem' }}>
//                           Create an account
//                         </LinkStyled>
//                       </Typography>
//                     </Box>
//                   </form>
//                 </Box>
//               </motion.div>
//             ) : (
//               <motion.div
//                 key='loading'
//                 initial='hiddenRight'
//                 animate='visible'
//                 exit='exitRight'
//                 variants={slideVariants}
//                 transition={{ duration: 0.5 }}
//                 style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
//               >
//                 <Box sx={{ width: '100%', maxWidth: 400, textAlign: 'center' }}>
//                   <motion.div
//                     animate={{ 
//                       scale: [1, 1.2, 1],
//                       rotate: [0, 360]
//                     }}
//                     transition={{ 
//                       duration: 1,
//                       repeat: Infinity,
//                       ease: "linear"
//                     }}
//                   >
//                     <Icon icon='tabler:loader' width={60} height={60} style={{ color: theme.palette.primary.main }} />
//                   </motion.div>
//                   <Typography sx={{ mt: 4, color: 'text.secondary' }}>
//                     Verifying credentials...
//                   </Typography>
//                 </Box>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </Box>
//       </RightWrapper>
//     </Box>
//   )
// }

// LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
// LoginPage.guestGuard = true

// export default LoginPage


//////////////////////////////////////////////////////////// login redirection not solve 

// import { useState, Fragment, useEffect } from 'react'

// // ** Next Imports
// import Link from 'next/link'
// import { useRouter } from 'next/router'
// import CryptoJS from 'crypto-js'

// // ** MUI Components
// import Alert from '@mui/material/Alert'
// import Button from '@mui/material/Button'
// import Divider from '@mui/material/Divider'
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
// import CircularProgress from '@mui/material/CircularProgress'

// // ** Animation Imports
// import { AnimatePresence, motion } from 'framer-motion'

// // ** Icon Imports
// import Icon from 'src/@core/components/icon'

// // ** Third Party Imports
// import * as yup from 'yup'
// import { useForm, Controller } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'

// // ** Hooks
// import { useAuth } from 'src/hooks/useAuth'
// import useBgColor from 'src/@core/hooks/useBgColor'
// import { useSettings } from 'src/@core/hooks/useSettings'

// // ** Configs
// import themeConfig from 'src/configs/themeConfig'

// // ** Layout Import
// import BlankLayout from 'src/@core/layouts/BlankLayout'

// // ** Demo Imports
// import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// // ** Jwt import 
// import useJwt from "./../../endpoints/jwt/useJwt"

// // ** React Hot Toast
// import toast from 'react-hot-toast'

// // ** Styled Components
// const LoginIllustration = styled('img')(({ theme }) => ({
//   zIndex: 2,
//   maxHeight: 680,
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
//   '& .MuiFormControlLabel-label': {
//     fontSize: '0.875rem',
//     color: theme.palette.text.secondary
//   }
// }))

// // ** Animation Variants - Left to Right for navigation
// const slideVariants = {
//   hiddenLeft: { x: -400, opacity: 0 },
//   hiddenRight: { x: 400, opacity: 0 },
//   visible: { x: 0, opacity: 1 },
//   exitLeft: { x: -400, opacity: 0 },
//   exitRight: { x: 400, opacity: 0 }
// }

// // ** Validation Schema
// const schema = yup.object().shape({
//   email: yup.string().email('Invalid email format').required('Email is required'),
//   password: yup.string().required('Password is required')
// })

// const defaultValues = {
//   email: '',
//   password: ''
// }

// // ** Secret key for AES encryption (MUST MATCH the registration page)
// const SECRET_KEY = 'zMWH89JA7Nix4HM+ij3sF6KO3ZumDInh/SQKutvhuO8='

// // ** AES Encryption function (EXACT same as registration page)
// const encryptAES = (text) => {
//   try {
//     // Generate SHA256 key
//     const key = CryptoJS.SHA256(SECRET_KEY)

//     // Generate random IV
//     const iv = CryptoJS.lib.WordArray.random(16)

//     // Encrypt with AES-CBC
//     const encrypted = CryptoJS.AES.encrypt(text, key, {
//       iv: iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7
//     })

//     // Combine IV + Ciphertext
//     const combined = iv.clone().concat(encrypted.ciphertext)

//     // Convert to Base64
//     return CryptoJS.enc.Base64.stringify(combined)
//   } catch (error) {
//     console.error('Encryption error:', error)
//     return text
//   }
// }

// const LoginPage = () => {
//   const [rememberMe, setRememberMe] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [isLoggingIn, setIsLoggingIn] = useState(false)
//   const [isNavigating, setIsNavigating] = useState(false)

//   // ** Hooks
//   const auth = useAuth()
//   const theme = useTheme()
//   const router = useRouter()
//   const bgColors = useBgColor()
//   const { settings } = useSettings()
//   const hidden = useMediaQuery(theme.breakpoints.down('md'))

//   // ** Vars
//   const { skin } = settings

//   const {
//     control,
//     setError,
//     handleSubmit,
//     formState: { errors }
//   } = useForm({
//     defaultValues,
//     mode: 'onBlur',
//     resolver: yupResolver(schema)
//   })

//   // Function to handle API errors
//   const handleApiError = (error) => {
//     console.error('Login error details:', error)
    
//     if (error.response) {
//       const { status, data } = error.response
      
//       // Handle different status codes
//       switch (status) {
//         case 400:
//           toast.error(data.detail || data.message || data.content || 'Invalid request. Please check your input.')
//           break
//         case 401:
//           toast.error(data.detail || data.message || data.content || 'Invalid email or password. Please try again.')
//           // Set field-specific errors
//           setError('email', {
//             type: 'manual',
//             message: 'Invalid credentials'
//           })
//           setError('password', {
//             type: 'manual',
//             message: 'Invalid credentials'
//           })
//           break
//         case 403:
//           toast.error(data.detail || data.message || data.content || 'Access denied. Please contact support.')
//           break
//         case 404:
//           toast.error('Login service unavailable. Please try again later.')
//           break
//         case 422:
//           toast.error(data.detail || data.message || data.content || 'Validation failed. Please check your input.')
//           break
//         case 429:
//           toast.error('Too many attempts. Please try again later.')
//           break
//         case 500:
//           toast.error(data.detail || data.message || data.content || 'Server error. Please contact support or try again later.')
//           break
//         default:
//           toast.error(data.detail || data.message || data.content || 'An unexpected error occurred. Please try again.')
//       }
//     } else if (error.request) {
//       // Network error
//       toast.error('Network error. Please check your internet connection.')
//     } else {
//       // Other errors
//       toast.error(error.message || 'An error occurred. Please try again.')
//     }
//   }

//   const onSubmit = async data => {
//     if (isLoggingIn) return

//     setIsLoggingIn(true)
//     const { email, password } = data

//     try {
//       // ** IMPORTANT: Encrypt password using the SAME method as registration
//       const encryptedPassword = encryptAES(password)
      
//       console.log('Login attempt for email:', email)
//       console.log('Encrypted password length:', encryptedPassword.length)
      
//       // Send login request with encrypted password
//       const response = await useJwt.login(email, encryptedPassword)
      
//       console.log('Login response:', response)
      
//       // Check if response is successful
//       if (response && response.data) {
//         const responseData = response.data
        
//         // Handle API response structure
//         if (responseData.code === 200 && responseData.content) {
//           const { token, emailVerified, phoneVerified, twoFactorEnabled, message } = responseData.content
          
//           // Store token in localStorage
//           if (token) {
//             // Use useJwt methods to store tokens
//             useJwt.setToken(token)
//             localStorage.setItem('userEmail', email)
            
//             // Store remember me preference
//             if (rememberMe) {
//               localStorage.setItem('rememberMe', 'true')
//               localStorage.setItem('savedEmail', email)
//             } else {
//               localStorage.removeItem('rememberMe')
//               localStorage.removeItem('savedEmail')
//             }
            
//             // Store user verification status
//             const userData = {
//               email,
//               emailVerified,
//               phoneVerified,
//               twoFactorEnabled,
//               token
//             }
//             useJwt.setUserData(userData)
            
//             // Check if email is verified
//             if (!emailVerified) {
//               // Store credentials temporarily for OTP verification
//               sessionStorage.setItem('tempEmail', email)
//               sessionStorage.setItem('tempPassword', encryptedPassword)
//               sessionStorage.setItem('rememberMe', rememberMe)
              
//               toast.success('Please verify your email to continue')
              
//               // Trigger exit animation before navigation
//               setIsNavigating(true)
              
//               // Navigate to OTP verification
//               setTimeout(() => {
//                 router.push({
//                   pathname: '/login/verify',
//                   query: { email: email }
//                 })
//               }, 500)
//             } else {
//               // Email is verified, proceed to dashboard or two-factor
//               if (twoFactorEnabled) {
//                 // Navigate to 2FA verification
//                 sessionStorage.setItem('tempEmail', email)
//                 toast.success('Please complete two-factor authentication')
//                 setIsNavigating(true)
//                 setTimeout(() => {
//                   router.push('/login/2fa')
//                 }, 500)
//               } else {
//                 // Direct login success
//                 toast.success(message || 'Login successful! Redirecting...')
                
//                 // Call auth login to update auth context
//                 auth.login({ email, password: encryptedPassword }, () => {
//                   setIsNavigating(true)
//                   setTimeout(() => {
//                     router.push('/')
//                   }, 500)
//                 })
//               }
//             }
//           } else {
//             throw new Error('No token received from server')
//           }
//         } else {
//           // Handle non-200 response code
//           throw new Error(responseData.message || responseData.detail || responseData.content || 'Login failed. Please try again.')
//         }
//       } else {
//         throw new Error('No response from server')
//       }
//     } catch (error) {
//       handleApiError(error)
//       setIsLoggingIn(false)
//     }
//   }

//   const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

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
//           <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
//             <AnimatePresence mode='wait'>
//               <motion.div
//                 key='login'
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ delay: 0.3, duration: 0.5, ease: 'easeInOut' }}
//                 style={{
//                   position: 'absolute',
//                   width: '100%',
//                   height: '100%',
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center'
//                 }}
//               >
//                 <LoginIllustration 
//                   alt='login-illustration' 
//                   src={`/images/pages/${imageSource}-${theme.palette.mode}.png`} 
//                 />
//               </motion.div>
//             </AnimatePresence>
//           </Box>
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
//           <AnimatePresence mode='wait'>
//             {!isNavigating ? (
//               <motion.div
//                 key='login-form'
//                 initial='hiddenLeft'
//                 animate='visible'
//                 exit='exitLeft'
//                 variants={slideVariants}
//                 transition={{ duration: 0.5 }}
//                 style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
//               >
//                 <Box sx={{ width: '100%', maxWidth: 400 }}>
//                   <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
//                     <img
//                       src='/images/logos/locktrust-logo.png'
//                       alt='LockTrust Logo'
//                       style={{
//                         height: '60px',
//                         width: 'auto',
//                         objectFit: 'contain'
//                       }}
//                     />
//                   </Box>

//                   <Box sx={{ my: 6 }}>
//                     <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
//                       {`Welcome back to ${themeConfig.templateName}! 👋🏻`}
//                     </Typography>
//                     <Typography sx={{ color: 'text.secondary' }}>
//                       Please sign-in to your account and continue your journey
//                     </Typography>
//                   </Box>

//                   <Alert
//                     icon={false}
//                     sx={{
//                       py: 3,
//                       mb: 6,
//                       ...bgColors.primaryLight,
//                       '& .MuiAlert-message': { p: 0 }
//                     }}
//                   >
//                     <Typography variant='body2' sx={{ mb: 2, color: 'primary.main' }}>
//                       Demo Credentials:
//                     </Typography>
//                     <Typography variant='body2' sx={{ color: 'primary.main' }}>
//                       Email: <strong>mandewalsneha28@gmail.com</strong>
//                     </Typography>
//                     <Typography variant='body2' sx={{ color: 'primary.main' }}>
//                       Password: <strong>Your registered password</strong>
//                     </Typography>
//                     <Typography variant='caption' sx={{ color: 'text.secondary', display: 'block', mt: 1 }}>
//                       Note: Password is automatically encrypted using AES-256-CBC before sending
//                     </Typography>
//                   </Alert>

//                   <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
//                     <FormControl fullWidth sx={{ mb: 4 }}>
//                       <Controller
//                         name='email'
//                         control={control}
//                         rules={{ required: true }}
//                         render={({ field: { value, onChange, onBlur } }) => (
//                           <TextField
//                             autoFocus
//                             label='Email'
//                             value={value}
//                             onBlur={onBlur}
//                             onChange={onChange}
//                             error={Boolean(errors.email)}
//                             placeholder='Enter your email'
//                             disabled={isLoggingIn}
//                           />
//                         )}
//                       />
//                       {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
//                     </FormControl>

//                     <FormControl fullWidth sx={{ mb: 1.5 }}>
//                       <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
//                         Password
//                       </InputLabel>
//                       <Controller
//                         name='password'
//                         control={control}
//                         rules={{ required: true }}
//                         render={({ field: { value, onChange, onBlur } }) => (
//                           <OutlinedInput
//                             value={value}
//                             onBlur={onBlur}
//                             label='Password'
//                             onChange={onChange}
//                             id='auth-login-v2-password'
//                             error={Boolean(errors.password)}
//                             type={showPassword ? 'text' : 'password'}
//                             disabled={isLoggingIn}
//                             endAdornment={
//                               <InputAdornment position='end'>
//                                 <IconButton
//                                   edge='end'
//                                   disabled={isLoggingIn}
//                                   onMouseDown={e => e.preventDefault()}
//                                   onClick={() => setShowPassword(!showPassword)}
//                                 >
//                                   <Icon icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} fontSize={20} />
//                                 </IconButton>
//                               </InputAdornment>
//                             }
//                           />
//                         )}
//                       />
//                       {errors.password && (
//                         <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>
//                       )}
//                     </FormControl>

//                     <Box
//                       sx={{
//                         mb: 1.75,
//                         display: 'flex',
//                         flexWrap: 'wrap',
//                         alignItems: 'center',
//                         justifyContent: 'space-between'
//                       }}
//                     >
//                       <FormControlLabel
//                         label='Remember Me'
//                         control={
//                           <Checkbox
//                             checked={rememberMe}
//                             onChange={e => setRememberMe(e.target.checked)}
//                             disabled={isLoggingIn}
//                           />
//                         }
//                       />
//                       <LinkStyled href='/forgot-password'>Forgot Password?</LinkStyled>
//                     </Box>

//                     <Button 
//                       fullWidth 
//                       size='large' 
//                       type='submit' 
//                       variant='contained' 
//                       disabled={isLoggingIn} 
//                       sx={{ mb: 4 }}
//                     >
//                       {isLoggingIn ? <CircularProgress size={24} /> : 'Login'}
//                     </Button>

//                     <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
//                       <Typography sx={{ color: 'text.secondary', mr: 2 }}>New on our platform?</Typography>
//                       <Typography variant='body2'>
//                         <LinkStyled href='/register' sx={{ fontSize: '1rem' }}>
//                           Create an account
//                         </LinkStyled>
//                       </Typography>
//                     </Box>
//                   </form>
//                 </Box>
//               </motion.div>
//             ) : (
//               <motion.div
//                 key='loading'
//                 initial='hiddenRight'
//                 animate='visible'
//                 exit='exitRight'
//                 variants={slideVariants}
//                 transition={{ duration: 0.5 }}
//                 style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
//               >
//                 <Box sx={{ width: '100%', maxWidth: 400, textAlign: 'center' }}>
//                   <motion.div
//                     animate={{ 
//                       scale: [1, 1.2, 1],
//                       rotate: [0, 360]
//                     }}
//                     transition={{ 
//                       duration: 1,
//                       repeat: Infinity,
//                       ease: "linear"
//                     }}
//                   >
//                     <Icon icon='tabler:loader' width={60} height={60} style={{ color: theme.palette.primary.main }} />
//                   </motion.div>
//                   <Typography sx={{ mt: 4, color: 'text.secondary' }}>
//                     Verifying credentials...
//                   </Typography>
//                 </Box>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </Box>
//       </RightWrapper>
//     </Box>
//   )
// }

// LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
// LoginPage.guestGuard = true

// export default LoginPage




//////////////////////////////login redirection solve ///////////////////////////////
import { useState, Fragment, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
import CryptoJS from 'crypto-js'

// ** MUI Components
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
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
import CircularProgress from '@mui/material/CircularProgress'

// ** Animation Imports
import { AnimatePresence, motion } from 'framer-motion'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import useBgColor from 'src/@core/hooks/useBgColor'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// ** Jwt import 
import useJwt from "./../../endpoints/jwt/useJwt"

// ** React Hot Toast
import toast from 'react-hot-toast'

// ** Styled Components
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 680,
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
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

// ** Animation Variants - Left to Right for navigation
const slideVariants = {
  hiddenLeft: { x: -400, opacity: 0 },
  hiddenRight: { x: 400, opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exitLeft: { x: -400, opacity: 0 },
  exitRight: { x: 400, opacity: 0 }
}

// ** Validation Schema
const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required')
})

const defaultValues = {
  email: '',
  password: ''
}

// ** Secret key for AES encryption (MUST MATCH the registration page)
const SECRET_KEY = 'zMWH89JA7Nix4HM+ij3sF6KO3ZumDInh/SQKutvhuO8='

// ** AES Encryption function (EXACT same as registration page)
const encryptAES = (text) => {
  try {
    // Generate SHA256 key
    const key = CryptoJS.SHA256(SECRET_KEY)

    // Generate random IV
    const iv = CryptoJS.lib.WordArray.random(16)

    // Encrypt with AES-CBC
    const encrypted = CryptoJS.AES.encrypt(text, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })

    // Combine IV + Ciphertext
    const combined = iv.clone().concat(encrypted.ciphertext)

    // Convert to Base64
    return CryptoJS.enc.Base64.stringify(combined)
  } catch (error) {
    console.error('Encryption error:', error)
    return text
  }
}

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)

  // ** Hooks
  const theme = useTheme()
  const router = useRouter()
  const bgColors = useBgColor()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // Function to handle API errors
  const handleApiError = (error) => {
    console.error('Login error details:', error)
    
    if (error.response) {
      const { status, data } = error.response
      
      switch (status) {
        case 400:
          toast.error(data.detail || data.message || data.content || 'Invalid request. Please check your input.')
          break
        case 401:
          toast.error(data.detail || data.message || data.content || 'Invalid email or password. Please try again.')
          setError('email', {
            type: 'manual',
            message: 'Invalid credentials'
          })
          setError('password', {
            type: 'manual',
            message: 'Invalid credentials'
          })
          break
        case 403:
          toast.error(data.detail || data.message || data.content || 'Access denied. Please contact support.')
          break
        case 404:
          toast.error('Login service unavailable. Please try again later.')
          break
        case 422:
          toast.error(data.detail || data.message || data.content || 'Validation failed. Please check your input.')
          break
        case 429:
          toast.error('Too many attempts. Please try again later.')
          break
        case 500:
          toast.error(data.detail || data.message || data.content || 'Server error. Please contact support or try again later.')
          break
        default:
          toast.error(data.detail || data.message || data.content || 'An unexpected error occurred. Please try again.')
      }
    } else if (error.request) {
      toast.error('Network error. Please check your internet connection.')
    } else {
      toast.error(error.message || 'An error occurred. Please try again.')
    }
  }

  const onSubmit = async data => {
    if (isLoggingIn) return

    setIsLoggingIn(true)
    const { email, password } = data

    try {
      // Encrypt password using AES
      const encryptedPassword = encryptAES(password)
      
      console.log('Login attempt for email:', email)
      
      // Send login request
      const response = await useJwt.login(email, encryptedPassword)
      
      console.log('Login response:', response)
      
      if (response && response.data) {
        const responseData = response.data
        
        if (responseData.code === 200 && responseData.content) {
          const { token, emailVerified, phoneVerified, twoFactorEnabled, message } = responseData.content
          
          if (token) {
            // Store token and user data
            useJwt.setToken(token)
            localStorage.setItem('userEmail', email)
            
            if (rememberMe) {
              localStorage.setItem('rememberMe', 'true')
              localStorage.setItem('savedEmail', email)
            } else {
              localStorage.removeItem('rememberMe')
              localStorage.removeItem('savedEmail')
            }
            
            const userData = {
              email,
              emailVerified,
              phoneVerified,
              twoFactorEnabled,
              token
            }
            useJwt.setUserData(userData)
            
            // Store in session storage for verification page
            sessionStorage.setItem('tempEmail', email)
            sessionStorage.setItem('tempPassword', encryptedPassword)
            sessionStorage.setItem('rememberMe', rememberMe)
            sessionStorage.setItem('tempToken', token)
            sessionStorage.setItem('requiresVerification', 'true')
            
            toast.success(message || 'Login successful! Redirecting to verification...')
            
            setIsNavigating(true)
            
            // Force redirect to verify page using window.location to bypass any route guards
            setTimeout(() => {
              window.location.href = `/login/verify?email=${encodeURIComponent(email)}&fromLogin=true`
            }, 500)
          } else {
            throw new Error('No token received from server')
          }
        } else {
          throw new Error(responseData.message || responseData.detail || responseData.content || 'Login failed')
        }
      } else {
        throw new Error('No response from server')
      }
    } catch (error) {
      handleApiError(error)
      setIsLoggingIn(false)
    }
  }

  const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

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
                key='login'
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
                <LoginIllustration 
                  alt='login-illustration' 
                  src={`/images/pages/${imageSource}-${theme.palette.mode}.png`} 
                />
              </motion.div>
            </AnimatePresence>
          </Box>
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
          <AnimatePresence mode='wait'>
            {!isNavigating ? (
              <motion.div
                key='login-form'
                initial='hiddenLeft'
                animate='visible'
                exit='exitLeft'
                variants={slideVariants}
                transition={{ duration: 0.5 }}
                style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
              >
                <Box sx={{ width: '100%', maxWidth: 400 }}>
                  <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
                    <img
                      src='/images/logos/locktrust-logo.png'
                      alt='LockTrust Logo'
                      style={{
                        height: '60px',
                        width: 'auto',
                        objectFit: 'contain'
                      }}
                    />
                  </Box>

                  <Box sx={{ my: 6 }}>
                    <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
                      {`Welcome back to ${themeConfig.templateName}! 👋🏻`}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Please sign-in to your account and continue your journey
                    </Typography>
                  </Box>

                  <Alert
                    icon={false}
                    sx={{
                      py: 3,
                      mb: 6,
                      ...bgColors.primaryLight,
                      '& .MuiAlert-message': { p: 0 }
                    }}
                  >
                    <Typography variant='body2' sx={{ mb: 2, color: 'primary.main' }}>
                      Demo Credentials:
                    </Typography>
                    <Typography variant='body2' sx={{ color: 'primary.main' }}>
                      Email: <strong>mandewalsneha28@gmail.com</strong>
                    </Typography>
                    <Typography variant='body2' sx={{ color: 'primary.main' }}>
                      Password: <strong>Your registered password</strong>
                    </Typography>
                    <Typography variant='caption' sx={{ color: 'text.secondary', display: 'block', mt: 1 }}>
                      Note: Password is automatically encrypted using AES-256-CBC before sending
                    </Typography>
                  </Alert>

                  <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                      <Controller
                        name='email'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
                            autoFocus
                            label='Email'
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.email)}
                            placeholder='Enter your email'
                            disabled={isLoggingIn}
                          />
                        )}
                      />
                      {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 1.5 }}>
                      <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                        Password
                      </InputLabel>
                      <Controller
                        name='password'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <OutlinedInput
                            value={value}
                            onBlur={onBlur}
                            label='Password'
                            onChange={onChange}
                            id='auth-login-v2-password'
                            error={Boolean(errors.password)}
                            type={showPassword ? 'text' : 'password'}
                            disabled={isLoggingIn}
                            endAdornment={
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  disabled={isLoggingIn}
                                  onMouseDown={e => e.preventDefault()}
                                  onClick={() => setShowPassword(!showPassword)}
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

                    <Box
                      sx={{
                        mb: 1.75,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <FormControlLabel
                        label='Remember Me'
                        control={
                          <Checkbox
                            checked={rememberMe}
                            onChange={e => setRememberMe(e.target.checked)}
                            disabled={isLoggingIn}
                          />
                        }
                      />
                      <LinkStyled href='/forgot-password'>Forgot Password?</LinkStyled>
                    </Box>

                    <Button 
                      fullWidth 
                      size='large' 
                      type='submit' 
                      variant='contained' 
                      disabled={isLoggingIn} 
                      sx={{ mb: 4 }}
                    >
                      {isLoggingIn ? <CircularProgress size={24} /> : 'Login'}
                    </Button>

                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                      <Typography sx={{ color: 'text.secondary', mr: 2 }}>New on our platform?</Typography>
                      <Typography variant='body2'>
                        <LinkStyled href='/register' sx={{ fontSize: '1rem' }}>
                          Create an account
                        </LinkStyled>
                      </Typography>
                    </Box>
                  </form>
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
                    Verifying credentials...
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

LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
LoginPage.guestGuard = true

export default LoginPage