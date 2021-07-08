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
