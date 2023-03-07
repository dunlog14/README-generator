const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const axios = require('axios');

const writeFileAsync = util.promisify(fs.writeFile);

// README Q's
inquirer
  .prompt([
    {
      type: 'input',
      message: 'What is the title of your project?',
      name: 'title',
    },
    {
      type: 'input',
      message: 'Please enter a description of your project:',
      name: 'description',
    },
    {
      type: 'input',
      message: 'Please enter installation instructions for your project:',
      name: 'installation',
    },
    {
      type: 'input',
      message: 'Please enter usage information for your project:',
      name: 'usage',
    },
    {
      type: 'list',
      message: 'Please choose a license for your project:',
      name: 'license',
      choices: ['MIT', 'GNU GPLv3', 'Apache License 2.0', 'ISC', 'Unlicense'],
    },
    {
      type: 'input',
      message: 'Please enter contribution guidelines for your project:',
      name: 'contributing',
    },
    {
      type: 'input',
      message: 'Please enter test instructions for your project:',
      name: 'tests',
    },
    {
        type: 'input',
        message: 'Please enter your GitHub repo link:',
        name: 'Links',
      },
    {
      type: 'input',
      message: 'Please enter your GitHub username:',
      name: 'githubUsername',
    },
    {
      type: 'input',
      message: 'Please enter your email address:',
      name: 'email',
    },
  ])
  .then((answers) => {
    // Generate the README
    const readmeContent = `# ${answers.title}
${answers.description}
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
## Installation
${answers.installation}
## Usage
${answers.usage}
## License
This project is licensed under the ${answers.license} license. [![License: ${answers.license}](https://img.shields.io/badge/License-${answers.license}-yellow.svg)](https://opensource.org/licenses/${answers.license})
## Contributing
${answers.contributing}
## Tests
${answers.tests}
## Questions
If you have any questions about the repo, open an issue or contact me directly at ${
      answers.email
    }. You can find more of my work at https://github.com/${
      answers.githubUsername
    }.`;

    // Write the README file to disk
    return writeFileAsync('README.md', readmeContent);
  })
  .then(() => {
    console.log('README.md file generated!');
  })
  .catch((err) => {
    console.error(err);
  });
  
