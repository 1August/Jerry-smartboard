import './App.css'
import { ThemeProvider } from '@/hooks/theme-provider.tsx'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/navigation'
import { IconContext } from 'react-icons'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <IconContext.Provider value={{ size: '32' }}>
          <RouterProvider router={router} />
        </IconContext.Provider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
