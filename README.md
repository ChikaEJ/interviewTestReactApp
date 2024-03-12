# interviewTestReactApp
This app was given to test my skills on how I can create react app.


### Introduction

This app simply demonstrate using GitHub api

### Usage

To upstart on your computer follow next steps: 
#### 1. Navigate to the folder or create it where you desire to clone this app. Use following command.

If you run Windows OS open [gitBash](https://gitforwindows.org/) app or if Mac OS Terminal and copy this command:

    git clone https://github.com/ChikaEJ/interviewTestReactApp.git

 #### 2. Then go into the interviewTestReactApp folder with command:

    cd interviewTestReactApp/

#### 3. To install all necessary dependencies for proxyServer copy next command:

    npm i --prefix proxyServer

#### 4. To install all necessary dependencies for react-client copy next command:

    npm i --prefix react-client

#### 5. To install all necessary dependencies for the main package.json copy next command:

    npm install

#### 6. To run the app type next command: 

    npm run start



### Defining a package



Packages for React client app:

```
"dependencies": {
    ...
    "antd": "^5.15.1",
    "buffer": "^6.0.3",
    "js-base64": "^3.7.7",
    "rc-virtual-list": "^3.11.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "reset-css": "^5.0.2",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4"
  },

```

Packages for Proxy Server: 

```
"dependencies": {
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "express": "^4.18.3",
    "js-base64": "^3.7.7",
    "node-fetch": "^3.3.2"
  }

```

To run Server and client next package has been using:

```
"devDependencies": {
    "concurrently": "^8.2.2"
  }
```

Script in the package.json: 

```
"scripts": {
    "start:server": "node proxyServer/server.js",
    "start:client": "npm start --prefix react-client",
    "start": "concurrently \"npm run start:server\" \"npm run start:client\""
  },
```

### Contact

Have a question? Ask on my mail or Telegram!

Email: ecd4gg@gmail.com
Telegram: @ChikaEJ

### Authors

+ [@ChikaEj](https://github.com/ChikaEJ)
