// pages/dashboards/frt/index.js

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

const MerchantDashboard = () => {
  const auth = useAuth()

  const { user, hasRole } = auth || {}

  const router = useRouter()

  useEffect(() => {
    if (user && hasRole && !hasRole(['FRT', 'Admin'])) {
      router.push('/dashboards/myaccount')
    }
  }, [user, hasRole, router])

  return (
    <Box>
      <Typography variant='h4' sx={{ mb: 4 }}>
        Merchant Dashboard
      </Typography>

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant='h6'>
                Pending Approvals
              </Typography>

              <Typography variant='h3' sx={{ mt: 2 }}>
                12
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant='h6'>
                Completed Reviews
              </Typography>

              <Typography variant='h3' sx={{ mt: 2 }}>
                45
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

MerchantDashboard.acl = {
  action: 'read',
  subject: 'merchant-dashboard'
}

MerchantDashboard.guestGuard = false

export default MerchantDashboard