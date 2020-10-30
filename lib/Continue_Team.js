const inquirer = require("inquirer");

let continueTeam = () => {
    return inquirer.prompt([
        {
            name: "confirm_prompt",
            type: "confirm",
            message: "Enter another team member?"
        }
    ])
};

module.exports = continueTeam;