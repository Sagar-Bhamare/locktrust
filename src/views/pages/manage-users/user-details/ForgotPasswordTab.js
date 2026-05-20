import React, { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Alert from '@mui/material/Alert'
import Paper from '@mui/material/Paper'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Toast
import toast from 'react-hot-toast'

const ForgotPasswordTab = ({ user }) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [resetData, setResetData] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})

  const validatePassword = () => {
    const newErrors = {}
    if (!resetData.newPassword) {
      newErrors.newPassword = 'New password is required'
    } else if (resetData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters'
    }
    if (!resetData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (resetData.newPassword !== resetData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    return newErrors
  }

  const handleResetPassword = () => {
    const newErrors = validatePassword()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    toast.success(`Password reset successfully for ${user.nameOnWallet}`)
    setOpenDialog(false)
    setResetData({ newPassword: '', confirmPassword: '' })
    setErrors({})
  }

  return (
    <>
      <Box sx={{ maxWidth: 500, mx: 'auto' }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Icon icon='tabler:lock-reset' fontSize={60} color='#666' />
          <Typography variant='h5' sx={{ mt: 2, mb: 1 }}>Reset Password</Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mb: 4 }}>
            Reset password for {user.nameOnWallet}
          </Typography>
          
          <Button 
            fullWidth 
            variant='contained' 
            color='warning'
            size='large'
            onClick={() => setOpenDialog(true)}
            startIcon={<Icon icon='tabler:refresh' />}
            sx={{ mb: 2 }}
          >
            Reset Password
          </Button>
          
          <Alert severity='info' sx={{ mt: 3 }}>
            A password reset link will be sent to {user.emailAddress}
          </Alert>
        </Paper>
      </Box>

      {/* Reset Password Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth='sm' fullWidth>
        <DialogTitle>
          <Box display='flex' justifyContent='space-between' alignItems='center'>
            Reset Password for {user?.nameOnWallet}
            <IconButton onClick={() => setOpenDialog(false)}>
              <Icon icon='tabler:x' />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Alert severity='warning' sx={{ mb: 3 }}>
              This will reset the password for {user?.emailAddress}
            </Alert>
            <TextField
              fullWidth
              type='password'
              label='New Password'
              value={resetData.newPassword}
              onChange={(e) => setResetData({ ...resetData, newPassword: e.target.value })}
              error={!!errors.newPassword}
              helperText={errors.newPassword}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon='tabler:lock' />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              fullWidth
              type='password'
              label='Confirm Password'
              value={resetData.confirmPassword}
              onChange={(e) => setResetData({ ...resetData, confirmPassword: e.target.value })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon='tabler:lock-check' />
                  </InputAdornment>
                )
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color='secondary'>Cancel</Button>
          <Button onClick={handleResetPassword} variant='contained' color='warning'>
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ForgotPasswordTab