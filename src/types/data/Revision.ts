import { Stage } from './Stages';

export type Revision = {
    allowSelfStudy : boolean,
    id : number,
    predecessorId : number | null,
    stage : Stage,
    surveyId : number,
    version : number,
    courseId : number,
    movedToMarkDown? : boolean
}