const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const logo = require('asciiart-logo');
const config = require('./package.json');
console.log(logo(config).render());
console.log("Enter team members.")

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];

let init = () => {
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
    ]).then((answers) => {
        if (answers.job_title === "Manager") {
            let manager = new Manager(
                answers.name.trim(),
                answers.ID.trim(),
                answers.email.trim(),
                answers.office_number.trim()
            )
            team.push(manager)
            teamMember = fs.readFileSync("templates/manager.html");
        }
        if (answers.job_title === "Engineer") {
            let engineer = new Engineer(
                answers.name.trim(),
                answers.ID.trim(),
                answers.email.trim(),
                answers.github.trim()
            )
            team.push(engineer)
            teamMember = fs.readFileSync("templates/engineer.html");
        }
        if (answers.job_title === "Intern") {
            let intern = new Intern(
                answers.name.trim(),
                answers.ID.trim(),
                answers.email.trim(),
                answers.school.trim()
            )
            team.push(intern)
            teamMember = fs.readFileSync("templates/intern.html");
        }
        continueTeam();
    }).catch(error => {
        if (error.isTtyError) {
            console.log("Prompt couldn't be rendered in the current environment");
        } else {
            console.log("Error")
        }
    })
}

let continueTeam = () => {
    return inquirer.prompt([
        {
            name: "confirm_prompt",
            type: "confirm",
            message: "Enter another team member?"
        }
    ]).then((data) => {
        if (data.confirm_prompt === true) {
            console.log("Let's add new teammates")
            return init();
        } else {
            if (!fs.existsSync(OUTPUT_DIR)) {
                fs.mkdirSync(OUTPUT_DIR)
            }
            console.log("Printing html file to output folder")
            fs.writeFileSync(outputPath, render(team), "utf-8");

        }
    })
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

init();