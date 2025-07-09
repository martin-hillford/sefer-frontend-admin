import { Stage } from './Stages';

export type Revision = {
    allowSelfStudy : boolean,
    generalInformation: string,
    id : number,
    predecessorId : number | null,
    stage : Stage,
    surveyId : number,
    version : number,
    courseId : number,
    movedToMarkDown? : boolean
}
