import React from 'react';
import { UserItemProps } from '../types/types';
import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    Flex,
    Text
} from '@chakra-ui/react'
import { H4 } from '@northlight/ui';
import UserScores from './userScores';

const UserItem: React.FC<UserItemProps> = ({ user, scores }) => {

    return (
        <AccordionItem marginTop="4">
            {({ isExpanded }) => (
                <div>
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
                    <UserScores
                        isExpanded={isExpanded}
                        scores={scores}
                        userId={user._id} />
                </div>
            )}
        </AccordionItem>
    );
};

export default UserItem;