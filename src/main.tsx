import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
    // had to turn off strictmode because it renders twice for some reason
    // <React.StrictMode>
    <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider>
      <App />
    </ChakraProvider>
    </>
  // {/* </React.StrictMode> */}
)
