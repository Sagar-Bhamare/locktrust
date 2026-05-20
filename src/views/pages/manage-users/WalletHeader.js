import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const WalletHeader = ({ onCreateWallet }) => {
  return (
    <Card>
      <Box
        sx={{
          p: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Left Side: Title + Subheader */}
        <Box>
          <Typography variant='h6'>User Management</Typography>
          <Typography variant='body2' color='text.secondary'>
            Create and manage users
          </Typography>
        </Box>

        {/* Right Side: Button */}
        <Button
          variant='contained'
          onClick={onCreateWallet}
          startIcon={<Icon icon='tabler:user-plus' />}
        >
          Create User
        </Button>
      </Box>
    </Card>
  )
}

export default WalletHeader