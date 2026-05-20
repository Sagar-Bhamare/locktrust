import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Toast
import toast from 'react-hot-toast'

const ViewApplication = () => {
  const router = useRouter()
  const [application, setApplication] = useState(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')
  const [applicationReason, setApplicationReason] = useState('')
  const [showReason, setShowReason] = useState(false)
  const [imageDialogOpen, setImageDialogOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState({ url: '', title: '' })

  useEffect(() => {
    const storedData = localStorage.getItem('viewApplicationData')
    
    if (storedData) {
      const data = JSON.parse(storedData)
      setApplication(data)
      setStatus(data.status)
      setLoading(false)
    } else {
      router.replace('/prepaid-card-applications')
    }
  }, [router])

  const handleStatusChange = (event) => {
    const newStatus = event.target.value
    setStatus(newStatus)
    if (newStatus === 'more_info') {
      setShowReason(true)
    } else {
      setShowReason(false)
      setApplicationReason('')
    }
  }

  const handleSubmit = () => {
    if (status === 'more_info' && !applicationReason) {
      toast.error('Please enter application reason')
      return
    }
    
    toast.success(`Application ${status === 'approved' ? 'approved' : status === 'rejected' ? 'rejected' : status === 'more_info' ? 'updated with more info request' : 'cancelled'} successfully!`)
    
    localStorage.removeItem('viewApplicationData')
    router.push('/prepaid-card-applications')
  }

  const handleCancel = () => {
    localStorage.removeItem('viewApplicationData')
    router.push('/prepaid-card-applications')
  }

  const handleViewImage = (imageUrl, title) => {
    setSelectedImage({ url: imageUrl, title: title })
    setImageDialogOpen(true)
  }

  const handleCloseImageDialog = () => {
    setImageDialogOpen(false)
    setSelectedImage({ url: '', title: '' })
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!application) return null

  // Dummy image paths using /public/images/logos/locktrust.jpg
  const photoImageUrl = '/images/logos/locktrust.jpg'
  const addressProofUrl = '/images/logos/locktrust.jpg'
  const kycProofUrl = '/images/logos/locktrust.jpg'

  return (
    <Box>
      {/* Header */}
      <Card sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant='h4' sx={{ fontWeight: 600, mb: 1 }}>
              View Prepaid Card Application
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Review and update application status
            </Typography>
          </Box>
          <Button
            variant='outlined'
            color='secondary'
            onClick={handleCancel}
            startIcon={<Icon icon='tabler:arrow-left' />}
            sx={{ textTransform: 'none' }}
          >
            Back to List
          </Button>
        </Box>
      </Card>

      {/* Form */}
      <Card sx={{ p: 4, borderRadius: 2 }}>
        <Grid container spacing={4}>
          {/* Readonly Fields */}
          <Grid item xs={12} md={6}>
            <Typography variant='caption' color='text.secondary'>Wallet ID</Typography>
            <Typography variant='body1' sx={{ fontWeight: 500, mt: 0.5 }}>
              {application.walletId}
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant='caption' color='text.secondary'>SSN Number</Typography>
            <Typography variant='body1' sx={{ fontWeight: 500, mt: 0.5 }}>
              {application.ssnNumber}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant='caption' color='text.secondary'>Date Of Birth</Typography>
            <Typography variant='body1' sx={{ mt: 0.5 }}>
              {application.dateOfBirth}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant='caption' color='text.secondary'>First Name</Typography>
            <Typography variant='body1' sx={{ mt: 0.5 }}>
              {application.firstName}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant='caption' color='text.secondary'>Last Name</Typography>
            <Typography variant='body1' sx={{ mt: 0.5 }}>
              {application.lastName}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant='caption' color='text.secondary'>Contact Number</Typography>
            <Typography variant='body1' sx={{ mt: 0.5 }}>
              {application.contactNo}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='caption' color='text.secondary'>Email Id</Typography>
            <Typography variant='body1' sx={{ mt: 0.5 }}>
              {application.emailAddress}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant='h6' sx={{ mb: 3, fontWeight: 600 }}>
              KYC Documents
            </Typography>
          </Grid>

          {/* Document View Buttons with Image Preview */}
          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant='outlined'
              onClick={() => handleViewImage(photoImageUrl, 'Photo Image')}
              startIcon={<Icon icon='tabler:photo' />}
              sx={{ py: 1.5, textTransform: 'none' }}
            >
              Photo Image: View Image
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant='outlined'
              onClick={() => handleViewImage(addressProofUrl, 'Address Proof')}
              startIcon={<Icon icon='tabler:file' />}
              sx={{ py: 1.5, textTransform: 'none' }}
            >
              Address Proof: View Image
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant='outlined'
              onClick={() => handleViewImage(kycProofUrl, 'KYC Proof')}
              startIcon={<Icon icon='tabler:shield-check' />}
              sx={{ py: 1.5, textTransform: 'none' }}
            >
              Update KYC: View Image
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>

          {/* Editable Fields */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Application Status</InputLabel>
              <Select
                value={status}
                label="Application Status"
                onChange={handleStatusChange}
              >
                <MenuItem value='pending'>Pending</MenuItem>
                <MenuItem value='approved'>Approved</MenuItem>
                <MenuItem value='rejected'>Rejected</MenuItem>
                <MenuItem value='more_info'>More Info Required</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {showReason && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Application Reason"
                value={applicationReason}
                onChange={(e) => setApplicationReason(e.target.value)}
                placeholder="Please provide reason for requesting more information..."
              />
            </Grid>
          )}
        </Grid>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4 }}>
          <Button
            variant='outlined'
            color='secondary'
            onClick={handleCancel}
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={handleSubmit}
            sx={{ textTransform: 'none' }}
          >
            Submit
          </Button>
        </Box>
      </Card>

      {/* Image Preview Dialog */}
      <Dialog
        open={imageDialogOpen}
        onClose={handleCloseImageDialog}
        maxWidth='md'
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle>
          <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography variant='h6'>{selectedImage.title}</Typography>
            <IconButton onClick={handleCloseImageDialog}>
              <Icon icon='tabler:x' />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {selectedImage.url && (
            <Box
              component='img'
              src={selectedImage.url}
              alt={selectedImage.title}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: '70vh',
                objectFit: 'contain',
                borderRadius: 1
              }}
              onError={(e) => {
                e.target.src = '/images/logos/locktrust.jpg'
                e.target.alt = 'Image not found'
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default ViewApplication