import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  Alert,
  InputLabel,
  InputAdornment,
  MenuItem,
  FormControl,
  Select,
  Backdrop,
  CircularProgress,
  useMediaQuery,
  Snackbar,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import Header from '../../Components/Header'
import { modes } from '../../Theme'
import { GetOneSale } from '../../Data/GetData/DB'

const EachSale = () => {
  const theme = useTheme()
  const colors = modes(theme.palette.mode)
  const [data, setData] = useState([])
  const [associated, setAssociated] = useState([])
  const [showPage, setShowPage] = useState('main')
  const [loading, setLoading] = useState(false)
  const id = window.location.pathname.split('/')[2]

  const handleChange = (event, newAlignment) => {
    if (newAlignment === null) return
    setShowPage(newAlignment)
  }

  useEffect(() => {
    GetOneSale(id).then((sales) => {
      setData(sales.salesValue)
      setAssociated(sales.associatedSales)
    })
  }, [id])

  const SetPage = () => {
    return (
      <ToggleButtonGroup
        color="primary"
        value={showPage}
        exclusive
        onChange={handleChange}
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          '& > .Mui-selected': {
            backgroundColor:
              theme.palette.mode === 'dark'
                ? colors.primary[400]
                : colors.grey[700],
            color: theme.palette.mode === 'dark' ? 'white' : 'black',
          },
          '& > .Mui-selected:hover': {
            backgroundColor:
              theme.palette.mode === 'dark'
                ? colors.primary[600]
                : colors.grey[800],
          },
        }}
      >
        <ToggleButton
          value="main"
          sx={{
            width: '35%',
          }}
        >
          Datos de la Venta
        </ToggleButton>
        <ToggleButton
          sx={{
            width: '35%',
          }}
          value="edit"
        >
          Editar Datos
        </ToggleButton>
      </ToggleButtonGroup>
    )
  }

  return (
    <Box m="20px">
      <Header title="Venta" subtitle="Detalle de la venta" />
      {loading && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <SetPage />
      {showPage}
      <br />
      <br />
      {JSON.stringify(data)}
      <br />
      <br />
      {JSON.stringify(associated)}
    </Box>
  )
}

export default EachSale
