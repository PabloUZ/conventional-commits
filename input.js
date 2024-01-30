import readline from "readline/promises";


export const userInput = (m) => {
    const rl = readline.createInterface(process.stdin, process.stdout)
    return new Promise((resolve, reject) => rl.question(m).then((cType) => {
        rl.close()
        resolve(cType);
    }))
}