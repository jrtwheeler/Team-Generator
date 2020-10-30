const inquirer = require("inquirer");

let questionPrompts = () => {
    return inquirer.prompt([
        {
            type: "list",
            message: "Choose job title",
            name: "job_title",
            choices: ["Manager", "Engineer", "Intern"],
        },
        {
            type: "input",
            name: "name",
            message: "Enter employee name.",
        },
        {
            type: "input",
            name: "ID",
            message: "Enter employee ID."
        },
        {
            type: "input",
            name: "email",
            message: "Enter employee email.",
            default: () => { },
            validate: validateEmail
        },
        {
            type: "input",
            name: "office_number",
            message: "Enter office number.",
            when: (answers) => answers.job_title === "Manager"
        },
        {
            type: "input",
            name: "github",
            message: "Enter github address.",
            when: (answers) => answers.job_title === "Engineer"
        },
        {
            type: "input",
            name: "school",
            message: "Enter school.",
            when: (answers) => answers.job_title === "Intern"
        }
    ])
}

const validateEmail = (email) => {
    valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    if (valid) {
        console.log(" - Email validated");
        return true;
    } else {
        console.log(".  Please enter a valid email")
        return false;
    }
}

module.exports = questionPrompts;