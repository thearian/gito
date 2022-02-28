export type GetConfigOptions = {
    justCheck?: boolean,
    autoComplete?: boolean
}

export type CheckoutOptions = {
    branch?: string,
    orphan?: boolean,
    newBranch?: boolean,
}

export type QuestionOptions = {
    currentFolderName: string
}

export type Constants = {
    [key: string]: string
}