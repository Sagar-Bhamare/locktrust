import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const UpdateFeesSection = ({ isConfirmed, onConfirmChange, onUpdate }) => {
  return (
    <Card>
      <CardContent>
        <Alert severity='info' sx={{ mb: 3 }}>
          <Typography variant='body2' sx={{ mb: 1 }}>
            <strong>Important Note:</strong> When you update fees, they will be applied to:
          </Typography>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>✓ All regular users</li>
            <li>✗ Special users (will retain their custom fee structures)</li>
          </ul>
        </Alert>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <FormControlLabel
            control={
              <Checkbox checked={isConfirmed} onChange={e => onConfirmChange(e.target.checked)} color='primary' />
            }
            label={
              <Typography variant='body2'>
                I confirm that I want to assign these fees to <strong>all users except special users</strong>
              </Typography>
            }
          />

          <Button
            variant='contained'
            color='primary'
            size='large'
            onClick={onUpdate}
            disabled={!isConfirmed}
            startIcon={<Icon icon='tabler:device-floppy' />}
            sx={{ minWidth: 200 }}
          >
            Update Fees
          </Button>
        </Box>

        {!isConfirmed && (
          <Alert severity='warning' sx={{ mt: 3 }}>
            Please confirm the checkbox above to enable the Update Fees button
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

export default UpdateFeesSection
