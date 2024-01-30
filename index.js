import inquirer from "inquirer";
import { exec } from "child_process"
import { yesno, type } from "./src/menus.js"
import { userInput } from "./src/input.js";

const typePrompt = {
    type: 'list',
    name: 'option',
    message: 'Type of the commit',
    choices: type
};

const scopePrompt = {
    type: 'list',
    name: 'option',
    message: 'Scope - What did you touch',
    choices: yesno
};

const bodyPrompt = {
    type: 'list',
    name: 'option',
    message: 'Body - Long description',
    choices: yesno
};

const footerPrompt = {
    type: 'list',
    name: 'option',
    message: 'Footer - Aditional information',
    choices: yesno
};

const modifyPrompt = {
    type: 'list',
    name: 'option',
    message: 'Is this correct?',
    choices: yesno
};


const commit = async () => {
    let message = ""
    let answer = await inquirer.prompt(typePrompt);
    if(answer.option === "other"){
        message += `${(await userInput("Enter the commit type: "))}`;
    }
    else {
        message += answer.option
    }

    const hasScope = (await inquirer.prompt(scopePrompt)).option;
    if(hasScope){
        message += `(${(await userInput("Enter the scope: "))})`;
    }
    message += ": ";
    message += await userInput("Commit short description: ")
    const hasBody = (await inquirer.prompt(bodyPrompt)).option;
    if(hasBody){
        message += `\n\n${(await userInput("Enter a short description: "))}`;
    }
    const hasFooter = (await inquirer.prompt(footerPrompt)).option;
    if(hasFooter){
        message += `\n\n${(await userInput("Enter a long description: "))}`;
    }
    return message;
}

const bootstrap = async () => {
    let correct;
    let message
    do {
        message = await commit();

        console.log("\n\n\nCOMMIT MESSAGE:\n\n")
        console.log(message)
        console.log("\n")

        correct = (await inquirer.prompt(modifyPrompt)).option
    } while (!correct);

    exec(`git commit -m '${message}'`, (err, stdout, stderr) => {
        if(err){
            console.log("Error while executing the commit");
            console.log(err)
            return;
        }
        console.log(stdout)
        console.log("Commit success");
    })
}

bootstrap()
