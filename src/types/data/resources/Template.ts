export interface Template {
  name: string
  languages : {
    language: string
    title: string
    html : { id: number, layoutName: string, content: string } | undefined,
    text : { id: number, layoutName: string, content: string } | undefined
  }[]
}
