import { Choice } from './Choice';
import { ContentBlockType } from './ContentBlockType';

export type ContentBlock = {
    id : number,
    sequenceId : number,
    type : ContentBlockType,
    number : string,
    heading : string,
    forcePageBreak : boolean,
    url? : string,
    isMultiSelect : boolean,
    answer? : number | string
    choices? : Choice[],
    content? : string,
    isMarkDownContent : boolean;
    exactAnswer? : string;
    answerExplanation?: string;
}
