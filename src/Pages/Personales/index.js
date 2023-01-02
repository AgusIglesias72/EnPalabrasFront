import { useState } from 'react'
import Header from '../../Components/Header'
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
} from '@mui/material'
import { modes } from '../../Theme'
import {
  provincias,
  paises,
  stock,
  tipoEnvio,
  moneda,
  juegos,
  metodoPago,
  canalVentaPersonal,
} from '../../Data/provincias'
import { addPersonal } from '../../Data/GetData/DB'

const Personales = () => {
  const theme = useTheme()
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const colors = modes(theme.palette.mode)
  const [failed, setFailed] = useState(false)
  const [backdrop, setBackdrop] = useState(false)
  const [snackbar, setSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [data, setData] = useState({
    fecha_compra: '',
    canal_venta: '',
    nombre: '',
    mail: '',
    dni: '',
    telefono: '',
    zip_code: '',
    ciudad: '',
    provincia: '',
    pais: '',
    tipo_envio: '',
    stock: '',
    metodo_pago: '',
    moneda: '',
    fecha_envio: '',
    fecha_pago: '',
    dcto_cupon: 0,
    dcto_metodo_pago: 0,
    dcto_cantidad: 0,
    costo_MP: 0,
    iva: 0,
    ganancias: 0,
    sirtac: 0,
    otrosImp: 0,
    plataforma: 0,
    costo_envio: 0,
    productos: [],
  })
  const [producto, setProducto] = useState([
    {
      nombre: '',
      cantidad: '',
      precio: '',
    },
    {
      nombre: '',
      cantidad: '',
      precio: '',
    },
    {
      nombre: '',
      cantidad: '',
      precio: '',
    },
  ])

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
    console.log(data)
  }

  const handleProducto = (e, index) => {
    const { name, value } = e.target
    const list = [...producto]
    list[index][name] = value
    setProducto(list)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setBackdrop(true)
    setData({
      ...data,
      fecha_compra: data.fecha_compra.split('-').reverse().join('/'),
      fecha_envio: data.fecha_envio.split('-').reverse().join('/'),
      fecha_pago: data.fecha_envio.split('-').reverse().join('/'),

      productos: producto.filter(
        (item) => item.nombre !== '' && item.cantidad > 0
      ),
    })

    if (
      data.fecha_compra === '' ||
      data.nombre === '' ||
      data.provincia === '' ||
      data.pais === '' ||
      data.tipo_envio === '' ||
      data.stock === '' ||
      data.fecha_envio === '' ||
      data.metodo_pago === '' ||
      data.moneda === '' ||
      data.fecha_pago === '' ||
      data.productos.length === 0
    ) {
      setSnackbarMessage({
        state: 'error',
        message: 'Por favor, complete todos los campos',
      })
      setBackdrop(false)
      setSnackbar(true)
      return
    }
    addPersonal(data).then((res) => {
      if (res.message === 'Success') {
        setSnackbarMessage({
          state: 'success',
          message: 'Ingresado correctamente',
        })
      } else {
        setSnackbarMessage({
          state: 'error',
          message: 'Error al ingresar',
        })
      }
    })
    setTimeout(() => {
      setBackdrop(false)
      setSnackbar(true)
    }, 1000)
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

  return (
    <Box
      m="20px"
      sx={{
        '& legend': {
          color: colors.primary[100],
        },

        '& .MuiInputLabel-shrink': {
          color: colors.primary[100],
        },
        '& .Mui-focused': {
          color: colors.primary[100],
        },
      }}
    >
      {backdrop && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {snackbar && <SnackMessage />}
      <Header
        title="Agregar Venta Personal"
        subtitle="Agrega una nueva venta personal"
      />

      <Box
        display="grid"
        gap="20px"
        gridTemplateColumns="repeat(1, minmax(0, 1fr))"
        sx={{
          '& > div': {
            gridColumn: isNonMobile ? undefined : 'span 4',
          },
        }}
      >
        <Typography variant="h5" sx={{ color: colors.blueAccent[300] }}>
          Datos del Comprador
        </Typography>

        <Box
          display="grid"
          gap="20px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            '& > div': {
              gridColumn: isNonMobile ? undefined : 'span 2',
            },
          }}
        >
          <TextField
            label="Nombre"
            name="nombre"
            value={data.nombre}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            label="Mail"
            name="mail"
            value={data.mail}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="DNI"
            name="dni"
            value={data.dni}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Telefono"
            name="telefono"
            value={data.telefono}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Codigo Postal"
            name="zip_code"
            value={data.zip_code}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Ciudad"
            name="ciudad"
            value={data.ciudad}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="provincia">Provincia</InputLabel>
            <Select
              labelId="provincia"
              id="provincia"
              name="provincia"
              value={data.provincia}
              onChange={handleChange}
              label="Provincia"
            >
              {provincias.map((provincia) => (
                <MenuItem key={provincia} value={provincia}>
                  {provincia}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="pais">Pais</InputLabel>
            <Select
              labelId="pais"
              id="pais"
              name="pais"
              value={data.pais}
              onChange={handleChange}
              label="Pais"
            >
              {paises.map((pais) => (
                <MenuItem key={pais} value={pais}>
                  {pais}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Typography variant="h5" sx={{ color: colors.blueAccent[300] }}>
          Datos de la Venta
        </Typography>
        <Box
          display="grid"
          gap="20px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            '& > div': {
              gridColumn: isNonMobile ? undefined : 'span 2',
            },
          }}
        >
          <TextField
            label="Fecha Compra"
            name="fecha_compra"
            type="date"
            value={data.fecha_compra}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            fullWidth
            required
          />

          <FormControl variant="outlined" fullWidth>
            <InputLabel id="canal_venta">Canal Venta</InputLabel>
            <Select
              labelId="Canal Venta"
              id="canal_venta"
              name="canal_venta"
              value={data.canal_venta}
              onChange={handleChange}
              label="Canal Venta"
            >
              {canalVentaPersonal.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" fullWidth>
            <InputLabel id="tipo_envio">Tipo de envio</InputLabel>
            <Select
              labelId="tipo_envio"
              id="tipo_envio"
              name="tipo_envio"
              value={data.tipo_envio}
              onChange={handleChange}
              label="Tipo de envio"
            >
              {tipoEnvio.map((tipo) => (
                <MenuItem key={tipo} value={tipo}>
                  {tipo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="stock">Stock</InputLabel>
            <Select
              labelId="stock"
              id="stock"
              name="stock"
              value={data.stock}
              onChange={handleChange}
              label="Stock"
            >
              {stock.map((stock) => (
                <MenuItem key={stock} value={stock}>
                  {stock}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" fullWidth>
            <InputLabel id="metodo_pago">Método Pago</InputLabel>
            <Select
              labelId="Metodo de pago"
              id="metodo_pago"
              name="metodo_pago"
              value={data.metodo_pago}
              onChange={handleChange}
              label="Método Pago"
            >
              {metodoPago.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" fullWidth>
            <InputLabel id="moneda">Moneda</InputLabel>
            <Select
              labelId="Moneda"
              id="moneda"
              name="moneda"
              value={data.moneda}
              onChange={handleChange}
              label="Moneda"
            >
              {moneda.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Fecha Envío"
            name="fecha_envio"
            type="date"
            value={data.fecha_envio}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            fullWidth
            required
          />

          <TextField
            label="Fecha Pago"
            name="fecha_pago"
            type="date"
            value={data.fecha_pago}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            label="Costo Envío"
            name="costo_envio"
            value={data.costo_envio}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Box>

        <Typography variant="h5" sx={{ color: colors.blueAccent[300] }}>
          Descuentos y retenciones
          <Typography sx={{ color: colors.blueAccent[300] }}>
            (por defecto son 0)
          </Typography>
        </Typography>

        <Box
          display="grid"
          columnGap="20px"
          rowGap="15px"
          gridTemplateColumns="repeat(3, minmax(0, 1fr))"
          sx={{
            '& > div': {
              gridColumn: isNonMobile ? undefined : 'span 1',
            },
          }}
        >
          <TextField
            label="Descuento Cupón"
            name="dcto_cupon"
            value={data.dcto_cupon}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <TextField
            label="Descuento Método Pago"
            name="dcto_metodo_pago"
            value={data.dcto_metodo_pago}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />

          <TextField
            label="Descuento Cantidad"
            name="dcto_cantidad"
            value={data.dcto_cantidad}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />

          <TextField
            label="Costo MP"
            name="costo_MP"
            value={data.costo_MP}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />

          <TextField
            label="IVA"
            name="iva"
            value={data.iva}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />

          <TextField
            label="Ganancias"
            name="ganancias"
            value={data.ganancias}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />

          <TextField
            label="Sirtac"
            name="sirtac"
            value={data.sirtac}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <TextField
            label="Otros Impuestos"
            name="otrosImp"
            value={data.otrosImp}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />

          <TextField
            label="Plataforma"
            name="plataforma"
            value={data.plataforma}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Box>

        <Typography variant="h5" sx={{ color: colors.blueAccent[300] }}>
          Productos
        </Typography>
        <Box
          display="grid"
          gap="20px"
          gridTemplateColumns="repeat(3, minmax(0, 1fr))"
          sx={{
            '& > div': {
              gridColumn: isNonMobile ? undefined : 'span 1',
            },
          }}
        >
          {producto.map((item, index) => (
            <>
              <FormControl key={index}>
                <InputLabel
                  sx={{
                    color: colors.primary[100],
                  }}
                >
                  Juego
                </InputLabel>
                <Select
                  type="text"
                  name="nombre"
                  label="Producto"
                  value={item.nombre}
                  onChange={(event) => handleProducto(event, index)}
                >
                  {juegos.map((juego) => (
                    <MenuItem key={juego} value={juego}>
                      {juego}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Cantidad"
                name="cantidad"
                value={item.cantidad}
                onChange={(event) => handleProducto(event, index)}
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                label="Precio"
                name="precio"
                value={item.precio}
                onChange={(event) => handleProducto(event, index)}
                variant="outlined"
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </>
          ))}
        </Box>
      </Box>

      <Button
        onClick={handleSubmit}
        color="secondary"
        variant="contained"
        sx={{
          my: '20px',
          width: '100%',
        }}
      >
        Cargar Venta
      </Button>
    </Box>
  )
}

export default Personales
