#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');


const copyRecursiveSync = (src, dest) => {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        fs.mkdirSync(dest, { recursive: true });
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
};

const questions = [
    {
        type: 'list',
        name: 'language',
        message: 'Which language would you like to use?',
        choices: ['JavaScript', 'TypeScript']
    },
    {
        type: 'list',
        name: 'pattern',
        message: 'Which pattern would you like to use?',
        choices: ['MVC (Model View Controller)',
            'MA (Modular Architecture)',
        ]
    },
    {
        type: 'input',
        name: 'folder',
        message: 'Enter the folder name for your project (leave blank for current folder):',
        default: '.'
    }
];

inquirer.prompt(questions).then(answers => {
    const { language, pattern, folder } = answers;

    const patternName = (pattern === 'MVC (Model View Controller)') ? 'mvc' : 'ma';


    const targetPath = path.join(process.cwd(), folder);
    const templatePath = path.join(__dirname, 'template', language.toLowerCase(), patternName.toLowerCase());

    try {
        fs.mkdirSync(targetPath);
    } catch (err) {
        if (err.code === 'EEXIST') {
            console.error(`The folder "${folder}" already exists. Please choose a different name.`);
            process.exit(1);
        } else {
            console.error(err);
            process.exit(1);
        }
    }

    copyRecursiveSync(templatePath, targetPath);
    console.log(`Express boilerplate (${language}, ${patternName}) has been set up in ${targetPath}!`);

    try {
        process.chdir(targetPath);
        console.log(`To get started:\n\n  cd ${folder}\n  npm install\n  npm run dev\n\nEnjoy!`);
    } catch (error) {
        console.error('Error occurred setting up the project:', error);
    }
});
