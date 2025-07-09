interface EnrollmentSummary
{
    id : number
    creationDate : string
    studentId : number
    studentName : string
    mentorId : number | null
    isSelfStudy : boolean
    mentorName : string
    courseRevisionId : number
    courseId : number
    courseName : string
    submitted : number | null
    lessonCount : number
    nextLessonId : number | null
    nextLessonName : string
    studentLastActive : string
    isActive: boolean
    closureDate: string | null
    isCourseCompleted: boolean
    allowRetake: boolean
}
export default EnrollmentSummary;