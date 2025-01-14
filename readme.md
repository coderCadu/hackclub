![JavaScript Logo](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) ![NodeJS Logo](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Next Logo](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![React Logo](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Postgresql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

THAT`S A WIP Project

# Hackclub (Project based on Tabnews)

Developed for the curso.dev of Filipe Deschamps

## How to run this project

I have installed Node in version 18.20.4 and NPM in version 10.7.0.  
This project uses a Docker image of postgres:16.0-alpine3.18 and automates unit tests with Jest

Should you have installed nvm you should run the command below:

```bash
nvm install
```

Or manually install Node in the correct version(18.20.4)

After that. You should install your repository dependencies with the following:

```bash
npm install
```

---

When done, you should run the database and the server with the following commands:

```bash
npm run dev
```

This command ups a docker-compose container with the database and runs the migrations to build the struct of DB and finally the server.

For down the server press ctrl + c and run the command:

```bash
npm run compose:down
```

This command kills the container generated by the compose file

## How to run automated tests

If you wanna run the automated tests after all you can use the command:

```bash
npm test
```
