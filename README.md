# Project-web

## Steps to start the  project 

### first of all run the command  : npm i 
### 1-  make sure you are starting mysql  using xaamp , go to .env and  put ur database username and password 

### 2- run prisma migration with this command 

#### npx prisma migrate dev  --name migrationName 

### 3- we need to populate the database using the seed file located in seeds folder :

#### node seeds/seed.js   

### 4- now  to launch the  backend server use (normally the server going to start at port 3000 )

#### npm start 


## to see the source code of the frontend and  launch the development server : 

### 6- you will find a  frontend folder , the frontend is made using vue js , excute this command

#### cd blog

#### install packages

#### npm i  

####  if you don't have vue cli , just excute this commands

#### npm i vue-cli 

### then  start frontend in development server  

#### vue serve 
