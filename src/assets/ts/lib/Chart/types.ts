export type chartData = {
    type: 'polarArea' | 'radar',
    labels: string[];
    datasets: {
        data :number[],
        backgroundColor?: string[]
    }[]
}
