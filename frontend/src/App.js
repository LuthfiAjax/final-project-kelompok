import { ChakraProvider } from '@chakra-ui/react';
import router from './router';
import { RouterProvider } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <CookiesProvider>
      <ChakraProvider>
        <RouterProvider router={router} /> 
      </ChakraProvider>
    </CookiesProvider>
  )
}

export default App;
