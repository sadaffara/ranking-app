import React from 'react';
import { UserItemProps } from '../types/types';
import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Flex,
    Text
} from '@chakra-ui/react'
import { H4 } from '@northlight/ui';

const UserItem: React.FC<UserItemProps> = ({ user }) => {

    return (
        <AccordionItem marginTop="4">
            <H4>
                <AccordionButton>
                    <Flex align="center" justify="space-between" w="100%">
                        <Flex gap="4" align="center">
                            <Text fontWeight="bold" >{user.name}</Text>
                            <Text>-</Text>
                            <Text>Highest Score:</Text>
                            <Text color="green">{user.highestScore}</Text>
                        </Flex>

                        <AccordionIcon />
                    </Flex>
                </AccordionButton>
            </H4>
            <AccordionPanel pb={12}>
               List of user's scores
            </AccordionPanel>
        </AccordionItem>
    );
};

export default UserItem;