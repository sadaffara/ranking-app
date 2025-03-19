import { ExcelRow } from '../components/excelDropzone';
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

export const processSheetData = (
    data: ExcelRow[],
    users: User[],
    scores: Score[]
) => {
    let updatedUsers = [...users];
    let updatedScores = [...scores];

    data.forEach(({ name, score }) => {
        const existingUser = updatedUsers.find(user => user.name.toLowerCase() === name.toLowerCase());

        if (existingUser) {
            updatedScores.push({
                userId: existingUser._id,
                score
            });
        } else {
            const newUserId = updatedUsers.length
                ? Math.max(...updatedUsers.map(u => u._id)) + 1
                : 1; // Handle the case where there are no users yet
            const newUser: User = { _id: newUserId, name };

            updatedUsers.push(newUser);
            updatedScores.push({
                userId: newUserId,
                score
            });
        }
    });

    return { updatedUsers, updatedScores };
};