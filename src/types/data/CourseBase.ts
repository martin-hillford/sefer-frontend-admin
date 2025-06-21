import { Stage } from './Stages';

/**
 * CourseBase is the basic structure of a course sent by the backend
 */
export type CourseBase = CoursePost & {
    headerImage: string
    thumbnailImage: string
    largeImage: string
}

// CoursePost is used to send a new / edit course to the backend and omitting the images
export type CoursePost = {
    author: string
    copyright: string
    copyrightLogo: string
    description: string
    hasWebshopLink: boolean
    id: number
    isVideoCourse: boolean
    level: string
    maxLessonSubmissionsPerDay? : number | undefined
    name: string
    permalink: string
    private: boolean
    showOnHomepage: boolean
    stage: Stage
    webshopLink: string | null
    citation?: string
    introductionLink?: null | undefined | string
    language?: string | undefined
}
