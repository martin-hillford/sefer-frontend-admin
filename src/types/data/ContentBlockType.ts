export enum ContentBlockType {
    // Text defines a pure text element
    ElementText = 'ElementText',

    // Audio defines an audio element where the content property will be used as a caption
    ElementAudio = 'ElementAudio',

    // Video defines a video element where the content property will be used as a caption
    ElementVideo = 'ElementVideo',

    // YouTube defines a video element from YouTube where the content property will be
    // used as a caption
    ElementYoutube = 'ElementYoutube',

    // Image defines an image element where the content property will be used as a caption
    ElementImage = 'ElementImage',

    // YouTube defines a video element from YouTube where the content property will be
    // used as a caption
    ElementVimeo = 'ElementVimeo',

    // Link defines a link element (hyperlink to other websites)
    // The content property will be used as the link text
    ElementLink = 'ElementLink',

    // Defines an open question
    QuestionOpen = 'QuestionOpen',

    // Defines a boolean (yes/no, true/false) question
    QuestionBoolean = 'QuestionBoolean',

    // Defines multiple choice question
    QuestionMultipleChoice = 'QuestionMultipleChoice',
}
