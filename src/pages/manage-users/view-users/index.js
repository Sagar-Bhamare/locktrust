// import React, { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'

// // ** MUI Imports
// import Box from '@mui/material/Box'
// import Grid from '@mui/material/Grid'
// import Card from '@mui/material/Card'
// import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'
// import CardHeader from '@mui/material/CardHeader'
// import Tab from '@mui/material/Tab'
// import TabContext from '@mui/lab/TabContext'
// import TabList from '@mui/lab/TabList'
// import TabPanel from '@mui/lab/TabPanel'
// import CircularProgress from '@mui/material/CircularProgress'

// // ** Icon Imports
// import Icon from 'src/@core/components/icon'

// // ** Custom Components
// import CustomAvatar from 'src/@core/components/mui/avatar'
// import ProfileTab from 'src/views/pages/manage-users/user-details/ProfileTab'
// import TransactionsTab from 'src/views/pages/manage-users/user-details/TransactionsTab'
// import TransactionFeesTab from 'src/views/pages/manage-users/user-details/TransactionFeesTab'
// import ForgotPasswordTab from 'src/views/pages/manage-users/user-details/ForgotPasswordTab'

// const ViewUserDetails = () => {
//   const router = useRouter()
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [activeTab, setActiveTab] = useState('profile')

//   useEffect(() => {
//     const storedUserData = localStorage.getItem('viewUserData')
    
//     if (storedUserData) {
//       const userData = JSON.parse(storedUserData)
//       setUser(userData)
//       setLoading(false)
//     } else {
//       router.replace('/manage-users')
//     }
//   }, [router])

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue)
//   }

//   const handleBack = () => {
//     localStorage.removeItem('viewUserData')
//     router.back()
//   }

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 2
//     }).format(amount || 0)
//   }

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <CircularProgress />
//       </Box>
//     )
//   }

//   if (!user) return null

//   return (
//     <Grid container spacing={6}>
//       {/* Header Section */}
//       <Grid item xs={12}>
//         <Card>
//           <CardHeader 
//             title={
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                 <CustomAvatar skin='light' sx={{ width: 60, height: 60, fontSize: '2rem' }}>
//                   {user.nameOnWallet?.charAt(0).toUpperCase() || 'U'}
//                 </CustomAvatar>
//                 <Box>
//                   <Typography variant='h4'>{user.nameOnWallet}</Typography>
//                   <Typography variant='body2' color='text.secondary'>
//                     Wallet Balance: {formatCurrency(user.balance)}
//                   </Typography>
//                 </Box>
//               </Box>
//             }
//             action={
//               <Button 
//                 onClick={handleBack}
//                 variant='outlined' 
//                 color='secondary'
//                 startIcon={<Icon icon='tabler:arrow-left' />}
//               >
//                 Back
//               </Button>
//             }
//           />
//         </Card>
//       </Grid>

//       {/* Main Tabs */}
//       <Grid item xs={12}>
//         <Card>
//           <TabContext value={activeTab}>
//             <Box sx={{ borderBottom: 1, borderColor: 'divider', my: 2}}>
//               <TabList onChange={handleTabChange} variant='fullWidth'>
//                 <Tab label="Wallet Balance" value="profile" icon={<Icon icon='tabler:wallet' />} iconPosition="start" />
//                 <Tab label="Transactions" value="transactions" icon={<Icon icon='tabler:receipt' />} iconPosition="start" />
//                 <Tab label="Transaction Fees" value="fees" icon={<Icon icon='tabler:currency-dollar' />} iconPosition="start" />
//                 <Tab label="Forgot Password" value="forgot" icon={<Icon icon='tabler:lock' />} iconPosition="start" />
//               </TabList>
//             </Box>

//             <TabPanel value="profile" sx={{ p: 4 }}>
//               <ProfileTab user={user} />
//             </TabPanel>

//             <TabPanel value="transactions" sx={{ p: 0 }}>
//               <TransactionsTab user={user} />
//             </TabPanel>

//             <TabPanel value="fees" sx={{ p: 4 }}>
//               <TransactionFeesTab user={user} />
//             </TabPanel>

//             <TabPanel value="forgot" sx={{ p: 4 }}>
//               <ForgotPasswordTab user={user} />
//             </TabPanel>
//           </TabContext>
//         </Card>
//       </Grid>
//     </Grid>
//   )
// }

// export default ViewUserDetails

// new 
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar'
import ProfileTab from 'src/views/pages/manage-users/user-details/ProfileTab'
import TransactionsTab from 'src/views/pages/manage-users/user-details/TransactionsTab'
import TransactionFeesTab from 'src/views/pages/manage-users/user-details/TransactionFeesTab'
import ForgotPasswordTab from 'src/views/pages/manage-users/user-details/ForgotPasswordTab'

const ViewUserDetails = () => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('profile')
  const [openForgotDialog, setOpenForgotDialog] = useState(false) // NEW

  useEffect(() => {
    const storedUserData = localStorage.getItem('viewUserData')
    
    if (storedUserData) {
      const userData = JSON.parse(storedUserData)
      setUser(userData)
      setLoading(false)
    } else {
      router.replace('/manage-users')
    }
  }, [router])

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleBack = () => {
    localStorage.removeItem('viewUserData')
    router.back()
  }

  // Block / Unblock
  const handleToggleBlock = () => {
    const updatedUser = { ...user, isBlocked: !user.isBlocked }
    setUser(updatedUser)
    localStorage.setItem('viewUserData', JSON.stringify(updatedUser))
  }

  // Open dialog
  const handleForgotPassword = () => {
    setOpenForgotDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenForgotDialog(false)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount || 0)
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!user) return null

  return (
    <Grid container spacing={6}>
      {/* Header Section */}
      <Grid item xs={12}>
        <Card>
          <CardHeader 
            title={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CustomAvatar skin='light' sx={{ width: 60, height: 60, fontSize: '2rem' }}>
                  {user.nameOnWallet?.charAt(0).toUpperCase() || 'U'}
                </CustomAvatar>
                <Box>
                  <Typography variant='h4'>{user.nameOnWallet}</Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <Typography variant='body2' color='text.secondary'>
                      Wallet Balance: {formatCurrency(user.balance)}
                    </Typography>

                    <Button
                      variant='contained'
                      color={user.isBlocked ? 'success' : 'error'}
                      size='small'
                      onClick={handleToggleBlock}
                    >
                      {user.isBlocked ? 'Unblock' : 'Block'}
                    </Button>

                    <Button
                      variant='outlined'
                      color='primary'
                      size='small'
                      onClick={handleForgotPassword}
                      startIcon={<Icon icon='tabler:lock' />}
                    >
                      Forgot Password
                    </Button>
                  </Box>
                </Box>
              </Box>
            }
            action={
              <Button 
                onClick={handleBack}
                variant='outlined' 
                color='secondary'
                startIcon={<Icon icon='tabler:arrow-left' />}
              >
                Back
              </Button>
            }
          />
        </Card>
      </Grid>

      {/* Main Tabs */}
      <Grid item xs={12}>
        <Card>
          <TabContext value={activeTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', my: 2}}>
              <TabList onChange={handleTabChange} variant='fullWidth'>
                <Tab label="Wallet Balance" value="profile" icon={<Icon icon='tabler:wallet' />} iconPosition="start" />
                <Tab label="Transactions" value="transactions" icon={<Icon icon='tabler:receipt' />} iconPosition="start" />
                <Tab label="Transaction Fees" value="fees" icon={<Icon icon='tabler:currency-dollar' />} iconPosition="start" />
              </TabList>
            </Box>

            <TabPanel value="profile" sx={{ p: 4 }}>
              <ProfileTab user={user} />
            </TabPanel>

            <TabPanel value="transactions" sx={{ p: 0 }}>
              <TransactionsTab user={user} />
            </TabPanel>

            <TabPanel value="fees" sx={{ p: 4 }}>
              <TransactionFeesTab user={user} />
            </TabPanel>
          </TabContext>
        </Card>
      </Grid>

      {/* Forgot Password Dialog */}
      <Dialog
        open={openForgotDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Forgot Password</DialogTitle>
        <DialogContent>
          <ForgotPasswordTab user={user} />
        </DialogContent>
      </Dialog>
    </Grid>
  )
}

export default ViewUserDetails