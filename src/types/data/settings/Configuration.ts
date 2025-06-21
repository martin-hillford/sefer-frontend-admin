export type Configuration = {
    backupMentorId: number;
    id: number;
    isLessonSubmissionsLimited: boolean;
    maxLessonSubmissionsPerDay: number | null;
    optimalAgeDifference: number;
    relativeAgeFactor:number;
    relativeAvailabilityFactor: number;
    sameMentorDays: number;
    studentActiveDays: number;
    studentReminderDays: number;
}

