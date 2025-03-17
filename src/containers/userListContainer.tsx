import React, { useEffect, useState } from 'react';
import { getUsersHighestScores } from '../utils/helpers';
import { UserWithHighestScore } from '../types/types';
import UserItem from '../components/userItem';
import { Accordion, Button, Flex } from '@chakra-ui/react';
import { H1 } from '@northlight/ui';

const UserListContainer: React.FC = () => {

    const [users, setUsers] = useState<UserWithHighestScore[]>([]);

    useEffect(() => {
        const usersWithHighestScores = getUsersHighestScores();
        setUsers(usersWithHighestScores)
    }, []);

    return (
        <div>
            <Flex gap="4" justify="space-between">
                <H1 marginBottom="4" >User List</H1>
                <Button
                >Create user</Button>
            </Flex>
            <Accordion allowToggle>
                {users.map((user) =>
                    (<UserItem key={user._id} user={user} />))
                }
            </Accordion>
        </div>
    );
};

export default UserListContainer;