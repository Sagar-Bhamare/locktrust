  // import React from 'react'

  // // ** MUI Imports
  // import Box from '@mui/material/Box'
  // import Grid from '@mui/material/Grid'
  // import Card from '@mui/material/Card'
  // import Chip from '@mui/material/Chip'
  // import Typography from '@mui/material/Typography'
  // import Divider from '@mui/material/Divider'
  // import Paper from '@mui/material/Paper'
  // import CardHeader from '@mui/material/CardHeader'
  // import CardContent from '@mui/material/CardContent'

  // // ** Icon Imports
  // import Icon from 'src/@core/components/icon'

  // const ProfileTab = ({ user }) => {
  //   const getStatusColor = (status) => {
  //     const statusColors = {
  //       active: 'success',
  //       inactive: 'default',
  //       suspended: 'error',
  //       pending: 'warning'
  //     }
  //     return statusColors[status] || 'default'
  //   }

  //   return (
  //     <Grid container spacing={4}>
  //       {/* Profile Information */}
  //       <Grid item xs={12} md={6}>
  //         <Card>
  //           <CardHeader 
  //             title='Profile Information' 
  //             avatar={<Icon icon='tabler:user-circle' />}
  //           />
  //           <Divider />
  //           <CardContent>
  //             <Grid container spacing={2}>
  //               <Grid item xs={12}>
  //                 <Typography variant='caption' color='text.secondary'>Wallet ID</Typography>
  //                 <Typography variant='body1' sx={{ fontWeight: 500 }}>{user.walletId}</Typography>
  //               </Grid>
  //               <Grid item xs={6}>
  //                 <Typography variant='caption' color='text.secondary'>Account Status</Typography>
  //                 <Box sx={{ mt: 0.5 }}>
  //                   <Chip label={user.status} color={getStatusColor(user.status)} size='small' />
  //                 </Box>
  //               </Grid>
  //               <Grid item xs={6}>
  //                 <Typography variant='caption' color='text.secondary'>KYC Status</Typography>
  //                 <Box sx={{ mt: 0.5 }}>
  //                   <Chip label={user.kycStatus} color={user.kycStatus === 'verified' ? 'success' : 'warning'} size='small' />
  //                 </Box>
  //               </Grid>
  //               <Grid item xs={6}>
  //                 <Typography variant='caption' color='text.secondary'>First Name</Typography>
  //                 <Typography variant='body1'>{user.firstName || user.nameOnWallet?.split(' ')[0] || 'N/A'}</Typography>
  //               </Grid>
  //               <Grid item xs={6}>
  //                 <Typography variant='caption' color='text.secondary'>Last Name</Typography>
  //                 <Typography variant='body1'>{user.lastName || user.nameOnWallet?.split(' ')[1] || 'N/A'}</Typography>
  //               </Grid>
  //               <Grid item xs={12}>
  //                 <Typography variant='caption' color='text.secondary'>Date Of Birth</Typography>
  //                 <Typography variant='body1'>{user.dateOfBirth || '0000-00-00'}</Typography>
  //               </Grid>
  //               <Grid item xs={12}>
  //                 <Typography variant='caption' color='text.secondary'>Contact Number</Typography>
  //                 <Typography variant='body1'>{user.contactNumber || 'N/A'}</Typography>
  //               </Grid>
  //               <Grid item xs={12}>
  //                 <Typography variant='caption' color='text.secondary'>Email</Typography>
  //                 <Typography variant='body1'>{user.emailAddress}</Typography>
  //               </Grid>
  //             </Grid>
  //           </CardContent>
  //         </Card>
  //       </Grid>

  //       {/* Address Information */}
  //       <Grid item xs={12} md={6}>
  //         <Card>
  //           <CardHeader 
  //             title='Address Information' 
  //             avatar={<Icon icon='tabler:map-pin' />}
  //           />
  //           <Divider />
  //           <CardContent>
  //             <Grid container spacing={2}>
  //               <Grid item xs={12}>
  //                 <Typography variant='caption' color='text.secondary'>Street</Typography>
  //                 <Typography variant='body1'>{user.street || 'N/A'}</Typography>
  //               </Grid>
  //               <Grid item xs={12}>
  //                 <Typography variant='caption' color='text.secondary'>Address Line 1</Typography>
  //                 <Typography variant='body1'>{user.addressLine1 || 'N/A'}</Typography>
  //               </Grid>
  //               <Grid item xs={6}>
  //                 <Typography variant='caption' color='text.secondary'>City</Typography>
  //                 <Typography variant='body1'>{user.city || 'N/A'}</Typography>
  //               </Grid>
  //               <Grid item xs={6}>
  //                 <Typography variant='caption' color='text.secondary'>Zip/Postal Code</Typography>
  //                 <Typography variant='body1'>{user.zipCode || 'N/A'}</Typography>
  //               </Grid>
  //               <Grid item xs={6}>
  //                 <Typography variant='caption' color='text.secondary'>State</Typography>
  //                 <Typography variant='body1'>{user.state || 'N/A'}</Typography>
  //               </Grid>
  //               <Grid item xs={6}>
  //                 <Typography variant='caption' color='text.secondary'>Country</Typography>
  //                 <Typography variant='body1'>{user.country || 'N/A'}</Typography>
  //               </Grid>
  //             </Grid>
  //           </CardContent>
  //         </Card>
  //       </Grid>

  //       {/* KYC Documents */}
  //       <Grid item xs={12}>
  //         <Card>
  //           <CardHeader 
  //             title='KYC Documents' 
  //             avatar={<Icon icon='tabler:file-text' />}
  //           />
  //           <Divider />
  //           <CardContent>
  //             <Grid container spacing={3}>
  //               <Grid item xs={12} md={4}>
  //                 <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'action.hover' }}>
  //                   <Icon icon='tabler:photo' fontSize={40} color='#666' />
  //                   <Typography variant='subtitle2' sx={{ mt: 1, fontWeight: 600 }}>Photo With PhotoID</Typography>
  //                   <Typography variant='body2' color='error.main' sx={{ mt: 1 }}>
  //                     No Document Uploaded
  //                   </Typography>
  //                 </Paper>
  //               </Grid>
  //               <Grid item xs={12} md={4}>
  //                 <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'action.hover' }}>
  //                   <Icon icon='tabler:file' fontSize={40} color='#666' />
  //                   <Typography variant='subtitle2' sx={{ mt: 1, fontWeight: 600 }}>Address Proof ID</Typography>
  //                   <Typography variant='body2' color='error.main' sx={{ mt: 1 }}>
  //                     No Document Uploaded
  //                   </Typography>
  //                 </Paper>
  //               </Grid>
  //               <Grid item xs={12} md={4}>
  //                 <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'action.hover' }}>
  //                   <Icon icon='tabler:shield-check' fontSize={40} color='#666' />
  //                   <Typography variant='subtitle2' sx={{ mt: 1, fontWeight: 600 }}>KYC Proof ID</Typography>
  //                   <Typography variant='body2' color='error.main' sx={{ mt: 1 }}>
  //                     No Document Uploaded
  //                   </Typography>
  //                 </Paper>
  //               </Grid>
  //             </Grid>
  //           </CardContent>
  //         </Card>
  //       </Grid>
  //     </Grid>
  //   )
  // }

  // export default ProfileTab


  import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const ProfileTab = ({ user }) => {
  const getStatusColor = (status) => {
    const statusColors = {
      active: 'success',
      inactive: 'default',
      suspended: 'error',
      pending: 'warning'
    }
    return statusColors[status] || 'default'
  }

  return (
    <Grid container spacing={4}>
      {/* Profile Information */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader 
            title='Profile Information' 
            avatar={<Icon icon='tabler:user-circle' />}
          />
          <Divider />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='caption' color='text.secondary'>Wallet ID</Typography>
                <Typography variant='body1' sx={{ fontWeight: 500 }}>{user.walletId}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='caption' color='text.secondary'>Account Status</Typography>
                <Box sx={{ mt: 0.5 }}>
                  <Chip label={user.status} color={getStatusColor(user.status)} size='small' />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='caption' color='text.secondary'>KYC Status</Typography>
                <Box sx={{ mt: 0.5 }}>
                  <Chip label={user.kycStatus} color={user.kycStatus === 'verified' ? 'success' : 'warning'} size='small' />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='caption' color='text.secondary'>First Name</Typography>
                <Typography variant='body1'>{user.firstName || user.nameOnWallet?.split(' ')[0] || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='caption' color='text.secondary'>Last Name</Typography>
                <Typography variant='body1'>{user.lastName || user.nameOnWallet?.split(' ')[1] || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='caption' color='text.secondary'>Date Of Birth</Typography>
                <Typography variant='body1'>{user.dateOfBirth || '0000-00-00'}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='caption' color='text.secondary'>Contact Number</Typography>
                <Typography variant='body1'>{user.contactNumber || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='caption' color='text.secondary'>Email</Typography>
                <Typography variant='body1'>{user.emailAddress}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Address Information */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader 
            title='Address Information' 
            avatar={<Icon icon='tabler:map-pin' />}
          />
          <Divider />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='caption' color='text.secondary'>Street</Typography>
                <Typography variant='body1'>{user.street || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='caption' color='text.secondary'>Address Line 1</Typography>
                <Typography variant='body1'>{user.addressLine1 || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='caption' color='text.secondary'>City</Typography>
                <Typography variant='body1'>{user.city || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='caption' color='text.secondary'>Zip/Postal Code</Typography>
                <Typography variant='body1'>{user.zipCode || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='caption' color='text.secondary'>State</Typography>
                <Typography variant='body1'>{user.state || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='caption' color='text.secondary'>Country</Typography>
                <Typography variant='body1'>{user.country || 'N/A'}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* KYC Documents */}
      <Grid item xs={12}>
        <Card>
          <CardHeader 
            title='KYC Documents' 
            avatar={<Icon icon='tabler:file-text' />}
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'action.hover' }}>
                  <Icon icon='tabler:photo' fontSize={40} color='#666' />
                  <Typography variant='subtitle2' sx={{ mt: 1, fontWeight: 600 }}>
                    Aadhaar Card (Photo ID)
                  </Typography>
                  <Typography variant='body2' color='error.main' sx={{ mt: 1 }}>
                    No Document Uploaded
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'action.hover' }}>
                  <Icon icon='tabler:file' fontSize={40} color='#666' />
                  <Typography variant='subtitle2' sx={{ mt: 1, fontWeight: 600 }}>
                    Address Proof (Utility Bill / Aadhaar)
                  </Typography>
                  <Typography variant='body2' color='error.main' sx={{ mt: 1 }}>
                    No Document Uploaded
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'action.hover' }}>
                  <Icon icon='tabler:shield-check' fontSize={40} color='#666' />
                  <Typography variant='subtitle2' sx={{ mt: 1, fontWeight: 600 }}>
                    PAN Card (Identity Proof)
                  </Typography>
                  <Typography variant='body2' color='error.main' sx={{ mt: 1 }}>
                    No Document Uploaded
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ProfileTab