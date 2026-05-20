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

const PrepaidCardHeader = ({ data, onRefresh }) => {
  const [exportAnchorEl, setExportAnchorEl] = useState(null)

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['SR. No', 'User Name', 'Wallet ID', 'SSN Number', 'Contact No', 'Email Address', 'Status']
    const rows = data.map(row => [
      row.srNo,
      row.userName,
      row.walletId,
      row.ssnNumber,
      row.contactNo,
      row.emailAddress,
      row.status
    ])
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.href = url
    link.setAttribute('download', 'prepaid_card_applications.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success('Exported as CSV successfully!')
    handleExportClose()
  }

  // Export to Excel
  const exportToExcel = () => {
    const headers = ['SR. No', 'User Name', 'Wallet ID', 'SSN Number', 'Contact No', 'Email Address', 'Status']
    const rows = data.map(row => [
      row.srNo,
      row.userName,
      row.walletId,
      row.ssnNumber,
      row.contactNo,
      row.emailAddress,
      row.status
    ])
    
    let excelContent = headers.join('\t') + '\n'
    rows.forEach(row => {
      excelContent += row.join('\t') + '\n'
    })
    
    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.href = url
    link.setAttribute('download', 'prepaid_card_applications.xls')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success('Exported as Excel successfully!')
    handleExportClose()
  }

  // Export to PDF
  const exportToPDF = () => {
    const printWindow = window.open('', '_blank')
    const headers = ['SR. No', 'User Name', 'Wallet ID', 'SSN Number', 'Contact No', 'Email Address', 'Status']
    const rows = data.map(row => `
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">${row.srNo}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${row.userName}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${row.walletId}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${row.ssnNumber}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${row.contactNo}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${row.emailAddress}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${row.status}</td>
      </tr>
    `).join('')
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Prepaid Card Applications</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { background-color: #4CAF50; color: white; padding: 12px; border: 1px solid #ddd; }
            td { padding: 8px; border: 1px solid #ddd; }
            h2 { text-align: center; color: #333; }
            .date { text-align: center; margin-bottom: 20px; color: #666; }
          </style>
        </head>
        <body>
          <h2>Prepaid Card Applications Report</h2>
          <div class="date">Generated: ${new Date().toLocaleString()}</div>
          <table>
            <thead>
              <tr>
                ${headers.map(h => `<th>${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
          <div style="margin-top: 30px; text-align: center; color: #666;">
            <p>Total Applications: ${data.length}</p>
          </div>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
    toast.success('PDF exported successfully!')
    handleExportClose()
  }

  // Print
  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    const headers = ['SR. No', 'User Name', 'Wallet ID', 'SSN Number', 'Contact No', 'Email Address', 'Status']
    const rows = data.map(row => `
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">${row.srNo}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${row.userName}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${row.walletId}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${row.ssnNumber}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${row.contactNo}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${row.emailAddress}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${row.status}</td>
      </tr>
    `).join('')
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Prepaid Card Applications</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { background-color: #4CAF50; color: white; padding: 12px; border: 1px solid #ddd; }
            td { padding: 8px; border: 1px solid #ddd; }
            h2 { text-align: center; color: #333; }
            .date { text-align: center; margin-bottom: 20px; color: #666; }
          </style>
        </head>
        <body>
          <h2>Prepaid Card Applications Report</h2>
          <div class="date">Printed: ${new Date().toLocaleString()}</div>
          <table>
            <thead>
              <tr>
                ${headers.map(h => `<th>${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
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

      {/* Export Menu */}
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

export default PrepaidCardHeader