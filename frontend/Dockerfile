# Fetching the latest node image on apline linux
FROM node:alpine 

# Declaring env
ENV REACT_APP_CALENDLY_TOKEN eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjY1NDc0ODgyLCJqdGkiOiIzM2EyNDMwNC04OTI2LTRjMmYtYTk0MC0zNjRkNTdiMjkxOTkiLCJ1c2VyX3V1aWQiOiI5ZjU4MjNmYy1hZjExLTQ3MjUtOGViNC05NjA0NjJiM2Y4YWMifQ.eZqRW3RxIDA9zgqfW9nWs0dTiPgG0C1yvj0q-uGOtx3vlR2Q8-TRoJO1pO5BEDTgNlZOXQPG-e8h01_SxxBm6Q
ENV REACT_APP_CALENDLY_URL https://calendly.com/manshi-eveit
ENV MONGODB_URI mongodb+srv://affan:AffanEveit@cluster0.ovk4xmv.mongodb.net/test
ENV REACT_APP_API_URL http://carenestapi-env.eba-hgarqxir.ap-northeast-1.elasticbeanstalk.com
# Create app directory
WORKDIR /usr/src/app

# Installing dependencies
COPY package.json .

RUN npm install

# Copying all the files in our project
COPY . .

EXPOSE 3000

# Starting our application
CMD [ "npm", "start" ]