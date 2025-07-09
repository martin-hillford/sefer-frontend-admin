export type LessonBase = {
  courseRevisionId : number;
  description? : string;
  creationDate : Date;
  id : number;
  modificationDate? : Date | undefined | null;
  name : string;
  number : string
  predecessorId? : number
  readBeforeStart? : string
  sequenceId? : number
  audioReferenceId?: string | null
};
