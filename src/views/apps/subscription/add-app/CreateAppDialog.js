import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Toast
import toast from 'react-hot-toast'

const allModules = [
  'Ledger',
  'Inverse Rent Roll',
  'Branch Management',
  'Dashboard',
  'Crm Setting',
  'Accounting',
  'Sales',
  'Qr Code Generator',
  'Rent Roll',
  'Room Management',
  'Event Management',
  'Parking Pass',
  'Pos',
  'User Management',
  'Slip Management'
]

const CreateAppDialog = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    modules: allModules.map(module => ({ name: module, isDefault: false }))
  })
  const [errors, setErrors] = useState({})

  const handleNameChange = (e) => {
    setFormData(prev => ({ ...prev, name: e.target.value }))
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: '' }))
    }
  }

  const handleModuleToggle = (moduleName) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.map(module =>
        module.name === moduleName
          ? { ...module, isDefault: !module.isDefault }
          : module
      )
    }))
  }

  const handleSelectAll = () => {
    const allSelected = formData.modules.every(module => module.isDefault)
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.map(module => ({ ...module, isDefault: !allSelected }))
    }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'App Name is required'
    }
    return newErrors
  }

  const handleSubmit = () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const selectedModules = formData.modules.filter(module => module.isDefault)
    if (selectedModules.length === 0) {
      toast.error('Please select at least one module')
      return
    }

    const newApp = {
      name: formData.name,
      modules: selectedModules
    }

    onSubmit(newApp)
    toast.success('App created successfully!')
    setFormData({
      name: '',
      modules: allModules.map(module => ({ name: module, isDefault: false }))
    })
    onClose()
  }

  const selectedCount = formData.modules.filter(m => m.isDefault).length

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='h5' sx={{ fontWeight: 600 }}>Add App</Typography>
          <IconButton onClick={onClose}>
            <Icon icon='tabler:x' />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name}
                onChange={handleNameChange}
                error={!!errors.name}
                helperText={errors.name}
                placeholder="Enter app name (e.g., Marina One)"
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 1 }}>
                <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                  Module Name & Is Default
                </Typography>
              </Divider>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant='body2' color='text.secondary'>
                  Selected: {selectedCount} / {allModules.length} modules
                </Typography>
                <Button size='small' onClick={handleSelectAll} variant='outlined'>
                  {selectedCount === allModules.length ? 'Deselect All' : 'Select All'}
                </Button>
              </Box>
              <Paper sx={{ p: 2, maxHeight: 400, overflow: 'auto' }}>
                <FormGroup>
                  <Grid container spacing={1}>
                    {formData.modules.map((module) => (
                      <Grid item xs={12} sm={6} md={4} key={module.name}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={module.isDefault}
                              onChange={() => handleModuleToggle(module.name)}
                              color='primary'
                            />
                          }
                          label={
                            <Typography variant='body2'>
                              {module.name}
                            </Typography>
                          }
                        />
                      </Grid>
                    ))}
                  </Grid>
                </FormGroup>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" sx={{ textTransform: 'none' }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" sx={{ textTransform: 'none' }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateAppDialog