import React from 'react';
import { UserItemProps } from '../types/types';
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, UseAccordionItemProps } from '@chakra-ui/react'
import { H4 } from '@northlight/ui';

const UserItem: React.FC<UserItemProps> = ({ user }) => {

    return (
        <AccordionItem>
            <H4>
                <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                    {user.name}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </H4>
            <AccordionPanel pb={12}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
            </AccordionPanel>
        </AccordionItem>
    );
};

export default UserItem;