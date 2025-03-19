import React from 'react'
import {
  Container,
} from '@northlight/ui'
import UserListContainer from './containers/userListContainer';

const App = () => {

  return (
    <Container maxW="6xl" padding="4" marginTop="10">
      <UserListContainer />
    </Container>
  )
}

export default App