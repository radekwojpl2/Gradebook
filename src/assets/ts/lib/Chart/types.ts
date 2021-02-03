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
