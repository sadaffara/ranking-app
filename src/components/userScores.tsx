import React, { useEffect, useState } from 'react';
import { Score, UserScoresProps } from '../types/types';
import { AccordionPanel, Divider } from '@chakra-ui/react';
import { getUserScoresList } from '../utils/helpers';
import { H4 } from '@northlight/ui';

const UserScores: React.FC<UserScoresProps> = ({
    isExpanded,
    userId,
    scores,
}) => {

    const [userScores, setUserScores] = useState<Score[]>([]);

    useEffect(() => {
        if (isExpanded) {
            const userScores = getUserScoresList(userId, scores);
            setUserScores(userScores)
        }
    }, [isExpanded, scores]);

    return (
        <AccordionPanel pb={12}>
            <div>
            <Divider />
            <H4 marginBottom="2" marginTop="2">Score List:</H4>
            {userScores.map((item) => (
                <div key={item.userId}>
                    <p>{item.score}</p>
                </div>
            ))}
            </div>
        </AccordionPanel>
    );
};

export default UserScores;