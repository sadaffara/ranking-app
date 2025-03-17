import React, { useEffect, useState } from 'react';
import { Score, UserScoresProps } from '../types/types';
import { AccordionPanel } from '@chakra-ui/react';
import { getUserScoresList } from '../utils/helpers';

const UserScores: React.FC<UserScoresProps> = ({ isExpanded, userId }) => {

    const [userScores, setUserScores] = useState<Score[]>([]);

    useEffect(() => {
        if (isExpanded) {
            const scores = getUserScoresList(userId);
            setUserScores(scores)
        }
    }, [isExpanded]);

    return (
        <AccordionPanel pb={12}>
            {userScores.map((item) => (
                <div key={item.userId}>
                    <p>Score: {item.score}</p>
                </div>
            ))}
        </AccordionPanel>
    );
};

export default UserScores;