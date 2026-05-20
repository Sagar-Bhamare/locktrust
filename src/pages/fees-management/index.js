import React, { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Components
import FeeHeader from 'src/views/pages/fees-management/FeeHeader'
import IncomingFees from 'src/views/pages/fees-management/IncomingFees'
import OutgoingFees from 'src/views/pages/fees-management/OutgoingFees'
import EscrowFees from 'src/views/pages/fees-management/EscrowFees'
import TransactionLimits from 'src/views/pages/fees-management/TransactionLimits'
import OtherFees from 'src/views/pages/fees-management/OtherFees'
import UpdateFeesSection from 'src/views/pages/fees-management/UpdateFeesSection'

// ** Toast
import toast from 'react-hot-toast'

// ** Initial Fee Data
const initialFeeData = {
  incoming: {
    ach: { percentage: 1.25, fixed: 0 },
    wire: { percentage: 0, fixed: 0 },
    rtpFednow: { percentage: 1.7, fixed: 1 },
    zelle: { percentage: 1.7, fixed: 1 },
    cards: { percentage: 0, fixed: 0 },
    wallet: { percentage: 0, fixed: 0 },
    invoice: { percentage: 0, fixed: 0 },
    escrow: { percentage: 1.95, fixed: 0 },
    billPayment: { percentage: 0, fixed: 0 },
    voucher: { percentage: 0, fixed: 0 },
    check21: { percentage: 0, fixed: 0 },
    sepaPayment: { percentage: 0, fixed: 0 }
  },
  outgoing: {
    ach: { percentage: 1.25, fixed: 0 },
    wire: { percentage: 0, fixed: 0 },
    rtpFednow: { percentage: 1.75, fixed: 0 },
    zelle: { percentage: 0, fixed: 0 },
    cards: { percentage: 1.7, fixed: 0 },
    wallet: { percentage: 0, fixed: 0 },
    invoice: { percentage: 0, fixed: 0 },
    escrow: { percentage: 1.95, fixed: 0 },
    billPayment: { percentage: 0, fixed: 0 },
    voucher: { percentage: 0, fixed: 0 },
    check21: { percentage: 0, fixed: 0 },
    sepaPayment: { percentage: 0, fixed: 0 },
    escrowCancellation: { percentage: 0.25, fixed: 2.95 }
  },
  escrowTiers: [
    { min: 0, max: 5000, fee: 2.5, note: 'Ideal for small transactions' },
    { min: 5001, max: 25000, fee: 2.0, note: '' },
    { min: 25001, max: 100000, fee: 1.5, note: 'Volume discounts apply' },
    { min: 100001, max: 500000, fee: 1.0, note: '' },
    { min: 500001, max: null, fee: 0.5, note: 'Contact sales for high-value deals' }
  ],
  limits: {
    instantTransferBank: { perTransaction: 10000, currency: 'USD' },
    instantTransferCard: { perTransaction: 10000, currency: 'USD' },
    perDay: { amount: 20000, currency: 'USD' },
    perMonth: { amount: 150000, currency: 'USD' }
  },
  otherFees: {
    achReturns: 25,
    achChargebacks: 45,
    stopPayments: 35
  }
}

const Fee = () => {
  const [feeData, setFeeData] = useState(initialFeeData)
  const [isConfirmed, setIsConfirmed] = useState(false)

  // ** Update Incoming Fee
  const updateIncomingFee = (key, field, value) => {
    setFeeData(prev => ({
      ...prev,
      incoming: {
        ...prev.incoming,
        [key]: { ...prev.incoming[key], [field]: parseFloat(value) || 0 }
      }
    }))
    setIsConfirmed(false) // Reset confirmation when changes are made
  }

  // ** Update Outgoing Fee
  const updateOutgoingFee = (key, field, value) => {
    setFeeData(prev => ({
      ...prev,
      outgoing: {
        ...prev.outgoing,
        [key]: { ...prev.outgoing[key], [field]: parseFloat(value) || 0 }
      }
    }))
    setIsConfirmed(false)
  }

  // ** Update Escrow Tier
  const updateEscrowTier = (index, field, value) => {
    const updatedTiers = [...feeData.escrowTiers]
    updatedTiers[index] = {
      ...updatedTiers[index],
      [field]: field === 'fee' ? parseFloat(value) : parseInt(value) || 0
    }
    setFeeData(prev => ({ ...prev, escrowTiers: updatedTiers }))
    setIsConfirmed(false)
  }

  // ** Update Transaction Limit
  const updateLimit = (key, field, value) => {
    setFeeData(prev => ({
      ...prev,
      limits: {
        ...prev.limits,
        [key]: { ...prev.limits[key], [field]: parseFloat(value) || 0 }
      }
    }))
    setIsConfirmed(false)
  }

  // ** Update Other Fee
  const updateOtherFee = (key, value) => {
    setFeeData(prev => ({
      ...prev,
      otherFees: { ...prev.otherFees, [key]: parseFloat(value) || 0 }
    }))
    setIsConfirmed(false)
  }

  // ** Handle Update Fees
  const handleUpdateFees = () => {
    if (!isConfirmed) {
      toast.error('Please confirm that you want to assign these fees to all users except special users')
      return
    }

    // Save to all users except special users logic here
    toast.success('Fees updated successfully for all users (except special users)!')
    setIsConfirmed(false)
  }

  // ** Reset to Default
  const resetToDefault = () => {
    setFeeData(initialFeeData)
    setIsConfirmed(false)
    toast.success('Fees reset to default values!')
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <FeeHeader onReset={resetToDefault} />
        </Grid>

        <Grid item xs={12} md={6}>
          <IncomingFees data={feeData.incoming} onUpdate={updateIncomingFee} />
        </Grid>

        <Grid item xs={12} md={6}>
          <OutgoingFees data={feeData.outgoing} onUpdate={updateOutgoingFee} />
        </Grid>

        <Grid item xs={12}>
          <EscrowFees data={feeData.escrowTiers} onUpdate={updateEscrowTier} />
        </Grid>

        <Grid item xs={12}>
          <TransactionLimits data={feeData.limits} onUpdate={updateLimit} />
        </Grid>

        <Grid item xs={12}>
          <OtherFees data={feeData.otherFees} onUpdate={updateOtherFee} />
        </Grid>

        <Grid item xs={12}>
          <UpdateFeesSection isConfirmed={isConfirmed} onConfirmChange={setIsConfirmed} onUpdate={handleUpdateFees} />
        </Grid>
      </Grid>
    </>
  )
}

export default Fee
