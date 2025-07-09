export type CourseProduction = {
 id: number,
 name: string,
 done: number,
 cancelled: number,
 inActive: number,
 active: number,
}

export type CourseProductionExtended = CourseProduction & {
 total : number,
 performance : number
}