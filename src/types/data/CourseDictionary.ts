export interface CourseDictionary {
  courseRevisionId: number;
  courseName: string
  courseId: number
  courseRevisionVersion: number
  words: Word[]
}

export interface Word {
  id: string;
  word: string | null;
  explanation: string;
  language: string;
  pictureUrl?: string;
}
