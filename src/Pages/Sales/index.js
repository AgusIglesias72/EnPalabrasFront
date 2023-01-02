import { useEffect, useState } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { modes } from '../../Theme'
import Link from '@mui/material/Link'

import PaidIcon from '@mui/icons-material/Paid'
import WrongLocationIcon from '@mui/icons-material/WrongLocation'
import CancelIcon from '@mui/icons-material/Cancel'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import Header from '../../Components/Header'
import { GetAllSales } from '../../Data/GetData/DB'

const SalesTable = () => {
  const theme = useTheme()
  const colors = modes(theme.palette.mode)
  const [data, setData] = useState([])

  useEffect(() => {
    GetAllSales().then((sales) => {
      setData(sales)
    })
  }, [])

  const columns = [
    {
      field: 'estado',
      headerAlign: 'center',
      headerName: 'Estado',
      flex: 0.2,
      renderCell: ({ row: { estado } }) => {
        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="space-around"
            backgroundColor={
              (estado === 'Finalizada' && '#2e7c67') ||
              (estado === 'Pendiente Pago' && '#ffdb15') ||
              (estado === 'Pendiente Envío' && '#6870fa') ||
              (estado === 'Cancelada' && '#af3f3b') ||
              (estado === 'Rebotado' && '#a1a4ab')
            }
            borderRadius="4px"
          >
            {estado === 'Finalizada' && <CheckCircleOutlineIcon />}
            {estado === 'Pendiente Pago' && <PaidIcon />}
            {estado === 'Pendiente Envío' && <LocalShippingIcon />}
            {estado === 'Cancelada' && <CancelIcon />}
            {estado === 'Rebotado' && <WrongLocationIcon />}
          </Box>
        )
      },
    },
    {
      field: 'fecha_compra',
      headerAlign: 'center',
      headerName: 'Fecha Compra',
      type: 'date',
      flex: 0.5,
      align: 'left',
      // My input is DD/MM/YYYY but it reads it as MM/DD/YYYY
      // I want to display it as DD/MM/YYYY
      valueGetter: ({ value }) => {
        const splitted = value.split('/')
        const date = new Date(`${splitted[1]}/${splitted[0]}/${splitted[2]}`)
        return date
      },
    },
    {
      field: 'nombre',
      headerAlign: 'center',
      headerName: 'Nombre',
      flex: 0.5,
      cellClassName: 'name-column--cell',
      renderCell: ({ row: { nombre, id_orden } }) => {
        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              cursor: 'pointer',
            }}
            // onClick={() => <Link href={`/ventas/${id_orden}`} />}
          >
            <Link href={`/ventas/${id_orden}`} color="inherit" underline="none">
              {nombre}
            </Link>
          </Box>
        )
      },
    },

    {
      field: 'id_orden',
      headerAlign: 'center',
      headerName: 'ID Orden',
      flex: 0.5,

      renderCell: ({ row: { id_orden } }) => {
        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              cursor: 'pointer',
            }}
          >
            <Link href={`/ventas/${id_orden}`} color="inherit" underline="none">
              {id_orden}
            </Link>
          </Box>
        )
      },
    },
    {
      field: 'canal_venta',
      headerAlign: 'center',
      headerName: 'Canal de Venta',
      flex: 0.3,
      renderCell: ({ row: { canal_venta } }) => {
        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              ((canal_venta === 'Tienda Nube' ||
                canal_venta === 'Empretienda') &&
                colors.canales['Tienda Nube']) ||
              (canal_venta === 'Mercado Libre' &&
                colors.canales['Mercado Libre']) ||
              (canal_venta === 'Reventa' && colors.canales['Reventa']) ||
              (canal_venta === 'Empresa' && colors.canales['Empresa']) ||
              (canal_venta === 'Personal' && colors.canales['Personal']) ||
              (canal_venta === 'Regalo' && colors.canales['Regalo'])
            }
            borderRadius="4px"
          >
            <Typography
              color={
                ((canal_venta === 'Tienda Nube' ||
                  canal_venta === 'Empretienda') &&
                  'white') ||
                (canal_venta === 'Empresa' && 'white') ||
                (canal_venta === 'Reventa' && 'white') ||
                (canal_venta === 'Mercado Libre' && '#141414') ||
                (canal_venta === 'Personal' && '#141414') ||
                (canal_venta === 'Regalo' && 'white')
              }
            >
              {(canal_venta === 'Tienda Nube' ||
                canal_venta === 'Empretienda') &&
                'TN'}
              {canal_venta === 'Mercado Libre' && 'MeLi'}
              {canal_venta === 'Empresa' && canal_venta}
              {canal_venta === 'Reventa' && canal_venta}
              {canal_venta === 'Personal' && canal_venta}
              {canal_venta === 'Regalo' && canal_venta}
            </Typography>
          </Box>
        )
      },
    },
    {
      field: 'metodo_pago',
      headerName: 'Método Pago',
      description: 'Método de Pago utilizado',
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'tipo_envio',
      headerName: 'Tipo Envío',
      description: 'Tipo de Envío utilizado',
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'stock',
      headerName: 'Origen Stock',
      description: 'De dónde sale el Stock',
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'total_juegos',
      headerName: 'Total Juegos',
      description: 'Total de Juegos de la Orden',
      flex: 0.5,
      headerAlign: 'center',
      type: 'number',
      align: 'center',
    },
    {
      field: 'moneda',
      headerAlign: 'center',
      headerName: 'Moneda',
      align: 'center',
      flex: 0.3,
    },
    {
      field: 'ingresos_brutos',
      align: 'center',
      headerAlign: 'center',
      headerName: 'Total',
      type: 'number',
      valueFormatter: ({ value }) =>
        // Set to currency with . to separate decimals and , to separate thousands
        new Intl.NumberFormat('es-AR', {
          style: 'currency',
          currency: 'ARS',
        }).format(value),
      flex: 0.5,
    },
  ]

  return (
    <Box m="20px">
      <Header title="VENTAS" subtitle="Administrar Ventas" />
      <Box
        height="90vh"
        sx={{
          paddingBottom: '2rem',

          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color:
              theme.palette.mode === 'dark'
                ? colors.greenAccent[300]
                : colors.blueAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[400]} !important`,
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          // checkboxSelection
          components={{ Toolbar: GridToolbar }}
          rows={data}
          columns={columns}
          getRowId={(row) => row.id_orden}
          colum
          initialState={{
            columns: {
              columnVisibilityModel: {
                // Hide columns status and traderName, the other columns will remain visible
                metodo_pago: false,
                tipo_envio: false,
                stock: false,
              },
            },
          }}
        />
      </Box>
    </Box>
  )
}

export default SalesTable
