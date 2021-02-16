export interface UsersInterface {
    firstName: string,
    gender: string,
    legitimationID: string, 
    secondName: string, 
    secret: string, 
    user_id: number
}

export interface GradesInterface {
    date: string,
    grade: number,
    subject: string, 
    title: string, 
    user_id: number
}

export interface GradesArrayInterface {
    subject: string, 
    grades: number[],
    title: string[],
    date: string[] 
}
