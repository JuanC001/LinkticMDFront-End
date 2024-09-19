import { CssBaseline } from '@mui/material'
import { AppRouter } from './Routes/AppRouter'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <div className='App'>
      <CssBaseline />
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  )
}

export default App
