const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];

// function promptUser() {
//     return inquirer.prompt([
//         {
//             name: "enter_employee",
//             type: "confirm",
//             message: "Do you want to enter a team member?",
//             default: true,
//             when: (answers) => answers.confirm_prompt === false
//         },
//         {
//             type: "input",
//             name: "name",
//             message: "Enter employee name.",
//             when: (answers) => answers.enter_employee === true
//         },
//         {
//             type: "list",
//             message: "Choose job title",
//             name: "job_title",
//             choices: ["Manager", "Engineer", "Intern"],
//         },
//         {
//             type: "input",
//             name: "ID",
//             message: "Enter employee ID.",
//         },
//         {
//             type: "input",
//             name: "email",
//             message: "Enter employee email.",
//         },
//         {
//             type: "input",
//             name: "office_number",
//             message: "Enter office number.",
//             when: (answers) => answers.job_title === "Manager"
//         },
//         {
//             type: "input",
//             name: "github",
//             message: "Enter github address.",
//             when: (answers) => answers.job_title === "Engineer"
//         },
//         {
//             type: "input",
//             name: "school",
//             message: "Enter school.",
//             when: (answers) => answers.job_title === "Intern"
//         },
//         {
//             name: "confirm_prompt",
//             type: "confirm",
//             message: "Enter another team member?"
//         }
//     ]);
// }

function promptUser() {
    return inquirer.prompt([
        {
            type: "list",
            message: "Choose job title",
            name: "job_title",
            choices: ["Manager", "Engineer", "Intern"],
        },
        // {
        //     name: "enter_employee",
        //     type: "confirm",
        //     message: "Do you want to enter a team member?",
        //     default: true,
        //     when: (answers) => answers.confirm_prompt === false
        // },
        {
            type: "input",
            name: "name",
            message: "Enter employee name.",
            // when: (answers) => answers.enter_employee === true
        },
        {
            type: "input",
            name: "ID",
            message: "Enter manager ID.",
        },
        {
            type: "input",
            name: "email",
            message: "Enter manager email.",
        },
        {
            type: "input",
            name: "office_number",
            message: "Enter office number.",
            when: (answers) => answers.job_title === "Manager"
        }
        // when: (answers) => answers.job_title === "Manager"
        // },
        // {
        //     type: "input",
        //     name: "github",
        //     message: "Enter github address.",
        //     when: (answers) => answers.job_title === "Engineer"
        // },
        // {
        //     type: "input",
        //     name: "school",
        //     message: "Enter school.",
        //     when: (answers) => answers.job_title === "Intern"
        // },
        // {
        //     name: "confirm_prompt",
        //     type: "confirm",
        //     message: "Enter another team member?"
        // }
    ]).then((answers) => {
        if (answers.job_title === "Manager") {
        let manager = new Manager(
            answers.name,
            answers.ID,
            answers.email,
            answers.office_number
        )
        team.push(manager)
        teamMember = fs.readFileSync("templates/manager.html");
        fs.writeFileSync(outputPath, render(team), "utf-8");
        }
    })
}


promptUser()

//   

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
