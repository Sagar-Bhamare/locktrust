import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Toast
import toast from 'react-hot-toast'

const MerchantHeader = ({ onRefresh }) => {
  const [exportAnchorEl, setExportAnchorEl] = useState(null)

  const exportToCSV = () => {
    toast.success('Exported as CSV successfully!')
    handleExportClose()
  }

  const exportToExcel = () => {
    toast.success('Exported as Excel successfully!')
    handleExportClose()
  }

  const exportToPDF = () => {
    toast.success('Exported as PDF successfully!')
    handleExportClose()
  }

  const handlePrint = () => {
    window.print()
    toast.success('Print dialog opened!')
    handleExportClose()
  }

  const handleExportClick = (event) => {
    setExportAnchorEl(event.currentTarget)
  }

  const handleExportClose = () => {
    setExportAnchorEl(null)
  }

  return (
    <Card sx={{ p: 2, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        <Tooltip title="Export">
          <Button
            variant='contained'
            color='primary'
            onClick={handleExportClick}
            startIcon={<Icon icon='tabler:download' />}
            sx={{ textTransform: 'none' }}
          >
            Export
          </Button>
        </Tooltip>
        
        <Tooltip title="Refresh">
          <IconButton onClick={onRefresh} color='primary'>
            <Icon icon='tabler:refresh' />
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={exportAnchorEl}
        open={Boolean(exportAnchorEl)}
        onClose={handleExportClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={exportToCSV}>
          <Icon icon='tabler:file-text' fontSize={20} style={{ marginRight: 8 }} />
          Export as CSV
        </MenuItem>
        <MenuItem onClick={exportToExcel}>
          <Icon icon='tabler:file-spreadsheet' fontSize={20} style={{ marginRight: 8 }} />
          Export as Excel
        </MenuItem>
        <MenuItem onClick={exportToPDF}>
          <Icon icon='tabler:file-pdf' fontSize={20} style={{ marginRight: 8 }} />
          Export as PDF
        </MenuItem>
        <MenuItem onClick={handlePrint}>
          <Icon icon='tabler:printer' fontSize={20} style={{ marginRight: 8 }} />
          Print
        </MenuItem>
      </Menu>
    </Card>
  )
}

export default MerchantHeader