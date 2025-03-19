import { User, Score, UserWithHighestScore } from '../types/types';

export const getUsersHighestScores = (
    users: User[],
    scores: Score[]
): UserWithHighestScore[] => {
    const userHighestScores: Record<number, number> = {};

    scores.forEach(({ userId, score }) => {
        if (
            userHighestScores[userId] === undefined ||
            score > userHighestScores[userId]
        ) {
            userHighestScores[userId] = score;
        }
    });

    const usersWithHighestScores = users.map((user) => ({
        ...user,
        highestScore: userHighestScores[user._id] || 0,
    }));

    return usersWithHighestScores;
};

export const getUserScoresList = (userId: number, scores: Score[]) => {
    return scores
        .filter((score) => score.userId === userId)
        .sort((a, b) => b.score - a.score);
};