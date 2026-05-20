import React, { useState } from 'react'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import ImagePreviewDialog from './ImagePreviewDialog'

// ** Toast
import toast from 'react-hot-toast'

const RemoteDepositTable = ({ data = [] }) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState({ url: '', name: '' })
  const [pageSize, setPageSize] = useState(10)

  const handleViewImage = (row) => {
    setSelectedImage({
      url: row.chequeImage,
      name: `${row.firstName} ${row.lastName}'s Cheque`
    })
    setPreviewOpen(true)
  }

  const handleDownloadImage = (row) => {
    const link = document.createElement('a')
    link.href = row.chequeImage
    link.download = `cheque_${row.firstName}_${row.lastName}_${row.id}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success(`Downloading cheque image for ${row.firstName} ${row.lastName}`)
  }

  const columns = [
    { field: 'srNo', headerName: 'SR.No', flex: 0.3, minWidth: 80 },

    { field: 'firstName', headerName: 'First Name', flex: 0.6, minWidth: 130 },

    { field: 'lastName', headerName: 'Last Name', flex: 0.6, minWidth: 130 },

    {
      field: 'address',
      headerName: 'Address',
      flex: 1,
      minWidth: 200,
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ whiteSpace: 'normal' }}>
          {row.address}
        </Typography>
      )
    },

    { field: 'city', headerName: 'City', flex: 0.5, minWidth: 120 },
    { field: 'state', headerName: 'State', flex: 0.5, minWidth: 120 },

    {
      field: 'actions',
      headerName: 'Action',
      sortable: false,
      filterable: false,
      align: 'center',
      minWidth: 140,
      renderCell: ({ row }) => (
        <Box>
          <Tooltip title='View Image'>
            <IconButton
              size='small'
              onClick={() => handleViewImage(row)}
              sx={{ color: 'info.main' }}
            >
              <Icon icon='tabler:eye' fontSize={20} />
            </IconButton>
          </Tooltip>

          <Tooltip title='Download Image'>
            <IconButton
              size='small'
              onClick={() => handleDownloadImage(row)}
              sx={{ color: 'success.main' }}
            >
              <Icon icon='tabler:download' fontSize={20} />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  return (
    <>
      <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ p: 4 }}>
          <Typography variant='h6' sx={{ fontWeight: 600 }}>
            Remote Deposit Cheques
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            View and manage uploaded cheque images
          </Typography>
        </Box>

        <DataGrid
          autoHeight
          rows={data}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 25, 50]}
          onPageSizeChange={(newSize) => setPageSize(newSize)}
          disableSelectionOnClick
          sortingOrder={['asc', 'desc']}
        />
      </Card>

      {/* Image Preview Dialog */}
      <ImagePreviewDialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        imageUrl={selectedImage.url}
        imageName={selectedImage.name}
        onDownload={() => {
          const link = document.createElement('a')
          link.href = selectedImage.url
          link.download = `${selectedImage.name.replace(/\s/g, '_')}.jpg`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          toast.success('Image downloaded successfully!')
        }}
      />
    </>
  )
}

export default RemoteDepositTable