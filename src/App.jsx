import { CssBaseline } from '@mui/material'
import { AppRouter } from './Routes/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
function App() {

  return (
    <div className='App globalBg'>
      <CssBaseline />
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  )
}

export default App
