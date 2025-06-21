export type DashboardData = {
    students: Histogram | undefined | null
    submittedLessons: Histogram | undefined | null
    newStudents: Histogram | undefined | null
    newEnrollments: Histogram | undefined | null
}

export type Histogram = {
    bins : Array<string>,
    data : Array<{ interval : string, quantity : number}>,
    max : number,
    sum: number
}
