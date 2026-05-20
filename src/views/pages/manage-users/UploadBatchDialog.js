import React, { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const UploadBatchDialog = ({ open, onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = e => {
    const file = e.target.files[0]
    if (
      file &&
      (file.type === 'text/csv' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    ) {
      setSelectedFile(file)
    } else {
      toast.error('Please upload a valid CSV or Excel file')
    }
  }

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload')
      return
    }
    setUploading(true)
    onUpload(selectedFile)
    setUploading(false)
    setSelectedFile(null)
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
        <DialogTitle>Upload Batch Wallets</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Alert severity='info' sx={{ mb: 3 }}>
              Please upload a CSV or Excel file with the following columns: Name on Wallet, Email Address, Currency,
              Initial Balance
            </Alert>
            <Button
              variant='outlined'
              component='label'
              fullWidth
              sx={{ mb: 2 }}
              startIcon={<Icon icon='tabler:upload' />}
            >
              Select File
              <input type='file' hidden accept='.csv,.xlsx,.xls' onChange={handleFileChange} />
            </Button>
            {selectedFile && (
              <Typography variant='body2' sx={{ mt: 1 }}>
                Selected: {selectedFile.name}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleUpload} variant='contained' disabled={!selectedFile}>
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop open={uploading} sx={{ color: '#fff', zIndex: 9999 }}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  )
}

export default UploadBatchDialog
