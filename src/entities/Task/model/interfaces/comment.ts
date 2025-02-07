export interface IComment {
    text: string
    createdAt: Date
    replies: IComment[]
}
