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

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar'

const ViewUserDialog = ({ open, onClose, user, onEdit }) => {
  // ** Get Status Color
  const getStatusColor = status => {
    const statusColors = {
      active: 'success',
      inactive: 'default',
      suspended: 'error',
      pending: 'warning'
    }
    return statusColors[status] || 'default'
  }

  // ** Get Subscription Status Color
  const getSubscriptionColor = status => {
    const statusColors = {
      active: 'success',
      expired: 'error',
      pending: 'warning',
      cancelled: 'default'
    }
    return statusColors[status] || 'default'
  }

  if (!user) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          User Details
          <IconButton onClick={onClose}>
            <Icon icon='tabler:x' />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <CustomAvatar skin='light' sx={{ width: 60, height: 60, fontSize: '2rem', mr: 3 }}>
              {user.username.charAt(0).toUpperCase()}
            </CustomAvatar>
            <Box>
              <Typography variant='h6'>{user.fullName}</Typography>
              <Typography variant='body2' color='text.secondary'>
                @{user.username}
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant='caption' color='text.secondary'>
                Wallet ID
              </Typography>
              <Typography variant='body2' sx={{ fontWeight: 500 }}>
                {user.walletId}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='caption' color='text.secondary'>
                Email Address
              </Typography>
              <Typography variant='body2'>{user.email}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='caption' color='text.secondary'>
                CRM Name
              </Typography>
              <Typography variant='body2'>{user.crmName}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='caption' color='text.secondary'>
                Subscription
              </Typography>
              <Typography variant='body2'>{user.subscriptionName}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='caption' color='text.secondary'>
                Addon Name
              </Typography>
              <Typography variant='body2'>{user.addonName}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='caption' color='text.secondary'>
                Status
              </Typography>
              <Chip label={user.status} color={getStatusColor(user.status)} size='small' />
            </Grid>
            <Grid item xs={6}>
              <Typography variant='caption' color='text.secondary'>
                Subscription Status
              </Typography>
              <Chip
                label={user.subscriptionStatus}
                color={getSubscriptionColor(user.subscriptionStatus)}
                size='small'
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='caption' color='text.secondary'>
                Join Date
              </Typography>
              <Typography variant='body2'>{user.joinDate}</Typography>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='secondary'>
          Close
        </Button>
        <Button
          onClick={() => {
            onClose()
            onEdit(user)
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
