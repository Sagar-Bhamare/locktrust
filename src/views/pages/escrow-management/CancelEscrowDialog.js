import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Toast
import toast from 'react-hot-toast'

const CancelEscrowDialog = ({ open, onClose, onConfirm, rowData }) => {
  const [reason, setReason] = useState('')

  const handleConfirm = () => {
    if (!reason) {
      toast.error('Please provide a reason for cancellation')
      return
    }
    toast.success(`Escrow cancelled successfully! Reason: ${reason}`)
    onConfirm()
    setReason('')
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='h6' sx={{ fontWeight: 600 }}>
            Cancel Escrow
          </Typography>
          <IconButton onClick={onClose}>
            <Icon icon='tabler:x' />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        {rowData && (
          <Box sx={{ mt: 2 }}>
            <Alert severity="warning" sx={{ mb: 3 }}>
              Are you sure you want to cancel this escrow? This action cannot be undone.
            </Alert>
            
            <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Typography variant='subtitle2' sx={{ fontWeight: 600, mb: 1 }}>
                Escrow Details:
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant='caption' color='text.secondary'>From Wallet:</Typography>
                <Typography variant='body2' sx={{ fontWeight: 500 }}>{rowData.fromWallet}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant='caption' color='text.secondary'>From Name:</Typography>
                <Typography variant='body2'>{rowData.fromWalletName}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant='caption' color='text.secondary'>To Wallet:</Typography>
                <Typography variant='body2' sx={{ fontWeight: 500 }}>{rowData.toWallet || '-'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant='caption' color='text.secondary'>To Name:</Typography>
                <Typography variant='body2'>{rowData.toWalletName || '-'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant='caption' color='text.secondary'>Amount:</Typography>
                <Typography variant='body2' sx={{ fontWeight: 500 }}>{formatCurrency(rowData.amount)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='caption' color='text.secondary'>Escrow Type:</Typography>
                <Typography variant='body2'>{rowData.escrowType || '-'}</Typography>
              </Box>
            </Box>

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Cancellation Reason"
              placeholder="Please provide a reason for cancelling this escrow..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" sx={{ textTransform: 'none' }}>
          No, Keep It
        </Button>
        <Button onClick={handleConfirm} variant="contained" color="error" sx={{ textTransform: 'none' }}>
          Yes, Cancel Escrow
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CancelEscrowDialog