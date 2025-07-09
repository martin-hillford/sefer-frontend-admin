import { ContentBlockType } from '../ContentBlockType';

export type CorrectedAnswer = {
    correctAnswer : string;
    isValid? : boolean;
    mentorReview : string;
    questionId : number;
    givenAnswer : string;
    questionNumber : string;
    questionHeading : string;
    questionHeader : string;
    questionText: string;
    questionType: ContentBlockType;
    questionChoices: {  [key: string]: number }[] | null | undefined
    sequenceId : number;
    id : number;
}
