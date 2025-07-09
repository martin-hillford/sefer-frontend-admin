export interface SubtitlesFile {
    sequences: {
        number: number
        timeCode: string
        caption: string
        audioUrl: string
        audioFile: string
    }[]
    audioReferenceId: string
}