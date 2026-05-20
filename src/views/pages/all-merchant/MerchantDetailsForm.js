import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import IconButton from '@mui/material/IconButton'
import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Toast
import toast from 'react-hot-toast'

const steps = ['Company Details', 'Ownership & Bank', 'Additional Information', 'Authorization & Documents']

const MerchantDetails = () => {
  const router = useRouter()
  const { id } = router.query
  const [merchant, setMerchant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    // Step 1 - Company Details
    tradingName: 'test',
    legalBusinessName: 'demo',
    emailAddress: '',
    taxIdNumber: '',
    businessTelephone: '11132131321',
    customerServicePhone: '64656546464',
    stateOfIncorporation: '',
    dateBusinessEstablished: '2016-05-12',
    businessStreetAddress: '',
    businessCity: '',
    businessState: '',
    businessPincode: '',
    mailingAddress: '',
    mailingCity: '',
    mailingState: '',
    mailingPincode: '',
    urls: '',
    industry: '',
    description1: '',
    description2: '',
    description3: '',
    description4: '',
    description5: '',
    description6: '',
    description7: '',
    description8: '',
    description9: '',
    websiteLoginYes: true,
    websiteLoginNo: false,
    websiteUsername: '',
    websitePassword: '',
    typeOfBusiness: '',
    operatingFrom: '',
    processingDescription: '',
    
    // Step 2 - Ownership
    owner1Name: '',
    owner1Percentage: '',
    owner1Since: '2016-05',
    owner1ResidenceAddress: '',
    owner1City: '',
    owner1Country: '',
    owner1Postcode: '',
    owner1PreviousAddress: '',
    owner1PreviousCity: '',
    owner1PreviousCountry: '',
    owner1PreviousPostcode: '',
    owner1SocialSecurity: '',
    owner1DateOfBirth: '2222-02-22',
    owner1MobilePhone: '',
    owner1PersonalEmail: '',
    owner1DriversLicense: '',
    owner1PassportNumber: '',
    owner1PassportCountry: '',
    
    owner2Name: '',
    owner2Percentage: '50',
    owner2Since: '',
    owner2ResidenceAddress: '',
    owner2City: '',
    owner2Country: '',
    owner2Postcode: '',
    owner2PreviousAddress: '',
    owner2PreviousCity: '',
    owner2PreviousCountry: '',
    owner2PreviousPostcode: '',
    owner2SocialSecurity: '',
    owner2DateOfBirth: '2016-05-12',
    owner2MobilePhone: '',
    owner2PersonalEmail: '',
    owner2DriversLicense: '',
    owner2PassportNumber: '',
    owner2PassportCountry: '',
    
    // Step 3 - Additional Information
    businessBankName: '',
    bankContactName: '',
    bankPhone: '',
    bankStreetAddress: '',
    bankCity: '',
    bankState: '',
    bankPostcode: '',
    checkingAccountNumber: '',
    swiftRoutingNumber: '',
    accountName: '',
    accountEstablished: '2016-05-12',
    estimatedMonthlyVolume: '',
    averageTicketAmount: '',
    highestTicketAmount: '',
    acceptedCardsBefore: 'Yes',
    previousProcessor: 'fjd',
    accountMerchantId: '1',
    yearsWithProcessor: '20',
    monthlyChargebacksCount: '',
    monthlyChargebacksAmount: '',
    everBlacklisted: 'No',
    requestedCurrencies1: '',
    requestedCurrencies2: '',
    requestedCurrencies3: '',
    requestedCurrencies4: '',
    numberOfEmployees: '45',
    convictedCrime: 'No',
    filedBankruptcy: 'No',
    regulatoryAction: 'No',
    refusedBond: 'No',
    licenseSuspended: 'No',
    shippingDetailsListed: 'Yes',
    useTelemarketing: 'No',
    useMassEmails: 'No',
    transactionProcessTime: 'At date of order',
    daysBetweenOrderShipment: 'fjdg',
    shippingMethod: 'Ground',
    shippingService: 'UPS',
    avgDaysShipmentDelivery: 'sdf',
    requireSignature: 'No',
    useFulfillmentHouse: 'No',
    business100PercentInternet: 'Yes',
    offerRecurringBilling: 'No',
    requireVirtualTerminal: 'No',
    customerSupportType: 'Both',
    customerSupportHours: '24/7',
    emailReceipt: 'Yes',
    allowPOBoxes: 'No',
    
    // Step 4 - Authorization
    contactName: 'test',
    contactEmail: 'test@test.com',
    principalSignature1: '',
    principalName1: 'test',
    principalSignature2: '',
    principalName2: 'demo',
    agreeTerms: false,
    status: '',
    remark: ''
  })

  useEffect(() => {
    const storedData = localStorage.getItem('viewMerchantData')
    if (storedData && id) {
      const data = JSON.parse(storedData)
      setMerchant(data)
      setFormData(prev => ({
        ...prev,
        legalBusinessName: data.businessName,
        tradingName: data.tradeName,
        taxIdNumber: data.taxNumber,
        businessTelephone: data.businessPhone,
        customerServicePhone: data.servicePhone,
        emailAddress: data.email
      }))
      setLoading(false)
    } else {
      router.replace('/all-merchant')
    }
  }, [id, router])

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    setActiveStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setActiveStep((prev) => prev - 1)
  }

  const handleSubmit = () => {
    toast.success(`Merchant ${merchant?.businessName} details updated successfully!`)
    localStorage.removeItem('viewMerchantData')
    router.push('/all-merchant')
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!merchant) return null

  return (
    <Box>
      {/* Header */}
      <Card sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant='h4' sx={{ fontWeight: 600, mb: 1 }}>
              Merchant Details
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {merchant.businessName} - {merchant.tradeName}
            </Typography>
          </Box>
          <Button
            variant='outlined'
            color='secondary'
            onClick={() => router.back()}
            startIcon={<Icon icon='tabler:arrow-left' />}
            sx={{ textTransform: 'none' }}
          >
            Back to List
          </Button>
        </Box>
      </Card>

      {/* Stepper */}
      <Card sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Divider sx={{ my: 3 }} />

        {/* Step 1 - Company Details */}
        {activeStep === 0 && (
          <Box>
            <Typography variant='h6' sx={{ mb: 3, fontWeight: 600 }}>Step 1: Company Details</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Company DBA (doing business as) / trading name"
                  value={formData.tradingName}
                  onChange={(e) => handleChange('tradingName', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Legal business name"
                  value={formData.legalBusinessName}
                  onChange={(e) => handleChange('legalBusinessName', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="email"
                  label="Email Address"
                  value={formData.emailAddress}
                  onChange={(e) => handleChange('emailAddress', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tax ID number"
                  value={formData.taxIdNumber}
                  onChange={(e) => handleChange('taxIdNumber', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Business telephone number"
                  value={formData.businessTelephone}
                  onChange={(e) => handleChange('businessTelephone', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Customer service phone number"
                  value={formData.customerServicePhone}
                  onChange={(e) => handleChange('customerServicePhone', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="State of Incorporation or Organization"
                  value={formData.stateOfIncorporation}
                  onChange={(e) => handleChange('stateOfIncorporation', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Date business established (MM/YY)"
                  InputLabelProps={{ shrink: true }}
                  value={formData.dateBusinessEstablished}
                  onChange={(e) => handleChange('dateBusinessEstablished', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Business street address"
                  value={formData.businessStreetAddress}
                  onChange={(e) => handleChange('businessStreetAddress', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="City"
                  value={formData.businessCity}
                  onChange={(e) => handleChange('businessCity', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="State"
                  value={formData.businessState}
                  onChange={(e) => handleChange('businessState', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Pincode"
                  value={formData.businessPincode}
                  onChange={(e) => handleChange('businessPincode', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Business mailing address"
                  value={formData.mailingAddress}
                  onChange={(e) => handleChange('mailingAddress', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="City"
                  value={formData.mailingCity}
                  onChange={(e) => handleChange('mailingCity', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="State"
                  value={formData.mailingState}
                  onChange={(e) => handleChange('mailingState', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Pincode"
                  value={formData.mailingPincode}
                  onChange={(e) => handleChange('mailingPincode', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="List of all URL's"
                  placeholder="Enter URLs separated by commas"
                  value={formData.urls}
                  onChange={(e) => handleChange('urls', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Industry"
                  value={formData.industry}
                  onChange={(e) => handleChange('industry', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={9}
                  label="Description of Product/Services"
                  value={`${formData.description1}\n${formData.description2}\n${formData.description3}\n${formData.description4}\n${formData.description5}\n${formData.description6}\n${formData.description7}\n${formData.description8}\n${formData.description9}`}
                  onChange={(e) => {
                    const lines = e.target.value.split('\n')
                    lines.forEach((line, idx) => {
                      if (idx < 9) handleChange(`description${idx + 1}`, line)
                    })
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='subtitle1' sx={{ mb: 2, fontWeight: 600 }}>Website Login Details:</Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <FormControlLabel
                    control={<Radio checked={formData.websiteLoginYes} onChange={() => { handleChange('websiteLoginYes', true); handleChange('websiteLoginNo', false) }} />}
                    label="Yes"
                  />
                  <FormControlLabel
                    control={<Radio checked={formData.websiteLoginNo} onChange={() => { handleChange('websiteLoginYes', false); handleChange('websiteLoginNo', true) }} />}
                    label="No"
                  />
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Username"
                      value={formData.websiteUsername}
                      onChange={(e) => handleChange('websiteUsername', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Password"
                      value={formData.websitePassword}
                      onChange={(e) => handleChange('websitePassword', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel>Type of business:</FormLabel>
                  <RadioGroup row value={formData.typeOfBusiness} onChange={(e) => handleChange('typeOfBusiness', e.target.value)}>
                    <FormControlLabel value="Individual" control={<Radio />} label="Individual" />
                    <FormControlLabel value="Partnership" control={<Radio />} label="Partnership" />
                    <FormControlLabel value="Corporation" control={<Radio />} label="Corporation" />
                    <FormControlLabel value="Nonprofit" control={<Radio />} label="Nonprofit" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel>Operating from:</FormLabel>
                  <RadioGroup row value={formData.operatingFrom} onChange={(e) => handleChange('operatingFrom', e.target.value)}>
                    <FormControlLabel value="Office suite" control={<Radio />} label="Office suite" />
                    <FormControlLabel value="Retail storefront" control={<Radio />} label="Retail storefront" />
                    <FormControlLabel value="Warehouse" control={<Radio />} label="Warehouse" />
                    <FormControlLabel value="Private Sector" control={<Radio />} label="Private Sector" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Describe your use of our processing/transaction services"
                  value={formData.processingDescription}
                  onChange={(e) => handleChange('processingDescription', e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Step 2 - Ownership */}
        {activeStep === 1 && (
          <Box>
            <Typography variant='h6' sx={{ mb: 3, fontWeight: 600 }}>Step 2: OWNERSHIP</Typography>
            <Typography variant='subtitle1' sx={{ mb: 2, fontWeight: 500 }}>Please list the two owners with the largest share of ownership:</Typography>
            
            {/* Owner 1 */}
            <Card sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
              <Typography variant='h6' sx={{ mb: 2 }}>Owner 1</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Owner 1 name" value={formData.owner1Name} onChange={(e) => handleChange('owner1Name', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="ownership" type="number" value={formData.owner1Percentage} onChange={(e) => handleChange('owner1Percentage', e.target.value)} InputProps={{ endAdornment: '%' }} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth type="month" label="Owner since" InputLabelProps={{ shrink: true }} value={formData.owner1Since} onChange={(e) => handleChange('owner1Since', e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' sx={{ mb: 1, fontWeight: 500 }}>Residence Address</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Current Address" value={formData.owner1ResidenceAddress} onChange={(e) => handleChange('owner1ResidenceAddress', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="City" value={formData.owner1City} onChange={(e) => handleChange('owner1City', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Country" value={formData.owner1Country} onChange={(e) => handleChange('owner1Country', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Postcode" value={formData.owner1Postcode} onChange={(e) => handleChange('owner1Postcode', e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' sx={{ mb: 1, fontWeight: 500 }}>Previous Address</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Previous Address" value={formData.owner1PreviousAddress} onChange={(e) => handleChange('owner1PreviousAddress', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="City" value={formData.owner1PreviousCity} onChange={(e) => handleChange('owner1PreviousCity', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Country" value={formData.owner1PreviousCountry} onChange={(e) => handleChange('owner1PreviousCountry', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Postcode" value={formData.owner1PreviousPostcode} onChange={(e) => handleChange('owner1PreviousPostcode', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Social Security #" value={formData.owner1SocialSecurity} onChange={(e) => handleChange('owner1SocialSecurity', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth type="date" label="Date of Birth" InputLabelProps={{ shrink: true }} value={formData.owner1DateOfBirth} onChange={(e) => handleChange('owner1DateOfBirth', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Mobile phone #" value={formData.owner1MobilePhone} onChange={(e) => handleChange('owner1MobilePhone', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth type="email" label="Personal email address" value={formData.owner1PersonalEmail} onChange={(e) => handleChange('owner1PersonalEmail', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Drivers License #" value={formData.owner1DriversLicense} onChange={(e) => handleChange('owner1DriversLicense', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Passport Number / Country of Issue" value={`${formData.owner1PassportNumber} / ${formData.owner1PassportCountry}`} onChange={(e) => {
                    const [num, country] = e.target.value.split(' / ')
                    handleChange('owner1PassportNumber', num || '')
                    handleChange('owner1PassportCountry', country || '')
                  }} />
                </Grid>
              </Grid>
            </Card>

            {/* Owner 2 */}
            <Card sx={{ p: 3, bgcolor: 'grey.50' }}>
              <Typography variant='h6' sx={{ mb: 2 }}>Owner 2</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Owner 2 name" value={formData.owner2Name} onChange={(e) => handleChange('owner2Name', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="ownership" type="number" value={formData.owner2Percentage} onChange={(e) => handleChange('owner2Percentage', e.target.value)} InputProps={{ endAdornment: '%' }} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth type="month" label="Owner since" InputLabelProps={{ shrink: true }} value={formData.owner2Since} onChange={(e) => handleChange('owner2Since', e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' sx={{ mb: 1, fontWeight: 500 }}>Residence Address</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Current Address" value={formData.owner2ResidenceAddress} onChange={(e) => handleChange('owner2ResidenceAddress', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="City" value={formData.owner2City} onChange={(e) => handleChange('owner2City', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Country" value={formData.owner2Country} onChange={(e) => handleChange('owner2Country', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Postcode" value={formData.owner2Postcode} onChange={(e) => handleChange('owner2Postcode', e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' sx={{ mb: 1, fontWeight: 500 }}>Previous Address</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Previous Address" value={formData.owner2PreviousAddress} onChange={(e) => handleChange('owner2PreviousAddress', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="City" value={formData.owner2PreviousCity} onChange={(e) => handleChange('owner2PreviousCity', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Country" value={formData.owner2PreviousCountry} onChange={(e) => handleChange('owner2PreviousCountry', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Postcode" value={formData.owner2PreviousPostcode} onChange={(e) => handleChange('owner2PreviousPostcode', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Social Security #" value={formData.owner2SocialSecurity} onChange={(e) => handleChange('owner2SocialSecurity', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth type="date" label="Date of Birth" InputLabelProps={{ shrink: true }} value={formData.owner2DateOfBirth} onChange={(e) => handleChange('owner2DateOfBirth', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Mobile phone #" value={formData.owner2MobilePhone} onChange={(e) => handleChange('owner2MobilePhone', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth type="email" label="Personal email address" value={formData.owner2PersonalEmail} onChange={(e) => handleChange('owner2PersonalEmail', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Drivers License #" value={formData.owner2DriversLicense} onChange={(e) => handleChange('owner2DriversLicense', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Passport Number / Country of Issue" value={`${formData.owner2PassportNumber} / ${formData.owner2PassportCountry}`} onChange={(e) => {
                    const [num, country] = e.target.value.split(' / ')
                    handleChange('owner2PassportNumber', num || '')
                    handleChange('owner2PassportCountry', country || '')
                  }} />
                </Grid>
              </Grid>
            </Card>
          </Box>
        )}

        {/* Step 3 - Additional Information */}
        {activeStep === 2 && (
          <Box>
            <Typography variant='h6' sx={{ mb: 3, fontWeight: 600 }}>Step 3: Bank Reference & Additional Information</Typography>
            
            {/* Bank Reference */}
            <Card sx={{ p: 3, mb: 4 }}>
              <Typography variant='h6' sx={{ mb: 2 }}>Bank Reference</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Business Bank Name" value={formData.businessBankName} onChange={(e) => handleChange('businessBankName', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Contact name" value={formData.bankContactName} onChange={(e) => handleChange('bankContactName', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Phone" value={formData.bankPhone} onChange={(e) => handleChange('bankPhone', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Bank Street Address" value={formData.bankStreetAddress} onChange={(e) => handleChange('bankStreetAddress', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="City" value={formData.bankCity} onChange={(e) => handleChange('bankCity', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="State" value={formData.bankState} onChange={(e) => handleChange('bankState', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Postcode" value={formData.bankPostcode} onChange={(e) => handleChange('bankPostcode', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Checking account # for merchant card /funds deposits" value={formData.checkingAccountNumber} onChange={(e) => handleChange('checkingAccountNumber', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="SWIFT or Routing number" value={formData.swiftRoutingNumber} onChange={(e) => handleChange('swiftRoutingNumber', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Name on your account" value={formData.accountName} onChange={(e) => handleChange('accountName', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth type="date" label="Date account established" InputLabelProps={{ shrink: true }} value={formData.accountEstablished} onChange={(e) => handleChange('accountEstablished', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Estimated Monthly Volume" value={formData.estimatedMonthlyVolume} onChange={(e) => handleChange('estimatedMonthlyVolume', e.target.value)} InputProps={{ startAdornment: '$' }} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Average Ticket Amount" value={formData.averageTicketAmount} onChange={(e) => handleChange('averageTicketAmount', e.target.value)} InputProps={{ startAdornment: '$' }} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Highest Ticket Amount" value={formData.highestTicketAmount} onChange={(e) => handleChange('highestTicketAmount', e.target.value)} InputProps={{ startAdornment: '$' }} />
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel>Have you accepted credit cards/ACH before?</FormLabel>
                    <RadioGroup row value={formData.acceptedCardsBefore} onChange={(e) => handleChange('acceptedCardsBefore', e.target.value)}>
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                {formData.acceptedCardsBefore === 'Yes' && (
                  <>
                    <Grid item xs={12} md={4}>
                      <TextField fullWidth label="If yes, name of current/former processor" value={formData.previousProcessor} onChange={(e) => handleChange('previousProcessor', e.target.value)} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField fullWidth label="Account/Merchant ID #" value={formData.accountMerchantId} onChange={(e) => handleChange('accountMerchantId', e.target.value)} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField fullWidth label="Years with this processor" value={formData.yearsWithProcessor} onChange={(e) => handleChange('yearsWithProcessor', e.target.value)} />
                    </Grid>
                  </>
                )}
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Monthly chargebacks" value={formData.monthlyChargebacksCount} onChange={(e) => handleChange('monthlyChargebacksCount', e.target.value)} InputProps={{ startAdornment: '#' }} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Monthly chargebacks amount" value={formData.monthlyChargebacksAmount} onChange={(e) => handleChange('monthlyChargebacksAmount', e.target.value)} InputProps={{ startAdornment: '$' }} />
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel>Have you EVER been blacklisted or had an account closed by MasterCard/ Visa or ACH processor?</FormLabel>
                    <RadioGroup row value={formData.everBlacklisted} onChange={(e) => handleChange('everBlacklisted', e.target.value)}>
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' sx={{ mb: 1 }}>Requested transaction currencies:</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={3}><TextField fullWidth size="small" value={formData.requestedCurrencies1} onChange={(e) => handleChange('requestedCurrencies1', e.target.value)} /></Grid>
                    <Grid item xs={12} md={3}><TextField fullWidth size="small" value={formData.requestedCurrencies2} onChange={(e) => handleChange('requestedCurrencies2', e.target.value)} /></Grid>
                    <Grid item xs={12} md={3}><TextField fullWidth size="small" value={formData.requestedCurrencies3} onChange={(e) => handleChange('requestedCurrencies3', e.target.value)} /></Grid>
                    <Grid item xs={12} md={3}><TextField fullWidth size="small" value={formData.requestedCurrencies4} onChange={(e) => handleChange('requestedCurrencies4', e.target.value)} /></Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth type="number" label="Number of Employees" value={formData.numberOfEmployees} onChange={(e) => handleChange('numberOfEmployees', e.target.value)} />
                </Grid>
              </Grid>
            </Card>

            {/* Legal Questions */}
            <Card sx={{ p: 3, mb: 4 }}>
              <Typography variant='h6' sx={{ mb: 2 }}>Legal & Compliance Questions</Typography>
              <Grid container spacing={3}>
                {[
                  { field: 'convictedCrime', label: 'Has any person on this application ever been convicted of a crime?' },
                  { field: 'filedBankruptcy', label: 'Has any person listed above filed bankruptcy in the last 10 years?' },
                  { field: 'regulatoryAction', label: 'Has any person listed above, served as an Officer, Director, or Manager of a company that was the subject of any regulatory request for investigation,action or lawsuit of any kind?' },
                  { field: 'refusedBond', label: 'Has any person listed above ever been refused a bond, or had a bond cancelled or revoked?' },
                  { field: 'licenseSuspended', label: 'Has any person listed above ever had any occupational license suspended or revoked?' }
                ].map((q) => (
                  <Grid item xs={12} key={q.field}>
                    <FormControl component="fieldset">
                      <FormLabel>{q.label}</FormLabel>
                      <RadioGroup row value={formData[q.field]} onChange={(e) => handleChange(q.field, e.target.value)}>
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                ))}
              </Grid>
            </Card>

            {/* Business Practices */}
            <Card sx={{ p: 3, mb: 4 }}>
              <Typography variant='h6' sx={{ mb: 2 }}>Business Practices</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel>Are your shipping, refund and contact details clearly listed on your website?</FormLabel>
                    <RadioGroup row value={formData.shippingDetailsListed} onChange={(e) => handleChange('shippingDetailsListed', e.target.value)}>
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel>Do you use telemarketing to contact potential customers?</FormLabel>
                    <RadioGroup row value={formData.useTelemarketing} onChange={(e) => handleChange('useTelemarketing', e.target.value)}>
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel>Do you use mass emails in any way to market your product/services?</FormLabel>
                    <RadioGroup row value={formData.useMassEmails} onChange={(e) => handleChange('useMassEmails', e.target.value)}>
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Card>

            {/* Shipping Details */}
            <Card sx={{ p: 3, mb: 4 }}>
              <Typography variant='h6' sx={{ mb: 2 }}>FOR PHYSICAL / TANGIBLE GOODS:</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel>When are credit card transactions processed?</FormLabel>
                    <RadioGroup row value={formData.transactionProcessTime} onChange={(e) => handleChange('transactionProcessTime', e.target.value)}>
                      <FormControlLabel value="At date of order" control={<Radio />} label="At date of order" />
                      <FormControlLabel value="At date of shipment" control={<Radio />} label="At date of shipment" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                {formData.transactionProcessTime === 'At date of order' && (
                  <Grid item xs={12}>
                    <TextField fullWidth label="If at date of order, how many days is it between order date and shipment date?" value={formData.daysBetweenOrderShipment} onChange={(e) => handleChange('daysBetweenOrderShipment', e.target.value)} InputProps={{ endAdornment: 'days' }} />
                  </Grid>
                )}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>How do you ship the majority of your orders?</InputLabel>
                    <Select value={formData.shippingMethod} label="How do you ship the majority of your orders?" onChange={(e) => handleChange('shippingMethod', e.target.value)}>
                      <MenuItem value="Overnight">Overnight</MenuItem>
                      <MenuItem value="2-3 day air">2-3 day air</MenuItem>
                      <MenuItem value="Ground">Ground</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>What shipping service do you typically use?</InputLabel>
                    <Select value={formData.shippingService} label="What shipping service do you typically use?" onChange={(e) => handleChange('shippingService', e.target.value)}>
                      <MenuItem value="UPS">UPS</MenuItem>
                      <MenuItem value="FedEx">FedEx</MenuItem>
                      <MenuItem value="Postal Service">Postal Service</MenuItem>
                      <MenuItem value="DHL">DHL</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="What is the average number of days from shipment to delivery?" value={formData.avgDaysShipmentDelivery} onChange={(e) => handleChange('avgDaysShipmentDelivery', e.target.value)} InputProps={{ endAdornment: 'days' }} />
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel>Do you require a signature on delivery?</FormLabel>
                    <RadioGroup row value={formData.requireSignature} onChange={(e) => handleChange('requireSignature', e.target.value)}>
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Card>

            {/* Additional Questions */}
            <Card sx={{ p: 3 }}>
              <Grid container spacing={3}>
                {[
                  { field: 'useFulfillmentHouse', label: 'Do you use a fulfillment house to take your orders or ship your products?' },
                  { field: 'business100PercentInternet', label: 'Is business 100% over the Internet?' },
                  { field: 'offerRecurringBilling', label: 'Do you offer recurring billing?' },
                  { field: 'requireVirtualTerminal', label: 'Do you require a virtual terminal?' }
                ].map((q) => (
                  <Grid item xs={12} key={q.field}>
                    <FormControl component="fieldset">
                      <FormLabel>{q.label}</FormLabel>
                      <RadioGroup row value={formData[q.field]} onChange={(e) => handleChange(q.field, e.target.value)}>
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel>What type of customer support do you offer?</FormLabel>
                    <RadioGroup row value={formData.customerSupportType} onChange={(e) => handleChange('customerSupportType', e.target.value)}>
                      <FormControlLabel value="Email" control={<Radio />} label="Email" />
                      <FormControlLabel value="Phone" control={<Radio />} label="Phone" />
                      <FormControlLabel value="Both" control={<Radio />} label="Both" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel>What are your customer support hours (check all that apply)?</FormLabel>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      {['24/7', '9 to 5', 'M-F', 'Weekends'].map((hour) => (
                        <FormControlLabel
                          key={hour}
                          control={<Checkbox checked={formData.customerSupportHours?.includes(hour)} onChange={(e) => {
                            const current = formData.customerSupportHours || ''
                            const newValue = e.target.checked ? (current ? `${current},${hour}` : hour) : current.split(',').filter(h => h !== hour).join(',')
                            handleChange('customerSupportHours', newValue)
                          }} />}
                          label={hour}
                        />
                      ))}
                    </Box>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel>Do you email a receipt upon order with contact and billing details?</FormLabel>
                    <RadioGroup row value={formData.emailReceipt} onChange={(e) => handleChange('emailReceipt', e.target.value)}>
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel>Do you allow PO Boxes in the address field?</FormLabel>
                    <RadioGroup row value={formData.allowPOBoxes} onChange={(e) => handleChange('allowPOBoxes', e.target.value)}>
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Card>
          </Box>
        )}

        {/* Step 4 - Authorization & Documents */}
        {activeStep === 3 && (
          <Box>
            <Typography variant='h6' sx={{ mb: 3, fontWeight: 600 }}>Step 4: Authorization & Documents</Typography>
            
            <Card sx={{ p: 3, mb: 4 }}>
              <Typography variant='subtitle1' sx={{ mb: 2, fontWeight: 500 }}>Details for Lock Trust</Typography>
              <Alert severity="info" sx={{ mb: 3 }}>
                Aramor uses a file management system to ensure your sensitive client and banking information remains secure.
              </Alert>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Contact Name" value={formData.contactName} onChange={(e) => handleChange('contactName', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth type="email" label="Email Address" value={formData.contactEmail} onChange={(e) => handleChange('contactEmail', e.target.value)} />
                </Grid>
              </Grid>
            </Card>

            <Card sx={{ p: 3, mb: 4 }}>
              <Typography variant='subtitle1' sx={{ mb: 2, fontWeight: 500 }}>AUTHORIZATION And ACKNOWLEDGEMENT</Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                As part of my application, the company may obtain commercial credit bureau reports on applicant companies. 
                In some instances, additional information about principals of the applicant company may be required, 
                and the company will then obtain a consumer credit report on the Principal(s) identified in this application.
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                I certify that the above information is true and correct, to the best of my knowledge.
              </Typography>
              <Typography variant='body2' sx={{ mb: 3 }}>
                I hereby authorize, without reservation, the company or an agent acting on its behalf to procure information 
                from various federal, state and other agencies which maintain public and non-public records concerning my past activities.
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Principal Signature" value={formData.principalSignature1} onChange={(e) => handleChange('principalSignature1', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Principal Name" value={formData.principalName1} onChange={(e) => handleChange('principalName1', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Principal Signature" value={formData.principalSignature2} onChange={(e) => handleChange('principalSignature2', e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Principal Name" value={formData.principalName2} onChange={(e) => handleChange('principalName2', e.target.value)} />
                </Grid>
              </Grid>
            </Card>

            <Card sx={{ p: 3, mb: 4 }}>
              <Typography variant='subtitle1' sx={{ mb: 2, fontWeight: 500 }}>Document Requirements for New Applications</Typography>
              <Typography variant='body2' sx={{ mb: 1 }}>For all Applications:</Typography>
              <Box component="ul" sx={{ mb: 3, pl: 2 }}>
                <li>Completed and signed application.</li>
                <li>Color copy of current Passport or driver's license of principal(s) – easiest to take a photo and send a color picture of the document.</li>
                <li>Past 3 months processing statements (If not a new merchant)</li>
                <li>Corporate documents: Copy of Articles of Incorporation (or equivalent). If DBA; please furnish DBA filing.</li>
                <li>Most recent 3 months bank statements</li>
                <li>Most recent utility bill</li>
                <li>Company Overview (short paragraph describing business model)</li>
              </Box>
              <Typography variant='subtitle2' sx={{ mb: 1, fontWeight: 500 }}>For Websites:</Typography>
              <Box component="ul" sx={{ mb: 3, pl: 2 }}>
                <li>Clear description of goods and services listed on site</li>
                <li>Clear pricing and currencies of each and every product and service.</li>
                <li>Terms and conditions clearly stated online.</li>
                <li>Privacy policy on site.</li>
                <li>Contact details and location of business easily found on site.</li>
                <li>Customer service email and phone number listed on website.</li>
                <li>Times listed that customer service is available.</li>
                <li>Refund policy clearly stated.</li>
                <li>Shipping policy clearly stated on order page.</li>
                <li>Display Visa and MasterCard logo's at checkout</li>
                <li>SSL on all pages where customer information is collected.</li>
              </Box>
            </Card>

            <Card sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={formData.agreeTerms} onChange={(e) => handleChange('agreeTerms', e.target.checked)} />}
                    label="I agree with all terms and conditions"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select value={formData.status} label="Status" onChange={(e) => handleChange('status', e.target.value)}>
                      <MenuItem value="">Choose...</MenuItem>
                      <MenuItem value="approved">Approved</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="rejected">Rejected</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Remark" value={formData.remark} onChange={(e) => handleChange('remark', e.target.value)} />
                </Grid>
              </Grid>
            </Card>
          </Box>
        )}

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant='outlined'
            startIcon={<Icon icon='tabler:arrow-left' />}
            sx={{ textTransform: 'none' }}
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button
              variant='contained'
              color='primary'
              onClick={handleSubmit}
              startIcon={<Icon icon='tabler:check' />}
              sx={{ textTransform: 'none' }}
            >
              Submit
            </Button>
          ) : (
            <Button
              variant='contained'
              onClick={handleNext}
              endIcon={<Icon icon='tabler:arrow-right' />}
              sx={{ textTransform: 'none' }}
            >
              Next
            </Button>
          )}
        </Box>
      </Card>
    </Box>
  )
}

export default MerchantDetails