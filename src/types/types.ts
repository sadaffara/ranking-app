
//types

export type User = {
    _id: number
    name: string
}

export type Score = {
    userId: number
    score: number
}

export type UserWithHighestScore = {
    _id: number
    name: string
    highestScore: number
}


//interfaces

export interface UserItemProps {
    user: UserWithHighestScore
}

export interface UserScoresProps {
    isExpanded: boolean;
    userId: number;
}

export interface CreateUserContainerProps {
    onCreate: () => void;
}