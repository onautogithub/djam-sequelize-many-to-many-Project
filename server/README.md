// Pre-setup Express, JS REST API, mySQL, Sequelize and ES6
// I made minor modifications to setup the server. I orginzed the files in a certain struction and added additional packages to help me check my code.

  ******************* You can use this project as a start for your server side
  *****************   Or
  ***  You can follow the instructions to recreate it.

*Note: 
*** In my case, I am using mysql ***
*** I am using Vue version 2.9.6 which I installed globally

- create a directory for the project. In my case: djam-sequelize-many-to-many-Project
- Install the express-generator globally
> cd djam-sequelize-many-to-many-Project
> npm install express-generator -g
*** We will be installing the express modules locally. Let's install npx so we can run the commands
- Install npx globally (since my package installs are local, I used npx to run the various commands.)
> npm i -g npx (if file already exist, use --force)
*** I keep my code for the front end and back end separately. In my case, the backend is called server. Let's create it and initialize it
- Let's create the Express.js project with EJS using the --view-ejs option.
- From with the progject root directory: djam-sequelize-many-to-many-Project
- Let's create the Express application in the server directory:
> express server --view=ejs
> 
- Navigate to the server directory
> cd djam-sequelize-many-to-many-Project\server        

-- We need to install several additonal packages. 
-- P.S. Babel Setup for ES6
** To code in ES6 and above, you need to install babel packages: 
@babel/core @babel/node @babel/preset-env
-- P.S. I always install ESLint to statically analyze my code to quickly find problems

We can install the packages manually. However, we can just automate the process by appending the following the package.json.

- Open VSCode

**** append the following into package.json file

  "dependencies": {
    "@babel/core": "^7.17.9",
    "@babel/node": "^7.16.8",
    "@babel/preset-env": "^7.16.11",
    "body-parser": "^1.20.0",
    "cors": "^2.8.5",
    "express": "^4.18.0",
    "mysql2": "^2.3.3",
    "sequelize": "^6.19.0",
    "sequelize-cli": "^6.4.1"
  },
  "devDependencies": {
    "autoprefixer": "^7.1.2",
    "babel-eslint": "^8.2.1",
    "eslint": "^4.15.0",
    "eslint-config-standard": "^10.2.1",
    "eslint-friendly-formatter": "^3.0.0",
    "eslint-loader": "^1.7.1",
    "eslint-plugin-import": "^2.7.0",
    "eslint-plugin-node": "^5.2.0",
    "eslint-plugin-promise": "^3.4.0",
    "eslint-plugin-standard": "^3.0.1",
    "eslint-plugin-vue": "^4.0.0",
    "nodemon": "^2.0.15"
  }

    - We will install nodemon (see package under devDependencies). When we make changes, nodemon will automaticll kill and restart the server for the changes to take effort.

  - Let make the change in package.json to allow us to do so. The change below will allow us to start the server using nodemon.

  -Replace the existing code under scripts and Paste the following in the package.json file and 

    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": ""nodemon --exec babel-node server.js"",
    "dev": "nodemon server.js"
  },
  
  - Now save the package.json file and close it.

  - Let's install the packages locally in the server directory by running npm i
  > npm i --save --force

-- Configure eslint. from the server directory
> npm init @eslint/config

- Create the .babelrc file in the server root directory
- Paste the following:

- Create the .sequelizerc file in the server root directory
- Paste the following:  (P.S. I keep all my source files under the src directory)

require("@babel/register")
const path = require('path')

module.exports = {
  "config": path.resolve('./config', 'config.json'),
  "models-path": path.resolve('./src/models'),
  "seeders-path": path.resolve('./src/seeders'),
  "migrations-path": path.resolve('./src/migrations')
}

- Run the following command to create the above files and directories
> (NPX not NPM  -- Alternatively, you can run the following command:
./node_modules/.bin/sequelize)

> npx sequelize init   

The init command direct Sequelize initialization to generate config, models, seeders, and migrations files in the specified directories. 

sequelize init
That command will create `config/config.json`, `models/index.js`, `migrations`, and `seeders` directories and files. 
-- Next, open and edit `config/config.json` and paste the following in the config file. Make the modifications to reflect your database settings.

***  We use the same configuration for all the environment because we are using the same machine, server, and database for this tutorial.

**** NOTE: Before run and test connection, make sure you have created a database as described in your configuration.
{
  "development": {
    "username": "djamware",
    "password": "dj@mw@r3",
    "database": "node_sequelize",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": "dj@mw@r3",
    "database": "node_sequelize",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": "dj@mw@r3",
    "database": "node_sequelize",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}

** -- Create the .gitignore file in the server root directory and add the following:

.DS_Store
node_modules/
/dist/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln

** -- Create the editor config file in the server root directory and past the following:
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true


** -- Create the .eslintignore file in the server root directory and paste the following:
/build/
/config/
/dist/
/*.js


** -- Create the .eslintrc.js file in the server root directory and paste the following:
// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}

*************** Create a github project *****************8
- On github create a repository (in my case: djam-sequelize-many-to-many-Project
- On the command line, move up a directory (to the root of the project)
> cd ..    (you are no longer in the server directory)
git init
git add --all
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/onautogithub/djam-sequelize-many-to-many-Project.git
git push -u origin main

-- Now go on with your project