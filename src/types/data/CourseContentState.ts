import { ContentState } from './ContentState';

export type CourseContentState = {
    courseState : ContentState;
    lessons : [
        { lessonId : number, contentState : ContentState }
    ]
}