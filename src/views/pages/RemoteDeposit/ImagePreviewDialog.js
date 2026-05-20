import React from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const ImagePreviewDialog = ({ open, onClose, imageUrl, imageName, onDownload }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='h6' sx={{ fontWeight: 600 }}>
            {imageName}
          </Typography>
          <IconButton onClick={onClose}>
            <Icon icon='tabler:x' />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
          {imageUrl && (
            <Box
              component='img'
              src={imageUrl}
              alt={imageName}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: '60vh',
                objectFit: 'contain',
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider'
              }}
              onError={(e) => {
                e.target.src = '/images/logos/locktrust.jpg'
                e.target.alt = 'Image not found'
              }}
            />
          )}
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button
            variant='outlined'
            color='secondary'
            onClick={onClose}
            startIcon={<Icon icon='tabler:x' />}
            sx={{ textTransform: 'none' }}
          >
            Close
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={onDownload}
            startIcon={<Icon icon='tabler:download' />}
            sx={{ textTransform: 'none' }}
          >
            Download Image
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default ImagePreviewDialog