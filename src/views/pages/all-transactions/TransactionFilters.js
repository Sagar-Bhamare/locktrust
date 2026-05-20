import React, { forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Date Picker
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import format from 'date-fns/format'

// ✅ SAME AS INVOICE
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// Custom Input
const CustomInput = forwardRef(({ value, label, ...props }, ref) => {
  return <TextField fullWidth inputRef={ref} label={label} value={value} size='small' {...props} />
})

const TransactionFilters = ({
  fromDate,
  toDate,
  searchValue,
  onFromDateChange,
  onToDateChange,
  onSearchChange,
  onReset
}) => {
  return (
    <Card>
      <CardHeader title='Filters' />

      {/* ✅ IMPORTANT WRAPPER */}
      <DatePickerWrapper>
        <Box sx={{ p: 5, pt: 0 }}>
          <Grid container spacing={4}>
            {/* ✅ FROM DATE */}
            <Grid item xs={12} sm={3}>
              <DatePicker
                selected={fromDate}
                onChange={date => onFromDateChange(date)}
                maxDate={toDate || new Date()}
                popperPlacement='bottom-start'
                customInput={<CustomInput label='From Date' value={fromDate ? format(fromDate, 'MM/dd/yyyy') : ''} />}
              />
            </Grid>

            {/* ✅ TO DATE */}
            <Grid item xs={12} sm={3}>
              <DatePicker
                selected={toDate}
                onChange={date => onToDateChange(date)}
                minDate={fromDate}
                maxDate={new Date()}
                popperPlacement='bottom-start'
                customInput={<CustomInput label='To Date' value={toDate ? format(toDate, 'MM/dd/yyyy') : ''} />}
              />
            </Grid>

            {/* SEARCH */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size='small'
                placeholder='Search by Transaction ID, Conix ID or Invoice'
                value={searchValue}
                onChange={e => onSearchChange(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon icon='tabler:search' fontSize={20} />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            {/* RESET */}
            <Grid item xs={12} sm={2}>
              <Button
                fullWidth
                variant='outlined'
                color='secondary'
                onClick={onReset}
                startIcon={<Icon icon='tabler:refresh' />}
                sx={{ height: '40px' }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DatePickerWrapper>
    </Card>
  )
}

export default TransactionFilters
