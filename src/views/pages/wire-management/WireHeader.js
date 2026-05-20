import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Dialog Components
import DomesticBeneficiaryForm from './DomesticBeneficiaryForm'
import InternationalBeneficiaryForm from './InternationalBeneficiaryForm'

const WireHeader = ({ onAddDomestic, onAddInternational, onViewWires }) => {
  const [domesticDialogOpen, setDomesticDialogOpen] = useState(false)
  const [internationalDialogOpen, setInternationalDialogOpen] = useState(false)

  const handleDomesticSubmit = data => {
    onAddDomestic(data)
    setDomesticDialogOpen(false)
  }

  const handleInternationalSubmit = data => {
    onAddInternational(data)
    setInternationalDialogOpen(false)
  }

  // ✅ Reusable Card
  const ActionCard = ({ icon, color, title, subtitle, onClick }) => (
    <Card
      sx={{
        p: 3,
        borderRadius: 2,
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        border: '1px solid',
        borderColor: 'divider',
        height: '100%',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 6
        }
      }}
      onClick={onClick}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

        {/* ICON BOX */}
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            bgcolor: `${color}.main`,   // ✅ solid color
            color: '#fff',              // ✅ white icon
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <Icon icon={icon} fontSize={24} />
        </Box>

        {/* TEXT */}
        <Box>
          <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </Card>
  )

  return (
    <>
      <Grid container spacing={4}>

        {/* Domestic */}
        <Grid item xs={12} md={4}>
          <ActionCard
            icon='tabler:user-plus'
            color='primary'
            title='ADD NEW'
            subtitle='Domestic Beneficiary'
            onClick={() => setDomesticDialogOpen(true)}
          />
        </Grid>

        {/* International */}
        <Grid item xs={12} md={4}>
          <ActionCard
            icon='tabler:users'
            color='success'
            title='ADD NEW'
            subtitle='International Beneficiary'
            onClick={() => setInternationalDialogOpen(true)}
          />
        </Grid>

        {/* View Wires */}
        <Grid item xs={12} md={4}>
          <ActionCard
            icon='tabler:transfer'
            color='warning'
            title='IN PROCESS / PROCESSED'
            subtitle='Wires'
            onClick={onViewWires}
          />
        </Grid>

      </Grid>

      {/* Dialogs */}
      <DomesticBeneficiaryForm
        open={domesticDialogOpen}
        onClose={() => setDomesticDialogOpen(false)}
        onSubmit={handleDomesticSubmit}
      />

      <InternationalBeneficiaryForm
        open={internationalDialogOpen}
        onClose={() => setInternationalDialogOpen(false)}
        onSubmit={handleInternationalSubmit}
      />
    </>
  )
}

export default WireHeader