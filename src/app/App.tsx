import './App.css';
import '@mantine/core/styles.css'
import Page from '../pages/Page'
import { MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import CartProvider from '../context/CartContext';


function App() {

  return (
    <MantineProvider theme={theme} >
      <CartProvider>
        <Page />
      </CartProvider> 
    </MantineProvider>
  )
}

export default App
