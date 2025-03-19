import {
    getUsersHighestScores,
    getUserScoresList,
    processSheetData
} from '../utils/helpers';
import { User, Score } from '../types/types';
import { ExcelRow } from '../components/excelDropzone';

describe('Helper Functions', () => {

    describe('getUsersHighestScores', () => {
        it('should return users with their highest scores', () => {
            const users: User[] = [
                { _id: 1, name: 'Alice' },
                { _id: 2, name: 'Bob' }
            ];

            const scores: Score[] = [
                { userId: 1, score: 50 },
                { userId: 1, score: 100 },
                { userId: 2, score: 30 }
            ];

            const result = getUsersHighestScores(users, scores);

            expect(result).toEqual([
                { _id: 1, name: 'Alice', highestScore: 100 },
                { _id: 2, name: 'Bob', highestScore: 30 }
            ]);
        });

        it('should return highestScore as 0 if user has no scores', () => {
            const users: User[] = [
                { _id: 1, name: 'Alice' }
            ];

            const scores: Score[] = []; // no scores

            const result = getUsersHighestScores(users, scores);

            expect(result).toEqual([
                { _id: 1, name: 'Alice', highestScore: 0 }
            ]);
        });
    });

    describe('getUserScoresList', () => {
        it('should return sorted scores for a specific user', () => {
            const scores: Score[] = [
                { userId: 1, score: 50 },
                { userId: 1, score: 100 },
                { userId: 2, score: 30 }
            ];

            const result = getUserScoresList(1, scores);

            expect(result).toEqual([
                { userId: 1, score: 100 },
                { userId: 1, score: 50 }
            ]);
        });

        it('should return an empty array if the user has no scores', () => {
            const scores: Score[] = [
                { userId: 2, score: 30 }
            ];

            const result = getUserScoresList(1, scores);

            expect(result).toEqual([]);
        });
    });

    describe('processSheetData', () => {
        it('should add new scores to existing users when they are different', () => {
            const users: User[] = [{ _id: 1, name: 'Alice' }];
            const scores: Score[] = [{ userId: 1, score: 50 }];

            const data: ExcelRow[] = [{ name: 'Alice', score: 100 }];

            const { updatedUsers, updatedScores } = processSheetData(data, users, scores);

            expect(updatedUsers.length).toBe(1);
            expect(updatedScores).toEqual([
                { userId: 1, score: 50 },
                { userId: 1, score: 100 }
            ]);
        });

        it('should NOT add duplicate scores for existing users', () => {
            const users: User[] = [{ _id: 1, name: 'Alice' }];
            const scores: Score[] = [{ userId: 1, score: 100 }];

            const data: ExcelRow[] = [{ name: 'Alice', score: 100 }]; // duplicate

            const { updatedUsers, updatedScores } = processSheetData(data, users, scores);

            expect(updatedUsers.length).toBe(1);
            expect(updatedScores).toEqual([
                { userId: 1, score: 100 } // no duplicate!
            ]);
        });

        it('should create new users if they do not exist', () => {
            const users: User[] = [];
            const scores: Score[] = [];

            const data: ExcelRow[] = [{ name: 'Bob', score: 70 }];

            const { updatedUsers, updatedScores } = processSheetData(data, users, scores);

            expect(updatedUsers.length).toBe(1);
            expect(updatedUsers[0]).toEqual({ _id: 1, name: 'Bob' });

            expect(updatedScores).toEqual([
                { userId: 1, score: 70 }
            ]);
        });

        it('should handle multiple new and existing users, skipping duplicate scores', () => {
            const users: User[] = [{ _id: 1, name: 'Alice' }];
            const scores: Score[] = [{ userId: 1, score: 50 }];

            const data: ExcelRow[] = [
                { name: 'Alice', score: 50 },      // duplicate → ignored
                { name: 'Alice', score: 100 },     // new → added
                { name: 'Charlie', score: 60 }     // new user
            ];

            const { updatedUsers, updatedScores } = processSheetData(data, users, scores);

            expect(updatedUsers.length).toBe(2);
            expect(updatedUsers[1]).toEqual({ _id: 2, name: 'Charlie' });

            expect(updatedScores).toEqual([
                { userId: 1, score: 50 },    // original
                { userId: 1, score: 100 },   // added
                { userId: 2, score: 60 }     // new user score
            ]);
        });

        it('should start user IDs at 1 when there are no existing users', () => {
            const users: User[] = [];
            const scores: Score[] = [];

            const data: ExcelRow[] = [
                { name: 'NewUser', score: 80 }
            ];

            const { updatedUsers, updatedScores } = processSheetData(data, users, scores);

            expect(updatedUsers[0]).toEqual({ _id: 1, name: 'NewUser' });
            expect(updatedScores).toEqual([
                { userId: 1, score: 80 }
            ]);
        });
    });

});
