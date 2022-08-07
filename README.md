# Backend
## Enviroment requirement
Python 3.6+

## Mysql
Install Mysql from https://www.mysql.com/ \
Setting parameters backend/config.py 

## Run
Install requirement
```
cd backend
pip install -r requirements.txt
```
Initialize database
```
python initialize_database.py
```
Start backend
```
python App.py
```

# Frontend
## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.


### Step1: install "npm"
For setup environment, we first need to use "npm", so let's install npm first:

### Step2: Install "npm"
After install "npm", we could use this to install React environment, let's start! Open your terminal and input as follows:
```
npm i react react-dom 
```
Till now, you should be able to use "npm" to start this React project, like:
```
npm start
```

# Step3: Install "yarn"
However we still need to setup "yarn" function, why is that? Because we will use "yarn" for later package setup to make this project running functionally. 
```
npm install --global yarn
```

# Step4:Install other packages
## For run this project, we still need to setup some packages:
### For using scss instead of common css file.
```
yarn add sass
```
### For configurate route:
```
yarn add react-router-dom
```
### For using some outer component library:
```
yarn add antd
yarn add @mui/material @emotion/react @emotion/style
yarn add @mui/material @mui/styled-engine-sc styled-components
yarn add @mui/icons-material
```
### For making route configuration much simpler:
```
yarn add -D @craco/craco
```
### For realize some css style:
```
yarn install -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9 
```

