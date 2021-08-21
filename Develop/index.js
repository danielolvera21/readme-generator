// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const markdown = require('./utils/generateMarkdown.js')
// // TODO: Create an array of questions for user input
const questions = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of your project?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a project name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project.',
            validate: projectDesc => {
                if (projectDesc) {
                    return true;
                } else {
                    console.log('Please provide a description of the project!');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What languages did you use to build this project? (check all that apply.',
            choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'JQuery', 'Node.js', 'React', 'Other']
        },
        {
            type: 'input',
            name: 'install',
            message: "What are the steps required to install your project?",
        },
        {
            type: 'confirm',
            name: 'confirmScreenshot',
            message: "Would you like to add any screenshots of your project?",
            default: true
        },
        {
            type: 'input',
            name: 'screenshot',
            message: "Please provide screenshot(s) of your project.",
            when: ({ confirmScreenshot }) => {
                if (confirmScreenshot) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'contribution',
            message: "Who contributed to the project?",
        },
        {
            type: 'input',
            name: 'link',
            message: "Please provide a link to your project.",
            validate: projectLink => {
                if (projectLink) {
                    return true;
                } else {
                    console.log('Please provide a link to the project!')
                    return false;
                }
            }
        }
    ])
        .then((answers) => {
            console.log(answers)
            writeToFile("README.md", answers)
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.log(error)
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
                console.log("Something else went wrong")
            }
        });
}

questions();

// // TODO: Create a function to write README file
function writeToFile(fileName, data) {

    fs.writeFile(fileName, markdown(data), (err) => {
        if (err) throw err;
    })
}

// // TODO: Create a function to initialize app
// function init() { }

// // Function call to initialize app
// init();
