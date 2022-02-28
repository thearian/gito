import useCommmand from "./useCommand"
import { CheckoutOptions } from "./@types"

export async function useCheckout (options: CheckoutOptions) {
    try {
        const branch = options.branch || "gito-history"
        const orphan = options.orphan || true
        const newBranch = options.newBranch || false
        await useCommmand(`git checkout ${newBranch ? "-b" : "" } ${orphan ? "--orphan" : "" } ${branch}`)
    }
    catch (error) { return error }
}

export async function useCommit (filepath: string) {
    try {
        await useCommmand(`git add ${filepath}`)
        await useCommmand(`git commit -m "${filepath}"`)
    }
    catch (error) { return error }
}

export async function useInit () {
    try {
        useCommmand("git init")
        useCommmand("git add .")
        useCommmand("git commit -m 'Initial Commit'")
    }
    catch (error) { return error }
}