export declare type chartData = {
    type: 'polarArea' | 'radar';
    labels: string[];
    datasets: {
        data: number[];
        backgroundColor?: string[];
        label?: string;
    }[];
    title?: string;
};
export declare type Student = {
    id: number;
    gender: string;
    secondLanguage: string;
};
export declare type Students = {
    students: Student[];
};
export declare enum GENDER {
    MALE = "male",
    FEMALE = "female"
}
export declare enum COLOR {
    MALE = "rgba(54,162,235, 0.6)",
    FEMALE = "rgba(255,99,132, 0.6)"
}
