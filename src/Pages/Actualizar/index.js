import { useState } from 'react'
import {
  Box,
  Button,
  Typography,
  useTheme,
  TextField,
  Snackbar,
  Backdrop,
  CircularProgress,
  Alert,
} from '@mui/material'
import Header from '../../Components/Header'
import { modes } from '../../Theme'
import useMediaQuery from '@mui/material/useMediaQuery'
import { ordersMeli, ordersTN, udpateDB } from '../../Data/GetData/DB'

const Actualizar = () => {
  const theme = useTheme()
  const colors = modes(theme.palette.mode)
  const isNonMobile = useMediaQuery('(min-width:800px)')
  const [backdrop, setBackdrop] = useState(false)
  const [snackbar, setSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [tnOrder, setTnOrder] = useState()
  const [meliDate, setMeliDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 15))
      .toISOString()
      .split('T')[0]
  )

  const updateMeli = async (meliDate) => {
    setBackdrop(true)
    const response = await ordersMeli(meliDate)
    if (response.message === 'Success') {
      setSnackbarMessage({
        message: 'Actualización exitosa',
        state: 'success',
      })
    } else {
      setSnackbarMessage({
        message: 'Error al actualizar',
        state: 'error',
      })
    }
    setBackdrop(false)
    setSnackbar(true)
  }

  const updateTN = async (tnOrder) => {
    setBackdrop(true)
    const response = await ordersTN(tnOrder)
    if (response.message === 'Success') {
      setSnackbarMessage({
        message: 'Actualización exitosa',
        state: 'success',
      })
    } else {
      setSnackbarMessage({
        message: 'Error al actualizar',
        state: 'error',
      })
    }
    setBackdrop(false)
    setSnackbar(true)
  }

  const updateDatabase = async () => {
    setBackdrop(true)
    const response = await udpateDB()
    if (response.message === 'Success') {
      setSnackbarMessage({
        message: 'Actualización exitosa',
        state: 'success',
      })
    } else {
      setSnackbarMessage({
        message: 'Error al actualizar',
        state: 'error',
      })
    }
    setBackdrop(false)
    setSnackbar(true)
  }

  const SnackMessage = () => {
    return (
      <Snackbar
        open={snackbar}
        autoHideDuration={5000}
        onClose={() => setSnackbar(false)}
      >
        <Alert severity={snackbarMessage.state} sx={{ width: '100%' }}>
          {snackbarMessage.message}
        </Alert>
      </Snackbar>
    )
  }

  const Section = ({ title, subtitle, children }) => {
    return (
      <Box
        sx={{
          marginTop: '20px',
          //   width: '40vw',
          minWidth: '200px',
          maxWidth: '300px',
          padding: '20px',
          display: 'flex',
          gap: '20px',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor:
            theme.palette.mode === 'dark' ? colors.grey[800] : 'none',
          // colors.primary[800]
          borderRadius: '10px',
          gridColumn: isNonMobile ? 'span 2' : 'span 4',
        }}
      >
        <Box>
          <Typography
            variant="h4"
            align="center"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ m: '0 0 5px 0' }}
          >
            {title}
          </Typography>
          <Typography
            variant="h6"
            color={
              theme.palette.mode === 'dark'
                ? colors.greenAccent[600]
                : colors.grey[200]
            }
            align="center"
          >
            {subtitle}
          </Typography>
        </Box>

        {children}
      </Box>
    )
  }

  return (
    <Box
      m="20px"
      sx={{
        '& .Mui-focused': {
          color: colors.primary[100],
        },
      }}
    >
      <Header title="Actualizar" subtitle="Actualizar y Recargar Ventas" />
      {backdrop && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {snackbar && <SnackMessage />}
      <Box
        display="flex"
        flexWrap="wrap"
        mx="0"
        gap="20px"
        alignItems="space-between"
        justifyContent="space-around"
      >
        <Section
          title="Tienda Nube"
          subtitle="Actualizar las ventas de Tienda Nube (puede demorar unos minutos)"
        >
          <TextField
            label="Orden de Compra"
            type="text"
            value={tnOrder}
            name="tnOrder"
            onChange={(e) => setTnOrder(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.canales['Tienda Nube'],
              width: '60%',
            }}
            onClick={() => updateTN(tnOrder)}
          >
            Actualizar
          </Button>
        </Section>

        <Section
          title="Mercado Libre"
          subtitle="Actualizar las ventas de Mercado Libre (puede demorar unos minutos)"
        >
          <TextField
            label="Desde Fecha"
            type="date"
            value={meliDate}
            name="meliDate"
            onChange={(e) => setMeliDate(e.target.value)}
          />
          Por defecto actualiza los últimos 15 días
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.canales['Mercado Libre'],
              width: '60%',
              color: 'black',
              '&:hover': {
                color: 'white',
              },
            }}
            onClick={() => updateMeli(meliDate)}
          >
            Actualizar
          </Button>
        </Section>
        <Section
          title="Base de Datos"
          subtitle="Actualizar la base de datos (puede demorar unos minutos)"
        >
          <Typography
            variant="h6"
            color={
              theme.palette.mode === 'dark'
                ? colors.greenAccent[600]
                : colors.grey[200]
            }
            align="center"
          >
            Refresca la base de datos con la última información disponible. Hay
            que usarlo después de actualizar Mercado Libre y Tienda Nube
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.canales['Personal'],
              width: '60%',
              color: 'black',
              '&:hover': {
                color: 'white',
              },
            }}
            onClick={() => updateDatabase()}
          >
            Actualizar
          </Button>
        </Section>
      </Box>
    </Box>
  )
}

export default Actualizar
