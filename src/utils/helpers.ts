import users from '../data/users'
import scores from '../data/scores'

export const getUsersHighestScores = () =>{

    const userHighestScores: Record<number, number> = {}

    scores.forEach(({ userId, score }) => {
        if (userHighestScores[userId] === undefined || score > userHighestScores[userId]) {
          userHighestScores[userId] = score
        }
      })
      
      const usersWithHighestScores = users.map((user) => ({
        ...user,
        highestScore: userHighestScores[user._id] || 0,
      }))

      return usersWithHighestScores
      
}