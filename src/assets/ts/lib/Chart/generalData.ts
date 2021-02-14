export type chartData = {
    type: 'polarArea' | 'radar',
    labels: string[];
    datasets: {
        data :number[],
        backgroundColor?: string[];
        label?: string
    }[],
    title?: string
}

export type Student = {
    id: number,
    gender: string,
    secondLanguage: string
}

export type Students = {
    students: Student[]
}

export enum GENDER {
    MALE = 'male',
    FEMALE = 'female'
}

export enum COLOR {
    MALE = 'rgba(54,162,235, 0.6)',
    FEMALE = 'rgba(255,99,132, 0.6)'
}
