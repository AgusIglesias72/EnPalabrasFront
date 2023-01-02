import { useState } from 'react'
import { ColorModeContext, useMode } from './Theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Topbar from './Pages/Global/Topbar'
import AppSidebar from './Pages/Global/Sidebar'
import Dashboard from './Pages/Dashboard'
import SalesTable from './Pages/Sales'
import Mayorista from './Pages/AddMayorista'
import Actualizar from './Pages/Actualizar'
import Personales from './Pages/Personales'
import Regalos from './Pages/Regalos'
import EachSale from './Pages/Sales/eachSale'

function App() {
  const { theme, colorMode } = useMode()
  const [isSidebar, setIsSidebar] = useState(true)

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="app">
            <AppSidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route key="ventas" path="/ventas" element={<SalesTable />} />
                <Route key="ventas" path="/ventas/:id" element={<EachSale />} />
                <Route
                  key="ventas"
                  path="/mayoristas"
                  element={<Mayorista />}
                />
                <Route
                  key="actualizar"
                  path="/actualizar"
                  element={<Actualizar />}
                />
                <Route
                  key="personales"
                  path="/personales"
                  element={<Personales />}
                />
                <Route key="regalos" path="/regalo" element={<Regalos />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
