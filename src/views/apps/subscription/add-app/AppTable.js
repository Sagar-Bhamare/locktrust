import React from 'react'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const AppTable = ({ data, pageSize, onPageSizeChange, onEdit }) => {
  const columns = [
    {
      flex: 0.05,
      minWidth: 70,
      field: 'srNo',
      headerName: 'Sr.No',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ fontWeight: 500 }}>
          {row.srNo}
        </Typography>
      )
    },
    {
      flex: 0.25,
      minWidth: 100,
      field: 'name',
      headerName: 'Name',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ fontWeight: 500 }}>
          {row.name}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: ({ row }) => (
        <Tooltip title="Edit App">
          <IconButton size='small' onClick={() => onEdit(row)} color='primary'>
            <Icon icon='tabler:edit' fontSize={20} />
          </IconButton>
        </Tooltip>
      )
    }
  ]

  return (
    <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <DataGrid
        autoHeight
        rows={data}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[10, 25, 50, 100]}
        onPageSizeChange={onPageSizeChange}
        disableSelectionOnClick
        getRowId={(row) => row.id}
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'grey.50',
            fontWeight: 600
          },
          '& .MuiDataGrid-cell': {
            py: 2
          }
        }}
      />
    </Card>
  )
}

export default AppTable