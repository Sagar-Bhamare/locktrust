import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const CardManagementHeader = ({
  onAddCard,
  onLoanCard,
  onBatchUpload,
  onLoanBatchUpload,
  onDownloadCardTemplate,
  onDownloadLoanTemplate,
  searchValue,
  onSearchChange,
  statusFilter,
  onStatusChange
}) => {
  return (
    <Card>
      <CardHeader title='Card Management' subheader='Manage physical and virtual cards' />
      <Box sx={{ p: 5, pt: 0 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
              <Button variant='contained' onClick={onAddCard} startIcon={<Icon icon='tabler:credit-card' />}>
                Add New Card
              </Button>
              <Button variant='outlined' color='warning' onClick={onLoanCard} startIcon={<Icon icon='tabler:coins' />}>
                Loan Card
              </Button>
              <Button variant='outlined' onClick={onBatchUpload} startIcon={<Icon icon='tabler:upload' />}>
                Batch Upload Cards
              </Button>
              <Button
                variant='outlined'
                color='info'
                onClick={onLoanBatchUpload}
                startIcon={<Icon icon='tabler:upload' />}
              >
                Loan Batch Upload
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                onClick={onDownloadCardTemplate}
                startIcon={<Icon icon='tabler:download' />}
              >
                Download Card Template
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                onClick={onDownloadLoanTemplate}
                startIcon={<Icon icon='tabler:download' />}
              >
                Download Loan Template
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              size='small'
              placeholder='Search by Card Number, Name or Bank'
              value={searchValue}
              onChange={e => onSearchChange(e.target.value)}
              InputProps={{
                startAdornment: <Icon icon='tabler:search' fontSize={20} style={{ marginRight: 8 }} />
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size='small'>
              <InputLabel>Status</InputLabel>
              <Select value={statusFilter} label='Status' onChange={e => onStatusChange(e.target.value)}>
                <MenuItem value=''>All</MenuItem>
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='inactive'>Inactive</MenuItem>
                <MenuItem value='suspended'>Suspended</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
}

export default CardManagementHeader
