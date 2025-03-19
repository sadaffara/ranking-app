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

    // Process each row of the uploaded sheet data
    data.forEach(({ name, score }) => {
        const existingUser = updatedUsers.find(user => user.name.toLowerCase() === name.toLowerCase());

        if (existingUser) {
            // If user exists, add the score to their scores
            updatedScores.push({
                userId: existingUser._id,
                score
            });

            // Optionally, update the highest score if needed
            const currentHighestScore = updatedScores.filter(score => score.userId === existingUser._id)
                .reduce((max, score) => Math.max(max, score.score), 0);

            // If the new score is higher than the current highest, update the user's highest score
            if (currentHighestScore > existingUser.highestScore) {
                const updatedUser = {
                    ...existingUser,
                    highestScore: currentHighestScore,
                };

                // Update the users list with the updated user
                updatedUsers = updatedUsers.map(user =>
                    user._id === updatedUser._id ? updatedUser : user
                );
            }
        } else {
            // If user doesn't exist, create a new user and add the score
            const newUserId = Math.max(...updatedUsers.map(u => u._id)) + 1;
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