import React from 'react';
import { Button, Flex } from "@chakra-ui/react"
import { H1 } from '@northlight/ui';

const NavMenu: React.FC = () => {

  return (
    <Flex gap="4" justify="space-between">
      <H1 marginBottom="4" >Mediatool</H1>
      <Button
      >Create user</Button>
    </Flex>
  );
};

export default NavMenu;