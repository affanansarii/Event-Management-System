import logo from './logo.svg';
import './App.css';
import { Box, ChakraProvider, Heading } from '@chakra-ui/react';
import EmployeeTable from './components/EmployeeTable';
import MOCK_DATA from './data/MOCK_DATA.json';

function App() {

  return (

    <ChakraProvider>

      <Box p={8}>

        <EmployeeTable data={MOCK_DATA} />

      </Box>

    </ChakraProvider>

  );

}

export default App;
