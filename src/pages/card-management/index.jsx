import React, { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Components
import CardManagementHeader from 'src/views/pages/card-management/CardManagementHeader'
import AddCardDialog from 'src/views/pages/card-management/AddCardDialog'
import LoanCardDialog from 'src/views/pages/card-management/LoanCardDialog'
import BatchUploadDialog from 'src/views/pages/card-management/BatchUploadDialog'
import LoanBatchUploadDialog from 'src/views/pages/card-management/LoanBatchUploadDialog'
import CardTable from 'src/views/pages/card-management/CardTable'

// ** Toast
import toast from 'react-hot-toast'

// ** Dummy Data
const initialCardData = [
  {
    id: 1,
    dateTime: '2024-01-15 10:30:00',
    cardNumber: '**** **** **** 1234',
    cardExpiry: '12/26',
    cardType: 'Visa',
    issuingBank: 'Chase Bank',
    balance: 5000,
    allotted: 10000,
    status: 'active',
    nameOnCard: 'John Doe'
  },
  {
    id: 2,
    dateTime: '2024-01-16 14:45:00',
    cardNumber: '**** **** **** 5678',
    cardExpiry: '08/25',
    cardType: 'Mastercard',
    issuingBank: 'Bank of America',
    balance: 3250,
    allotted: 8000,
    status: 'active',
    nameOnCard: 'Jane Smith'
  },
  {
    id: 3,
    dateTime: '2024-01-18 09:15:00',
    cardNumber: '**** **** **** 9012',
    cardExpiry: '03/27',
    cardType: 'Amex',
    issuingBank: 'American Express',
    balance: 12500,
    allotted: 15000,
    status: 'inactive',
    nameOnCard: 'Robert Johnson'
  },
  {
    id: 4,
    dateTime: '2024-01-20 16:20:00',
    cardNumber: '**** **** **** 3456',
    cardExpiry: '10/24',
    cardType: 'Visa',
    issuingBank: 'Wells Fargo',
    balance: 750,
    allotted: 5000,
    status: 'active',
    nameOnCard: 'Maria Garcia'
  },
  {
    id: 5,
    dateTime: '2024-01-22 11:00:00',
    cardNumber: '**** **** **** 7890',
    cardExpiry: '05/26',
    cardType: 'Mastercard',
    issuingBank: 'Citibank',
    balance: 2500,
    allotted: 12000,
    status: 'suspended',
    nameOnCard: 'David Wilson'
  }
]

const CardManagement = () => {
  // ** States
  const [tableData, setTableData] = useState(initialCardData)
  const [addCardOpen, setAddCardOpen] = useState(false)
  const [loanCardOpen, setLoanCardOpen] = useState(false)
  const [batchUploadOpen, setBatchUploadOpen] = useState(false)
  const [loanBatchUploadOpen, setLoanBatchUploadOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [pageSize, setPageSize] = useState(10)

  // ** Filter Data
  const filteredData = tableData.filter(row => {
    const matchesSearch = searchValue
      ? row.cardNumber.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.nameOnCard.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.issuingBank.toLowerCase().includes(searchValue.toLowerCase())
      : true

    const matchesStatus = statusFilter ? row.status === statusFilter : true

    return matchesSearch && matchesStatus
  })

  // ** Add New Card
  const handleAddCard = cardData => {
    const newCard = {
      id: tableData.length + 1,
      dateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
      cardNumber: `**** **** **** ${Math.floor(Math.random() * 10000)}`,
      ...cardData,
      balance: 0,
      status: 'active'
    }
    setTableData(prev => [newCard, ...prev])
    toast.success('Card added successfully!')
  }

  // ** Loan Card
  const handleLoanCard = loanData => {
    const updatedData = tableData.map(item =>
      item.id === loanData.cardId
        ? {
            ...item,
            balance: item.balance + loanData.amount,
            allotted: item.allotted + loanData.amount
          }
        : item
    )
    setTableData(updatedData)
    toast.success(`$${loanData.amount} loaned to card successfully!`)
  }

  // ** Batch Upload Cards
  const handleBatchUpload = file => {
    setTimeout(() => {
      const mockCards = [
        {
          id: tableData.length + 1,
          dateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
          cardNumber: '**** **** **** 1111',
          cardExpiry: '12/28',
          cardType: 'Visa',
          issuingBank: 'Batch Bank',
          balance: 0,
          allotted: 5000,
          status: 'active',
          nameOnCard: 'Batch User 1'
        },
        {
          id: tableData.length + 2,
          dateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
          cardNumber: '**** **** **** 2222',
          cardExpiry: '06/27',
          cardType: 'Mastercard',
          issuingBank: 'Batch Bank',
          balance: 0,
          allotted: 5000,
          status: 'active',
          nameOnCard: 'Batch User 2'
        }
      ]
      setTableData(prev => [...mockCards, ...prev])
      toast.success(`${mockCards.length} cards uploaded successfully!`)
    }, 1500)
  }

  // ** Loan Batch Upload
  const handleLoanBatchUpload = file => {
    setTimeout(() => {
      toast.success('Loan batch uploaded successfully!')
    }, 1500)
  }

  // ** Download Card Template
  const handleDownloadCardTemplate = () => {
    const csvContent =
      'Name on Card,Card Type,Issuing Bank,Card Expiry (MM/YY),Allotted Amount (USD)\nJohn Doe,Visa,Chase Bank,12/26,10000\nJane Smith,Mastercard,Bank of America,08/25,8000'
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'card_batch_template.csv'
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Card template downloaded!')
  }

  // ** Download Loan Template
  const handleDownloadLoanTemplate = () => {
    const csvContent = 'Card ID,Loan Amount (USD),Notes\n1,5000,Monthly loan\n2,3000,Emergency loan'
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'loan_batch_template.csv'
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Loan template downloaded!')
  }

  // ** Toggle Card Status
  const handleToggleStatus = cardId => {
    const updatedData = tableData.map(item =>
      item.id === cardId ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' } : item
    )
    setTableData(updatedData)
    toast.success('Card status updated!')
  }

  // ** View Card Details
  const handleViewCard = card => {
    toast.success(`Viewing card: ${card.cardNumber}`)
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CardManagementHeader
            onAddCard={() => setAddCardOpen(true)}
            onLoanCard={() => setLoanCardOpen(true)}
            onBatchUpload={() => setBatchUploadOpen(true)}
            onLoanBatchUpload={() => setLoanBatchUploadOpen(true)}
            onDownloadCardTemplate={handleDownloadCardTemplate}
            onDownloadLoanTemplate={handleDownloadLoanTemplate}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />
        </Grid>

        <Grid item xs={12}>
          <CardTable
            data={filteredData}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
            onView={handleViewCard}
            onToggleStatus={handleToggleStatus}
          />
        </Grid>
      </Grid>

      <AddCardDialog open={addCardOpen} onClose={() => setAddCardOpen(false)} onSubmit={handleAddCard} />

      <LoanCardDialog
        open={loanCardOpen}
        onClose={() => setLoanCardOpen(false)}
        onSubmit={handleLoanCard}
        cards={tableData}
      />

      <BatchUploadDialog
        open={batchUploadOpen}
        onClose={() => setBatchUploadOpen(false)}
        onUpload={handleBatchUpload}
        onDownloadTemplate={handleDownloadCardTemplate}
        title='Upload Cards Batch'
        type='card'
      />

      <LoanBatchUploadDialog
        open={loanBatchUploadOpen}
        onClose={() => setLoanBatchUploadOpen(false)}
        onUpload={handleLoanBatchUpload}
        onDownloadTemplate={handleDownloadLoanTemplate}
      />
    </>
  )
}

export default CardManagement
