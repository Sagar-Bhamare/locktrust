import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar'

const ViewUserDialog = ({ open, onClose, user, onEdit }) => {
  // ** Get Status Color
  const getStatusColor = (status) => {
    const statusColors = {
      active: 'success',
      inactive: 'default',
      suspended: 'error',
      pending: 'warning'
    }
    return statusColors[status] || 'default'
  }

  if (!user) return null

  // Use actual user data from the clicked row
  const userName = user.fullName || user.nameOnWallet || 'N/A'
  const userEmail = user.emailAddress || user.email || 'N/A'
  const userWalletId = user.walletId || 'N/A'
  const userStatus = user.status || 'N/A'
  const userFirstName = user.fullName?.split(' ')[0] || user.nameOnWallet?.split(' ')[0] || 'N/A'
  const userLastName = user.fullName?.split(' ')[1] || user.nameOnWallet?.split(' ')[1] || 'N/A'
  const userUsername = user.username || user.emailAddress?.split('@')[0] || 'N/A'
  const userKycStatus = user.kycStatus || 'pending'
  const userSubscriptionStatus = user.subscriptionStatus || 'active'
  const userSubscriptionName = user.subscriptionName || 'N/A'
  const userCrmName = user.crmName || 'N/A'
  const userAddonName = user.addonName || 'N/A'
  const userJoinDate = user.joinDate || 'N/A'

  // KYC document status based on actual KYC status
  const getKycDocumentStatus = () => {
    if (userKycStatus === 'verified') {
      return 'Document Uploaded'
    }
    return 'No Document Uploaded'
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CustomAvatar skin='light' sx={{ width: 50, height: 50, fontSize: '1.5rem' }}>
              {userUsername.charAt(0).toUpperCase()}
            </CustomAvatar>
            <Box>
              <Typography variant='h5'>{userName}</Typography>
              <Typography variant='body2' color='text.secondary'>@{userUsername}</Typography>
            </Box>
          </Box>
          <IconButton onClick={onClose}>
            <Icon icon='tabler:x' />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={4}>
          {/* Profile Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, bgcolor: 'action.hover' }}>
              <Typography variant='h6' sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Icon icon='tabler:user-circle' /> Profile Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant='caption' color='text.secondary'>Wallet ID</Typography>
                    <Typography variant='body1' sx={{ fontWeight: 500 }}>
                      {userWalletId}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant='caption' color='text.secondary'>Account Status</Typography>
                    <Box sx={{ mt: 0.5 }}>
                      <Chip
                        label={userStatus}
                        color={getStatusColor(userStatus.toLowerCase())}
                        size='small'
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant='caption' color='text.secondary'>First Name</Typography>
                    <Typography variant='body1'>{userFirstName}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant='caption' color='text.secondary'>Last Name</Typography>
                    <Typography variant='body1'>{userLastName}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant='caption' color='text.secondary'>Date Of Birth</Typography>
                    <Typography variant='body1'>0000-00-00</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant='caption' color='text.secondary'>Contact Number</Typography>
                    <Typography variant='body1'>{user.contact || '+17023727551'}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant='caption' color='text.secondary'>Email</Typography>
                    <Typography variant='body1'>{userEmail}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Subscription & CRM Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, bgcolor: 'action.hover' }}>
              <Typography variant='h6' sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Icon icon='tabler:credit-card' /> Subscription & CRM Details
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant='caption' color='text.secondary'>CRM Name</Typography>
                    <Typography variant='body1'>{userCrmName}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant='caption' color='text.secondary'>Subscription Name</Typography>
                    <Typography variant='body1'>{userSubscriptionName}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant='caption' color='text.secondary'>Addon Name</Typography>
                    <Typography variant='body1'>{userAddonName}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant='caption' color='text.secondary'>Subscription Status</Typography>
                    <Box sx={{ mt: 0.5 }}>
                      <Chip
                        label={userSubscriptionStatus}
                        color={userSubscriptionStatus === 'active' ? 'success' : 'default'}
                        size='small'
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant='caption' color='text.secondary'>KYC Status</Typography>
                    <Box sx={{ mt: 0.5 }}>
                      <Chip
                        label={userKycStatus}
                        color={userKycStatus === 'verified' ? 'success' : userKycStatus === 'pending' ? 'warning' : 'error'}
                        size='small'
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant='caption' color='text.secondary'>Join Date</Typography>
                    <Typography variant='body1'>{userJoinDate}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* KYC Documents Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, bgcolor: 'action.hover' }}>
              <Typography variant='h6' sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Icon icon='tabler:file-text' /> KYC Documents
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center', p: 2, border: '1px dashed', borderColor: 'divider', borderRadius: 2 }}>
                    <Icon icon='tabler:photo' fontSize={40} color='#666' />
                    <Typography variant='subtitle2' sx={{ mt: 1, fontWeight: 600 }}>Photo With Photo ID</Typography>
                    <Typography variant='body2' color={userKycStatus === 'verified' ? 'success.main' : 'error.main'} sx={{ mt: 1 }}>
                      {getKycDocumentStatus()}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center', p: 2, border: '1px dashed', borderColor: 'divider', borderRadius: 2 }}>
                    <Icon icon='tabler:file' fontSize={40} color='#666' />
                    <Typography variant='subtitle2' sx={{ mt: 1, fontWeight: 600 }}>Address Proof ID</Typography>
                    <Typography variant='body2' color={userKycStatus === 'verified' ? 'success.main' : 'error.main'} sx={{ mt: 1 }}>
                      {getKycDocumentStatus()}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center', p: 2, border: '1px dashed', borderColor: 'divider', borderRadius: 2 }}>
                    <Icon icon='tabler:shield-check' fontSize={40} color='#666' />
                    <Typography variant='subtitle2' sx={{ mt: 1, fontWeight: 600 }}>KYC Proof ID</Typography>
                    <Typography variant='body2' color={userKycStatus === 'verified' ? 'success.main' : 'error.main'} sx={{ mt: 1 }}>
                      {getKycDocumentStatus()}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='secondary'>
          Close
        </Button>
        <Button 
          onClick={() => {
            onClose()
            if (onEdit) onEdit(user)
          }} 
          variant='contained'
        >
          Edit User
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ViewUserDialog