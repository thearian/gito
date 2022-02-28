import { spawn } from "child_process";

export default function useCommmand (command: string): Promise<(...args: any[]) => void> {
    const add_cmd = spawn(command)
    return new Promise((resolve, reject) => {
        add_cmd.stdout.on("close", resolve)
        add_cmd.stdout.on("error", reject)
        add_cmd.stderr.on("data", reject)
    })
}
