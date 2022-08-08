# User guide for COMP9323 group Github is saivor

## Enviroment requirement
Python 3.6+
Npm
# Backend
## Database Server
This project is using local MySQL database, therefore you need to have your MySQL server running on your computer before running the project.
### Download MySQL Community Server.
For Windows users, follow steps in https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/windows-installation.html  
For Mac users, follow steps in https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/macos-installation-pkg.html  


## Run
Go to the configuration of system in ./backend/config.py and change following value as you need.

DB_ACCOUNT: The username of database  
DB_PASSWORD: The password for database user  
DB_NAME: The database name on the database server  
DB_URL: The host name of database  
DB_PORT: The running port of database  

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
## note:  
Server running on 127.0.0.1/5000  
To specify running port, change port number in file app.py  
last line: app.run(debug=True, port=XXXX), where XXXX is your prefer port number  
open 127.0.0.1/5000 in the browser to check swagger document  
You can click each API to check the description of it  
You can also find a detailed json file at top left corner of 127.0.0.1/5000
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
```
For running route url which we use to make the route url much simplier:
```
yarn add -D @craco/craco
```
For realize some css style:
```
yarn install -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9 
```

## Step5: Run the project!
Now go to your project directory, and run the code:
```
cd project
yarn start
```
Now your browser should open http://localhost:3000/Individual_Home automatically, and this is the entrance of our website as a visitor. 

### Now you could run this website successfully, enjoy it!

# Brief introduction of all pages of our website.

## Pages for individual users

### http://localhost:3000/login  http://localhost:3000/signup
These two pages provide the basis for individual as they can only get customized recommendations when they are logged in. Cookie was implemented to store login status, userid and usertype (individual or organizational user). If you manually type this url it checks whether you have logged in or not, if not logged in, it works normally, otherwise it redirects you to profile page for individual users or to organization homepage for organization users. The source js and scss scripts can be found in /src/pages/Login and /src/pages/Signup.

### 'http://localhost:3000/Individual_Home' 
This page shows individual users customized recommendation of contents including article, job, organizations, and experts based on their moods, skills, or the contents they liked. For tourists, the recommendation will be random recommendation. This page also shows the daily encourage sentence to engage and comfort users. The source js and scss scripts can be found in /src/pages/Individual Home and the classes and components js scripts can be found in /src/widgets.

### http://localhost:3000/MyPage
This page shows individual users’ profile, articles and jobs they like, other individual users or organization users they follow. Individual user can check all these contents by clicking check button or edit their personal profile by clicking edit button. This page also prompts users to input their daily mood and their mood will also be used for recommendations. The source js and scss scripts can be found in /src/pages/Mypage.

### http://localhost:3000/OthersPage
This page shows other individual users’ profile including target users’ personal details, target user’s preferred contents and following list. User will get to this page by clicking ‘check’ button for followed users in MyPage. The source js and scss scripts can be found in /src/pages/OtherPage.

### http://localhost:3000/FollowInd
This page shows all individual users followed by current individual user, user can check the info of followed users or unfollow them here. The source js and scss scripts can be found in /src/pages/FollowInd.

### http://localhost:3000/FollowOrg
This page shows all organization users followed by current individual user, user can check the info of followed users or unfollow them here. The source js and scss scripts can be found in /src/pages/FollowOrg.

### 'http://localhost:3000/JobPreference' 
This page shows the brief info of all jobs liked by current individual user, user can check the detailed info of jobs by clicking check button. The source js and scss scripts can be found in /src/pages/JobPreference.

### 'http://localhost:3000/ArticleList' 
This page shows the brief info of all articles liked by current individual user, user can check the detailed info of articles by clicking check button. The source js and scss scripts can be found in /src/pages/ArticleList.

### 'http://localhost:3000/ArticleDetails' 
This page shows the details of article, individual users can clicked like/unlike button to keep this articles in their liked list or remove it from the liked list. The source js and scss scripts can be found in /src/pages/ArticleDetails.

### 'http://localhost:3000/profile' 
This page prompts users who just signed up to input some basic information for recommendation. The source js and scss scripts can be found in /src/pages/Details_personal. 

### 'http://localhost:3000/editprofile' 
This page can be accessed by clicking ‘edit’ button in mypage. This page allows user to modify or update their personal detail, after clicking the update button, it redirects to mypage. The source js and scss scripts can be found in /src/pages/edit_profile_personal.

### 'http://localhost:3000/check' 
This page provides the details of job by passing the job id to url. This page can be accessed by clicking the job check button either on Individual_Home or Mypage. The source js and scss scripts can be found in /src/pages/Job_check.

## Pages for organization users

### 'http://localhost:3000/login_organizational'  'http://localhost:3000/signup_organizational' 
These two pages provide the basis for organizational users as they can only have access to organization_home when they are logged in. Cookie was implemented to store login status, userid and usertype (individual or organizational user). If you manually type this url it checks whether you have logged in or not, if not logged in, it works normally, otherwise it redirects you to profile page for individual users or to organization homepage for organization users. The source js and scss scripts can be found in /src/pages/Login_organizational and /src/pages/Signup_organizational.

### 'http://localhost:3000/profile_organizational' 
This page prompts organizational users who just signed up to input some basic information for company and some basic info will be implemented automatically when releasing jobs such as company name, location. The source js and scss scripts can be found in /src/pages/details_organizational.

### 'http://localhost:3000/editprofile_organizational' 
This page can be accessed by clicking ‘edit’ button in organization_home. This page allows organizational users to modify or update their company detail, after clicking the update button, it redirects to organization_home. The source js and scss scripts can be found in /src/pages/edit_profile_org.

### 'http://localhost:3000/Organization_Home' 
This page shows organization users all jobs they have released and allows them to modify jobs by clicking edit button on job brief info card or release new job by clicking ‘ADD’ button. This page also allows company users to edit company information by clicking edit button next to company info field. The source js and scss scripts can be found in /src/pages/Organization_Home and the classes and components js scripts can be found in /src/widgets.

### 'http://localhost:3000/release' 
This page allows company users to release new job. All textfileds must be filled with content to release the new job. It redirects to Organization_Home after releasing the job. The source js and scss scripts can be found in /src/pages/Job_Release.

### 'http://localhost:3000/editjob' 
This page reads the content of released job and allows users to edit and update job details. After updating the job, it redirects to Organization_Home. The source js and scss scripts can be found in /src/pages/job_modification.
