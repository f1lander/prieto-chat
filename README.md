# Prieto Chat

A chat example project in NodeJS developed for a jobsity code challenge

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
node-js v11~
MongoDB
yarn 1.16.0
npm 6.10.2
```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Clone this repo
RENAME the .env.example to .env
```
## Backend

for dev
```
cd backend
yarn install
npm run dev
```

for debugging
```
npm run debug
Go to VS Code Debug and run the Typescrupt Server configurarion
```

This will be hosted in the PORT that is defined in the .env, default is 8080

## Fronted

```
cd client
yarn install
yarn start
```

This will be hosted in the PORT that is defined in the .env, default is 3000

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

```
npm run test
```

Test are only for the `stooq-bot.ts` class

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```
## Built With

* [NodeJS](https://nodejs.org) - The JS web framework backend used
* [ReactJS](https://reactjs.org/) - The JS web library front-end used

## Versioning

We use [Git](http://git.org/) for versioning. For the versions available

## Author

***Edax Uclés** - *Initial work* - [f1lander](https://github.com/f1lander)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
