import * as prompts from "prompts"
import { existsSync } from "fs"
import { useInit } from "./useGit"
import { QuestionOptions } from "./@types"

export default async function useQuestions (options: QuestionOptions) {
    const currentFolderName = options.currentFolderName
    const hasGitRepo = existsSync(".git")

    prompts([
        {
            type: "text",
            name: "name",
            message: "Gito repo name:",
            initial: currentFolderName
        },
        {
            type: "select",
            name: "architecture",
            message: "Select gito architecture:",
            initial: 0,
            choices: [
                {
                    title: "Orphan",
                    value: "orphan",
                    description: "Commits changes in a seperated -orphan- git history",
                },
                {
                    title: "Git Inside",
                    value: "git-inside",
                    description: "Commits changes directly in the git history [Dangerous!]",
                },
                {
                    title: "Self Host",
                    value: "self-host",
                    description: "Initializes a git repo and manages it for itself",
                },
                {
                    title: "I need more information!",
                    value: "more-information-architecture",
                    description: "Select this option if you are new to Gito or Git",
                }
            ]
        },
        {
            type: prev => prev == "more-information-architecture" ? "select" : null,
            name: "architecture",
            message: "Select gito architecture:",
            initial: 0,
            choices: [
                {
                    title: "Orphan",
                    value: "orphan",
                    description:
                        `Select this if your project already has a git repo
                        and you DONT want gito to mess with your history. Using gito as a seperated tool`,
                },
                {
                    title: "Git Inside",
                    value: "git-inside",
                    description:
                        `Select this if your project already has a git repo
                        and you want gito as a git-hook to commit directly in your branch
                        Be aware! This option is DANGEROUS because it will make all your changes public
                        and increases the git repo size`
                },
                {
                    title: "Self Host",
                    value: "self-host",
                    description: 
                        `Select this if you DONT have a git repo and
                        ARE NOT GOING TO STABLISH ONE IN THE FUTUTRE.`
                },
                {
                    title: "I dont know what to do!",
                    value: "orphan",
                    description:
                        `Select me if you still dont know what to do,
                        I will select the safest arch (Orphan) for you`
                }
            ]
        },
        {
            type: prev => prev == "git-inside" && !hasGitRepo ? "select" : null,
            name: "git-repo",
            message: "You dont have a .git folder here, is it okay for me to run `git init` ?",
            initial: 0,
            choices: [
                {
                    title: "Yes",
                    value: currentFolderName
                },
                {
                    title: "No, exit and I will do it myself",
                    value: "exit"
                },
                {
                    title: "No, but wait, I will do that and then select this option to continue",
                    value: "wait"
                }
            ],
            validate: value => {
                if (value == "wait" && !existsSync(".git")) {
                    return "Please initialize a git repo AND THEN select this option, I will wait"
                }
                return true
            },
            onState: async value => {
                if (value == currentFolderName) {
                    await useInit()
                }
                if (value == "exit") {
                    process.exit()
                }
            }
        }
    ])
}