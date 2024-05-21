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
        type: 'input',
        name: 'folder',
        message: 'Enter the folder name for your project (leave blank for current folder):',
        default: '.'
    },
    {
        type: 'list',
        name: 'language',
        message: 'Which language would you like to use?',
        choices: ['JavaScript', 'TypeScript']
    },
    {
        "type": "list",
        "name": "pattern",
        "message": "Which architectural pattern would you like to use?",
        "choices": [
            "Model-View-Controller (MVC) Pattern",
            "Layered Architecture Pattern (Modular)"
        ]
    },

];

inquirer.prompt(questions).then(answers => {
    const { language, pattern, folder } = answers;


    console.log(`Setting up Express boilerplate (${language}, ${pattern}) in ${folder}`);

    const patternName = (pattern === 'Model-View-Controller (MVC) Pattern') ? 'mvc' : 'ma';


    const targetPath = folder != '.' ? path.join(process.cwd(), folder) : process.cwd();
    const templatePath = path.join(__dirname, 'template', language.toLowerCase(), patternName.toLowerCase());



    if (folder != '.') {
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
