<p align="center">
<img src="https://raw.githubusercontent.com/pietrzakadrian/bank/master/.github/logo.png"
     title="Logo" width="200" height="auto">
</p>

Full Stack Web Application using **ReactJS+Redux** with **NodeJS (Express)**, **WebSocket**, **RESTful API** and **MySQL**

- An application created according to the best practices used in [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate)
- The correct configuration of NodeJS Cluster using **PM2** and **redis-server**
- Relational model use of the MySQL database via **Sequelize** ORM
- Support for many currencies with the current rate charged by the REST API
- Immediate change of Internationalize for **EN**, **DE** and **PL**

<p align="center">
  <img src="https://raw.githubusercontent.com/pietrzakadrian/bank/master/.github/dashboard.png" width="100%">
</p>

## Frontend

Technology stack:

1. **ReactJS** with **React-Router**
2. **Redux.js** with **Redux-Saga**
3. **WebSocket** (Socket.IO)
4. **Material UI** framework
5. **Styled Components** for global styles

<p align="center">
  <img src="https://raw.githubusercontent.com/pietrzakadrian/bank/master/.github/store.png"  width="738">
</p>

## Backend

Technology stack:

1. **NodeJS** with **Express.js** framework
2. **Sequelize** ORM
3. **MySQL** database
4. **RESTful API** with **Bearer token** authorization and **CSRF** Protection
5. **[Swagger](http://bank.pietrzakadrian.com/api-docs/)** Documentation

<p align="center">
  <img src="https://raw.githubusercontent.com/pietrzakadrian/bank/master/.github/mysql.png"  width="738">
</p>

## Installation

This guide on how to install Bank Application:

1. First, clone this repository to the folder on your machine:

   ```sh
   $ git clone https://github.com/pietrzakadrian/bank.git .
   ```

2. Create a special file `env.config.js` for storing sensitive data in the directory: `server/config`.

   ```
    const env = {
        database: 'bankapplication',
        username: 'root',
        password: 'root',
        host: 'localhost',
        dialect: 'mysql',
        SECRET_KEY: 'root',
        nodemailer: {
            username: 'mail-address@gmail.com',
            password: 'mail-password',
        },
        adminAccount: {
            login: 1234,
            password: '1234',
            name: 'Bank',
            surname: 'Application',
            email: 'mail-address@gmail.com',
            account_bill: 82143247368915159214987653,
            available_funds: 0,
            account_balance_history: '0,0',
            incoming_transfers_sum: 0,
            outgoing_transfers_sum: 0,
        },
    };

    module.exports = env;
   ```

3. Install the necessary packages

   ```
    npm install
   ```

4. Launch applications

   ```
   npm start
   ```

## TODO list

1. Write a Components and Unit tests using Enzyme/Jest
2. Remove .css files and rewrite all styles to styled-components
