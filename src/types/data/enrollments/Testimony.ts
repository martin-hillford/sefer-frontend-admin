export type Testimony = {
    courseId: number | null;
    studentId: number | null;
    surveyResultId: number;
    content: string;
    name: string;
    isAnonymous : boolean;
}