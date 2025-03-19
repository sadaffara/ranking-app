import React, { useMemo, useState } from 'react';
import { getUsersHighestScores, processSheetData } from '../utils/helpers';
import { Score, User, UserWithHighestScore } from '../types/types';
import UserItem from '../components/userItem';
import { Accordion, Flex, useToast } from '@chakra-ui/react';
import {
    H1,
    HStack,
    VStack,
} from '@northlight/ui';
import CreateUserContainer from './createUserContainer';
import initialUsers from '../data/users'
import initialScores from '../data/scores'
import { ExcelDropzone, ExcelRow } from '../components/excelDropzone';

const UserListContainer: React.FC = () => {
    const toast = useToast();
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [scores, setScores] = useState<Score[]>(initialScores);

    const usersWithHighestScores: UserWithHighestScore[] = useMemo(() => {
        return getUsersHighestScores(users, scores);
    }, [users, scores]);

    const handleCreateUser = (name: string, score: number) => {
        const existingUser = users.find(user => user.name.toLowerCase() === name.toLowerCase());

        if (existingUser) {
            // Add new score to existing user
            setScores(prevScores => [
                ...prevScores,
                { userId: existingUser._id, score }
            ]);
        } else {
            // Create new user + score
            const newUserId = Math.max(...users.map(u => u._id)) + 1;
            const newUser: User = { _id: newUserId, name };

            setUsers(prevUsers => [...prevUsers, newUser]);
            setScores(prevScores => [
                ...prevScores,
                { userId: newUserId, score }
            ]);
        }
    };

    const handleSheetData = (data: ExcelRow[]) => {
        if (!data || !data.length) {
            toast({
                position: "top",
                variant: "solid",
                status: "error",
                title: "Empty file",
                description: `Your uploaded file is empty!`,
            });
            return;
        }

        const { updatedUsers, updatedScores } = processSheetData(data, users, scores);

        setUsers(updatedUsers);
        setScores(updatedScores);
    }

    return (
        <HStack spacing={10} align="flex-start">
            <ExcelDropzone
                onSheetDrop={handleSheetData}
                label="Import excel file here"
            />
            <VStack align="left" flex={1}>
                <Flex gap="4" justify="space-between">
                    <H1 marginBottom="4" >User List</H1>
                    <CreateUserContainer
                        onCreate={handleCreateUser}
                    />
                </Flex>
                <Accordion allowToggle>
                    {usersWithHighestScores.map(user => (
                        <UserItem
                            scores={scores}
                            key={user._id}
                            user={user} />
                    ))}
                </Accordion>
            </VStack>
        </HStack>
    );
};

export default UserListContainer;