const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const questionPrompts = require("./lib/Question_Prompts");
const continueTeam = require("./lib/Continue_Team")
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
    questionPrompts().then((answers) => {
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
        continueTeam().then((data) => {
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
    }).catch(error => {
        if (error.isTtyError) {
            console.log("Prompt couldn't be rendered in the current environment");
        } else {
            console.log("Error")
        }
    })
}

init();