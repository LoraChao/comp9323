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

## Step1: Install "Node.js" and "npm"
For setup environment, we first need to install "Node.js" , and npm tools will be also installed simutaneously, this is for the later installment:

Go to website https://nodejs.org/en/, choose your version, we recommend the "common use version" as shown in page, and then follow the setup instuction.

## Step2: Install "React"
After "npm" is set up, we could use this to install React environment, let's start! Open your terminal and input as follows:
```
npm i react react-dom 
```
Till now, you should be able to use "npm" to start this React project, like:
```
npm start
```

## Step3: Install "yarn"
But hang on, we still need to install "yarn" tools, this is because we will use "yarn" for later package installment to make this project running functionally. 
```
npm install --global yarn
```

## Step4:Install other packages
For run this project, we still need to setup some packages:
For running scss style file.
```
yarn add sass
```
For running route code:
```
yarn add react-router-dom
```
For using some outer components library:
```
yarn add antd
yarn add @mui/material @emotion/react @emotion/styled
yarn add @mui/material @mui/styled-engine-sc styled-components
yarn add @mui/icons-material
```
For running route url which we use to make the route url much simplier:
```
yarn add -D @craco/craco
```
For realize some css style:
```
yarn install -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9 
```


### Now you could run this website successfully, enjoy it!
