import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Toast
import toast from 'react-hot-toast'

const EscrowHeader = ({ onRefresh }) => {
  const handleExport = () => {
    toast.success('Export functionality coming soon!')
  }

  const handleAddEscrow = () => {
    toast.success('Add Escrow functionality coming soon!')
  }

  const handleMultiPartyEscrow = () => {
    toast.success('Multi Party Escrow functionality coming soon!')
  }

  const handleTradeDeal = () => {
    toast.success('Trade Deal functionality coming soon!')
  }

  return (
    <Card sx={{ p: 2, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        <Tooltip title="Add Escrow">
          <Button
            variant='contained'
            color='primary'
            size='small'
            onClick={handleAddEscrow}
            startIcon={<Icon icon='tabler:plus' />}
            sx={{ textTransform: 'none' }}
          >
            Add Escrow
          </Button>
        </Tooltip>
        
        <Tooltip title="Multi Party Escrow">
          <Button
            variant='contained'
            color='primary'
            size='small'
            onClick={handleMultiPartyEscrow}
            startIcon={<Icon icon='tabler:users' />}
            sx={{ textTransform: 'none' }}
          >
            Multi Party Escrow
          </Button>
        </Tooltip>
        
        <Tooltip title="Trade Deal">
          <Button
            variant='contained'
            color='primary'
            size='small'
            onClick={handleTradeDeal}
            startIcon={<Icon icon='tabler:chart-line' />}
            sx={{ textTransform: 'none' }}
          >
            Trade Deal
          </Button>
        </Tooltip>
        
        <Tooltip title="Export">
          <Button
            variant='outlined'
            color='primary'
            size='small'
            onClick={handleExport}
            startIcon={<Icon icon='tabler:download' />}
            sx={{ textTransform: 'none' }}
          >
            Export
          </Button>
        </Tooltip>
        
        <Tooltip title="Refresh">
          <IconButton onClick={onRefresh} color='primary' size='small'>
            <Icon icon='tabler:refresh' />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  )
}

export default EscrowHeader;

