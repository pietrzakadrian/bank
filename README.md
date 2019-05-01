# Bank Application v1.0.0

<p align="center">
<img src="https://raw.githubusercontent.com/pietrzakadrian/bank/master/.github/logo.png"
     title="Size Limit logo by Anton Lovchikov" width="200" height="auto">
</p>

Full Stack Web Application using **ReactJS+Redux** with **NodeJS (Express)**, **WebSocket**, **RESTful API** and **MySQL**

- An application created according to the best practices used in [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate),
- Proper use of NodeJS Cluster using **PM2** and **redis-server**
- Relational model use of the MySQL database via **Sequelize** ORM
- Multi-currency service with the current rate charged from REST API
- Internationalize React App for **EN**, **DE**, **PL** using **react-intl** library

<p align="center">
  <img src="https://raw.githubusercontent.com/pietrzakadrian/bank/master/.github/dashboard.png" alt="Size Limit CLI" width="738">
</p>

## Frontend

Tech Stack:

1. **ReactJS** with **React-Router**
2. **Redux.js** with **Redux-Saga**
3. **Styled Components** for global-styles

<p align="center">
  <img src="https://raw.githubusercontent.com/pietrzakadrian/bank/master/.github/store.png" alt="Size Limit CLI" width="738">
</p>

## Backend

Tech Stack:

1. **NodeJS** with **Express.js** framework
2. **Sequelize** ORM
3. **MySQL** database
4. **RESTful API** with **Bearer token** authorization

<p align="center">
  <img src="https://raw.githubusercontent.com/pietrzakadrian/bank/master/.github/mysql.png" alt="Size Limit CLI" width="738">
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
        database: 'bankapplication', // db name
        username: 'root', // db user
        password: 'root', // db password
        host: 'localhost', // db host
        dialect: 'mysql',
        api_url: 'http://localhost:3000/api',
        pool: {
            max: 15,
            min: 5,
            idle: 20000,
            evict: 15000,
            acquire: 30000,
        },
        SECRET_KEY: 'root', // bearer token key
        nodemailer: {
            username: 'mail-address@gmail.com',
            password: 'mail-password',
            host: 'smtp.gmail.com',
            post: 587,
            email: 'mail-address@gmail.com',
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

3. The application supports NodeJS Cluster by default. To start threads correctly, you must use [redis-server](https://redis.io/topics/quickstart).

   ```
    wget http://download.redis.io/redis-stable.tar.gz
    tar xvzf redis-stable.tar.gz
    cd redis-stable
    make
   ```

4. Install the necessary packages

   ```
    npm install && npm install -g pm2
   ```

5. Launch applications

   ```
   pm2 start server/
   ```

## TODO list

1. Write a test using Enzyme/Jest
