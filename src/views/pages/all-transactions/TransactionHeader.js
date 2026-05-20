import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import ButtonGroup from '@mui/material/ButtonGroup'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Export Utilities
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'

const TransactionHeader = ({ data }) => {
  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      'Date',
      'Transaction ID',
      'Description',
      'Credit',
      'Debit',
      'Conix Trans ID',
      'Invoice ID',
      'Receiver Wallet ID',
      'Sender Bank Account',
      'Account',
      'Action'
    ]

    const csvData = data.map(item => [
      item.date,
      item.transactionId,
      item.description,
      item.credit,
      item.debit,
      item.conixTransId,
      item.invoiceId,
      item.receiverWalletId,
      item.senderBankAccount,
      item.account,
      item.action
    ])

    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  // Export to Excel
  const exportToExcel = () => {
    const excelData = data.map(item => ({
      Date: item.date,
      'Transaction ID': item.transactionId,
      Description: item.description,
      Credit: item.credit,
      Debit: item.debit,
      'Conix Trans ID': item.conixTransId,
      'Invoice ID': item.invoiceId,
      'Receiver Wallet ID': item.receiverWalletId,
      'Sender Bank Account': item.senderBankAccount,
      Account: item.account,
      Action: item.action
    }))

    const ws = XLSX.utils.json_to_sheet(excelData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Transactions')
    XLSX.writeFile(wb, `transactions_${new Date().toISOString().split('T')[0]}.xlsx`)
  }

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF({ format: 'a4', orientation: 'landscape' })

    const tableColumn = [
      'Date',
      'Transaction ID',
      'Description',
      'Credit',
      'Debit',
      'Conix Trans ID',
      'Invoice ID',
      'Receiver Wallet ID',
      'Sender Bank Account',
      'Account',
      'Action'
    ]

    const tableRows = data.map(item => [
      item.date,
      item.transactionId,
      item.description.length > 30 ? item.description.substring(0, 30) + '...' : item.description,
      `$${item.credit}`,
      `$${item.debit}`,
      item.conixTransId,
      item.invoiceId,
      item.receiverWalletId,
      item.senderBankAccount,
      item.account,
      item.action
    ])

    doc.text('Transactions Report', 14, 15)

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 7 },
      headStyles: { fillColor: [41, 128, 185] },
      margin: { top: 20 }
    })

    doc.save(`transactions_${new Date().toISOString().split('T')[0]}.pdf`)
  }

  return (
    <Card>
      <CardHeader
        title='All Transactions'
        subheader='View and manage all transaction history'
      />
      <Box
        sx={{
          p: 5,
          pt: 0,
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Icon icon='tabler:info-circle' fontSize={16} color='#666' />
          <Typography variant='caption' color='text.secondary'>
            {data.length} transactions found
          </Typography>
        </Box>
        <ButtonGroup variant='outlined' size='medium'>
          <Button onClick={exportToCSV} startIcon={<Icon icon='tabler:file-spreadsheet' />}>
            CSV
          </Button>
          <Button onClick={exportToExcel} startIcon={<Icon icon='tabler:file-excel' />}>
            Excel
          </Button>
          <Button onClick={exportToPDF} startIcon={<Icon icon='tabler:file-pdf' />}>
            PDF
          </Button>
        </ButtonGroup>
      </Box>
    </Card>
  )
}

export default TransactionHeader