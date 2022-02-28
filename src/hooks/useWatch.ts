import { watch } from "chokidar"
import { useCommit } from "./useGit"

export default function useWatch (files: string[]) {
    const watcher = watch(files)

    watcher.on("all", path => {
        useCommit(path)
    })

    return watcher
}