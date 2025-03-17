import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
    NumberInput,
    NumberInputField,
} from '@chakra-ui/react';
import { CreateUserContainerProps } from '../types/types';

const CreateUserContainer: React.FC<CreateUserContainerProps> = ({
    onCreate,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [name, setName] = useState('');
    const [score, setScore] = useState<number | ''>('');

    const handleCreate = () => {
        if (name && score !== '') {
            onCreate();  
            setName(''); 
            setScore('');
            onClose(); 
        }
    };

    return (
        <div>
            <Button
                colorScheme="blue"
                onClick={onOpen}
            >Create user</Button>
            <Modal
                size="lg"
                isOpen={isOpen}
                onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxWidth="800px">
                    <ModalHeader>Create New User</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl id="name" isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter the user's name"
                            />
                        </FormControl>

                        <FormControl id="score" isRequired mt={4}>
                            <FormLabel>Score</FormLabel>
                            <NumberInput
                                value={score}
                                onChange={(valueString) => setScore(valueString)}
                                min={0}
                            >
                                <NumberInputField
                                    placeholder="Enter the score"
                                />
                            </NumberInput>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter justifyContent="center">
                        <Button
                            colorScheme="green"
                            onClick={handleCreate}
                        >
                            Create
                        </Button>
                        <Button
                            ml="3"
                            colorScheme="gray"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default CreateUserContainer;