import { useState } from 'react'
import { Formik, getIn } from 'formik'
import * as yup from 'yup'
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  Alert,
  InputLabel,
  MenuItem,
  OutlinedInput,
  FormControl,
  Select,
  Backdrop,
  InputAdornment,
  CircularProgress,
  useMediaQuery,
  Snackbar,
} from '@mui/material'
import Header from '../../Components/Header'
import { modes } from '../../Theme'
import {
  provincias,
  paises,
  tipoEnvio,
  stock,
  metodoPago,
  moneda,
  juegos,
} from '../../Data/provincias'
import { addMayorista } from '../../Data/GetData/DB'

const Mayorista = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const theme = useTheme()
  const colors = modes(theme.palette.mode)
  const [backdrop, setBackdrop] = useState(false)
  const [snackbar, setSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const checkoutSchema = yup.object().shape({
    fecha_compra: yup.string().required('Campo requerido'),
    canal_venta: yup.string().required('Campo requerido'),
    nombre: yup.string().required('Campo requerido'),
    mail: yup.string(),
    dni: yup.string(),
    telefono: yup.string(),
    zip_code: yup.string(),
    ciudad: yup.string(),
    provincia: yup.string().required('Campo requerido'),
    pais: yup.string().required('Campo requerido'),
    tipo_envio: yup.string().required('Campo requerido'),
    stock: yup.string().required('Campo requerido'),
    metodo_pago: yup.string().required('Campo requerido'),
    moneda: yup.string().required('Campo requerido'),
    fecha_envio: yup.string().required('Campo requerido'),
    fecha_pago: yup.string().required('Campo requerido'),
    costo_envio: yup.number(),

    producto1: yup.object().shape({
      nombre: yup.string().required('Campo requerido'),
      cantidad: yup.number().required('Campo requerido'),
      precio: yup.number().required('Campo requerido'),
    }),

    producto2: yup.object().shape({
      nombre: yup.string().required('Campo requerido'),
      cantidad: yup.number().required('Campo requerido'),
      precio: yup.number().required('Campo requerido'),
    }),
    producto3: yup.object().shape({
      nombre: yup.string().required('Campo requerido'),
      cantidad: yup.number().required('Campo requerido'),
      precio: yup.number().required('Campo requerido'),
    }),
  })

  const initialValues = {
    canal_venta: '',
    nombre: '',
    mail: '',
    dni: '',
    telefono: '',
    zip_code: '',
    ciudad: '',
    provincia: '',
    pais: 'Argentina',
    tipo_envio: '',
    stock: '',
    metodo_pago: '',
    moneda: 'ARS',
    fecha_compra: '',
    fecha_envio: '',
    fecha_pago: '',
    costo_envio: 0,
    producto1: {
      nombre: '',
      cantidad: 0,
      precio: 0,
    },
    producto2: {
      nombre: '',
      cantidad: 0,
      precio: 0,
    },
    producto3: {
      nombre: '',
      cantidad: 0,
      precio: 0,
    },
  }

  const handleFormSubmit = (values) => {
    setBackdrop(true)
    values.productos = []
    if (values.producto1.cantidad > 0) values.productos.push(values.producto1)
    if (values.producto2.cantidad > 0) values.productos.push(values.producto2)
    if (values.producto3.cantidad > 0) values.productos.push(values.producto3)

    if (
      values.fecha_compra === '' ||
      values.canal_venta === '' ||
      values.nombre === '' ||
      values.provincia === '' ||
      values.pais === '' ||
      values.tipo_envio === '' ||
      values.stock === '' ||
      values.metodo_pago === '' ||
      values.moneda === '' ||
      values.fecha_envio === '' ||
      values.fecha_pago === '' ||
      values.productos.length === 0
    ) {
      setSnackbarMessage({
        state: 'error',
        message: 'Faltan datos por completar',
      })
      setBackdrop(false)
      setSnackbar(true)
      return
    }

    addMayorista(values).then((res) => {
      if (res.message === 'Success') {
        setSnackbarMessage({
          state: 'success',
          message: 'Mayorista agregado correctamente',
        })
      } else {
        setSnackbarMessage({
          state: 'error',
          message: 'Error al ingresar el Mayorista',
        })
      }
      setBackdrop(false)
      setSnackbar(true)
    })
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
        title="Agregar Mayorista"
        subtitle="Agrega un nuevo mayorista a la base de datos"
      />
      <Formik
        // onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
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
                  type="text"
                  name="nombre"
                  label="Nombre"
                  value={values.nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.nombre && Boolean(errors.nombre)}
                  helpertext={touched.nombre && errors.nombre}
                  sx={{
                    color: colors.primary[100],
                  }}
                />
                <TextField
                  type="text"
                  name="mail"
                  label="Mail"
                  value={values.mail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.mail && Boolean(errors.mail)}
                  helpertext={touched.mail && errors.mail}
                  sx={{
                    color: colors.primary[100],
                  }}
                />
                <TextField
                  type="text"
                  name="dni"
                  label="DNI / CUIT"
                  value={values.dni}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.dni && Boolean(errors.dni)}
                  helpertext={touched.dni && errors.dni}
                  sx={{
                    color: colors.primary[100],
                  }}
                />
                <TextField
                  type="text"
                  name="telefono"
                  label="Teléfono"
                  value={values.telefono}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.telefono && Boolean(errors.telefono)}
                  helpertext={touched.telefono && errors.telefono}
                  sx={{
                    color: colors.primary[100],
                  }}
                />
                <TextField
                  type="text"
                  name="zip_code"
                  label="Código Postal"
                  value={values.zip_code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.zip_code && Boolean(errors.zip_code)}
                  helpertext={touched.zip_code && errors.zip_code}
                  sx={{
                    color: colors.primary[100],
                  }}
                />
                <TextField
                  type="text"
                  name="ciudad"
                  label="Ciudad"
                  value={values.ciudad}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.ciudad && Boolean(errors.ciudad)}
                  helpertext={touched.ciudad && errors.ciudad}
                  sx={{
                    color: colors.primary[100],
                  }}
                />

                <FormControl>
                  <InputLabel
                    sx={{
                      color: colors.primary[100],
                    }}
                  >
                    Provincia
                  </InputLabel>
                  <Select
                    type="text"
                    name="provincia"
                    label="Provincias"
                    value={values.provincia}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.provincia && Boolean(errors.provincia)}
                    helpertext={touched.provincia && errors.provincia}
                    sx={{
                      color: colors.primary[100],

                      gridColumn: 'span 4',
                    }}
                  >
                    {provincias.map((provincia) => (
                      <MenuItem key={provincia} value={provincia}>
                        {provincia}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <InputLabel
                    sx={{
                      color: colors.primary[100],
                    }}
                  >
                    País
                  </InputLabel>
                  <Select
                    type="text"
                    name="pais"
                    label="País"
                    value={values.pais}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.pais && Boolean(errors.pais)}
                    helpertext={touched.pais && errors.pais}
                    sx={{
                      color: colors.primary[100],

                      gridColumn: 'span 4',
                    }}
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
                  type="date"
                  value={values.fecha_compra}
                  name="fecha_compra"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <FormControl>
                  <InputLabel
                    sx={{
                      color: colors.primary[100],
                    }}
                  >
                    Canal de Venta
                  </InputLabel>
                  <Select
                    type="text"
                    name="canal_venta"
                    label="Canal de Venta"
                    value={values.canal_venta}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.canal_venta && Boolean(errors.canal_venta)}
                    helpertext={touched.canal_venta && errors.canal_venta}
                    sx={{
                      color: colors.primary[100],

                      gridColumn: 'span 4',
                    }}
                  >
                    <MenuItem value="Empresa">Empresa</MenuItem>
                    <MenuItem value="Reventa">Reventa</MenuItem>
                  </Select>
                </FormControl>

                <FormControl>
                  <InputLabel
                    sx={{
                      color: colors.primary[100],
                    }}
                  >
                    Tipo de Envío
                  </InputLabel>
                  <Select
                    type="text"
                    name="tipo_envio"
                    label="Tipo de Envío"
                    value={values.tipo_envio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.tipo_envio && Boolean(errors.tipo_envio)}
                    helpertext={touched.tipo_envio && errors.tipo_envio}
                    sx={{
                      color: colors.primary[100],

                      gridColumn: 'span 4',
                    }}
                  >
                    {tipoEnvio.map((envio) => (
                      <MenuItem key={envio} value={envio}>
                        {envio}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <InputLabel
                    sx={{
                      color: colors.primary[100],
                    }}
                  >
                    Stock
                  </InputLabel>
                  <Select
                    type="text"
                    name="stock"
                    label="Stock"
                    value={values.stock}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.stock && Boolean(errors.stock)}
                    helpertext={touched.stock && errors.stock}
                    sx={{
                      color: colors.primary[100],

                      gridColumn: 'span 4',
                    }}
                  >
                    {stock.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <InputLabel
                    sx={{
                      color: colors.primary[100],
                    }}
                  >
                    Método Pago
                  </InputLabel>
                  <Select
                    type="text"
                    name="metodo_pago"
                    label="Método Pago"
                    value={values.metodo_pago}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.metodo_pago && Boolean(errors.metodo_pago)}
                    helpertext={touched.metodo_pago && errors.metodo_pago}
                    sx={{
                      color: colors.primary[100],

                      gridColumn: 'span 4',
                    }}
                  >
                    {metodoPago.map((item) => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <InputLabel
                    sx={{
                      color: colors.primary[100],
                    }}
                  >
                    Moneda
                  </InputLabel>
                  <Select
                    type="text"
                    name="moneda"
                    label="Moneda"
                    value={values.moneda}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.moneda && Boolean(errors.moneda)}
                    helpertext={touched.moneda && errors.moneda}
                    sx={{
                      color: colors.primary[100],

                      gridColumn: 'span 4',
                    }}
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
                  type="date"
                  value={values.fecha_envio}
                  name="fecha_envio"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  label="Fecha Pago"
                  type="date"
                  value={values.fecha_pago}
                  name="fecha_pago"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  label="Costo Envío"
                  type="number"
                  value={values.costo_envio}
                  name="costo_envio"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                gridTemplateColumns="repeat(1, minmax(0, 1fr))"
                sx={{
                  '& > div': {
                    gridColumn: isNonMobile ? undefined : 'span 1',
                  },
                }}
              >
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
                  <FormControl>
                    <InputLabel
                      sx={{
                        color: colors.primary[100],
                      }}
                    >
                      Juego
                    </InputLabel>
                    <Select
                      type="text"
                      name="producto1.nombre"
                      label="Producto"
                      value={values.producto1.nombre}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        getIn(errors, 'producto1.nombre') &&
                          getIn(touched, 'producto1.nombre')
                      )}
                      helpertext={
                        getIn(errors, 'producto1.nombre') &&
                        getIn(touched, 'producto1.nombre')
                      }
                      sx={{
                        color: colors.primary[100],

                        gridColumn: 'span 4',
                      }}
                    >
                      {juegos.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    label="Cantidad"
                    type="number"
                    value={values.producto1.cantidad}
                    name="producto1.cantidad"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={Boolean(
                      getIn(errors, 'producto1.cantidad') &&
                        getIn(touched, 'producto1.cantidad')
                    )}
                    helpertext={
                      getIn(errors, 'producto1.cantidad') &&
                      getIn(touched, 'producto1.cantidad')
                    }
                  />

                  <TextField
                    label="Precio"
                    type="number"
                    value={values.producto1.precio}
                    name="producto1.precio"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={Boolean(
                      getIn(errors, 'producto1.precio') &&
                        getIn(touched, 'producto1.precio')
                    )}
                    helpertext={
                      getIn(errors, 'producto1.precio') &&
                      getIn(touched, 'producto1.precio')
                    }
                  />
                </Box>
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
                  <FormControl>
                    <InputLabel
                      sx={{
                        color: colors.primary[100],
                      }}
                    >
                      Juego
                    </InputLabel>
                    <Select
                      type="text"
                      name="producto2.nombre"
                      label="Producto"
                      value={values.producto2.nombre}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        getIn(errors, 'producto2.nombre') &&
                          getIn(touched, 'producto2.nombre')
                      )}
                      helpertext={
                        getIn(errors, 'producto2.nombre') &&
                        getIn(touched, 'producto2.nombre')
                      }
                      sx={{
                        color: colors.primary[100],

                        gridColumn: 'span 4',
                      }}
                    >
                      {juegos.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    label="Cantidad"
                    type="number"
                    value={values.producto2.cantidad}
                    name="producto2.cantidad"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={Boolean(
                      getIn(errors, 'producto2.cantidad') &&
                        getIn(touched, 'producto2.cantidad')
                    )}
                    helpertext={
                      getIn(errors, 'producto2.cantidad') &&
                      getIn(touched, 'producto2.cantidad')
                    }
                  />

                  <TextField
                    label="Precio"
                    type="number"
                    value={values.producto2.precio}
                    name="producto2.precio"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={Boolean(
                      getIn(errors, 'producto2.precio') &&
                        getIn(touched, 'producto2.precio')
                    )}
                    helpertext={
                      getIn(errors, 'producto2.precio') &&
                      getIn(touched, 'producto2.precio')
                    }
                  />
                </Box>

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
                  <FormControl>
                    <InputLabel
                      sx={{
                        color: colors.primary[100],
                      }}
                    >
                      Juego
                    </InputLabel>
                    <Select
                      type="text"
                      name="producto3.nombre"
                      label="Producto"
                      value={values.producto3.nombre}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        getIn(errors, 'producto3.nombre') &&
                          getIn(touched, 'producto3.nombre')
                      )}
                      helpertext={
                        getIn(errors, 'producto3.nombre') &&
                        getIn(touched, 'producto3.nombre')
                      }
                      sx={{
                        color: colors.primary[100],

                        gridColumn: 'span 4',
                      }}
                    >
                      {juegos.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    label="Cantidad"
                    type="number"
                    value={values.producto3.cantidad}
                    name="producto3.cantidad"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={Boolean(
                      getIn(errors, 'producto3.cantidad') &&
                        getIn(touched, 'producto3.cantidad')
                    )}
                    helpertext={
                      getIn(errors, 'producto3.cantidad') &&
                      getIn(touched, 'producto3.cantidad')
                    }
                  />
                  <TextField
                    label="Precio"
                    type="number"
                    value={values.producto3.precio}
                    name="producto3.precio"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={Boolean(
                      getIn(errors, 'producto3.precio') &&
                        getIn(touched, 'producto3.precio')
                    )}
                    helpertext={
                      getIn(errors, 'producto3.precio') &&
                      getIn(touched, 'producto3.precio')
                    }
                  />
                </Box>
              </Box>
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                sx={{
                  my: '20px',
                  width: '100%',
                }}
                onClick={() => handleFormSubmit(values)}
              >
                Cargar Venta
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default Mayorista
