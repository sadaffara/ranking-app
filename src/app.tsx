import React from 'react'
import {
  Container,
  VStack,
  HStack,
} from '@northlight/ui'
import { ExcelDropzone, ExcelRow } from './components/excelDropzone'
import UserListContainer from './containers/userListContainer';

const App = () => {

  const handleSheetData = (data: ExcelRow[]) => {
    // replace this log with actual handling of the data
    console.log(data)
  }

  return (
      <Container maxW="6xl" padding="4" marginTop="10">
        <HStack spacing={10} align="flex-start">
          <ExcelDropzone
            onSheetDrop={handleSheetData}
            label="Import excel file here"
          />
          <VStack align="left">
            <UserListContainer/>
          </VStack>
        </HStack>
      </Container>
  )
}

export default App