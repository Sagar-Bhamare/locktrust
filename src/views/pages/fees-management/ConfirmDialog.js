import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import Alert from '@mui/material/Alert'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const ConfirmDialog = ({ open, onClose, onConfirm, type }) => {
  const getMessage = () => {
    if (type === 'all') {
      return {
        title: 'Update All Users',
        message: 'Are you sure you want to apply these fees to ALL users? This action cannot be undone.',
        warning: 'This will override all existing fee structures for every user in the system.'
      }
    } else {
      return {
        title: 'Update Special Users',
        message: 'Are you sure you want to apply these fees to SPECIAL users only?',
        warning: 'This will only affect users marked as "special" in the system.'
      }
    }
  }

  const content = getMessage()

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          {content.title}
          <IconButton onClick={onClose}>
            <Icon icon='tabler:x' />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Alert severity='warning' sx={{ mb: 3 }}>
          {content.warning}
        </Alert>
        <Typography variant='body2'>{content.message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='secondary'>
          Cancel
        </Button>
        <Button onClick={onConfirm} variant='contained' color='primary'>
          Confirm Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
