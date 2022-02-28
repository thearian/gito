
import { existsSync } from "fs"
import { readFile } from "fs/promises"
import { sep } from "path"
import { ERRORS, CONFIG_FILE_NAME } from "./CONSTANTS"
import useQuestions from "./useQuestions"
import { GetConfigOptions } from "./@types"

export default async function useConfig (options?: GetConfigOptions) {
    if (existsSync(CONFIG_FILE_NAME)) {
        return await readFile(CONFIG_FILE_NAME)
        .then(file => file.toJSON())
    }
    if (options?.justCheck) return new Error(ERRORS.configNotFound)

    const currentFolderName = __dirname?.split(sep).pop() || "gito"

    if (options?.autoComplete) {
        return {
            name: currentFolderName,
            architecture: "orphan",
        }
    }

    return await useQuestions({ currentFolderName })
}
