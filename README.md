<div align="center">

<a href="https://bank.pietrzakadrian.com">
    <img src="https://bank.pietrzakadrian.com/media/logo.png" align="center" height="auto" />
</a>

[**Live Preview**](https://bank.pietrzakadrian.com) | [**Swagger Documentation**](https://bank.pietrzakadrian.com/api-docs/) | [**Contact the developer**](mailto:contact@pietrzakadrian.com)

</div>

Full Stack Web Application using **ReactJS+Redux** with **NodeJS (Express+TypeORM)**, **WebSocket**, **RESTful API** and **MySQL**

- An application created according to the best practices used in [**react-boilerplate**](https://github.com/react-boilerplate/react-boilerplate)
- Relational model use of the **MySQL** database via **TypeORM**
- Support for **many currencies** with the current rate charged by the **REST API**
- Instant language change for **English**, **Polish** and **German** by using [**react-intl**](https://github.com/formatjs/react-intl)
- **Notification**+**Payment system** in real time by using **WebSocket** ([**socket.io**](https://github.com/socketio/socket.io))
- **Unit** & **Component Testing** using **Jest**, **Mocha**, **Chai** and [**react-testing-library**](https://github.com/testing-library/react-testing-library)

<p align="center">
  <img src="https://bank.pietrzakadrian.com/media/dash.png" width="100%" height="auto">
</p>

## Frontend

Technology stack:

1. **JavaScript** (ES6+)
2. **ReactJS** with **React-Router**
3. **Redux.js** with **Redux-Saga** & **Redux-Persist**
4. **Material UI** framework
5. **styled-components**
6. **Unit** & **Component Testing** using **Jest** and [**react-testing-library**](https://github.com/testing-library/react-testing-library)

<p align="center">
  <img src="https://bank.pietrzakadrian.com/media/redux.png" width="80%" height="auto">
</p>

## Backend

Technology stack:

1. **TypeScript**
2. **NodeJS** with **Express.js** framework
3. **TypeORM**
4. **MySQL** database
5. **RESTful API** with **Basic** & **JWT Authentication**
6. **[Swagger](http://bank.pietrzakadrian.com/api-docs/)** Documentation
7. **Unit Testing** using **Mocha** and **Chai**

<p align="center">
  <img src="https://bank.pietrzakadrian.com/media/model.png" width="100%" height="auto">
</p>

## Requirements

- **NodeJS** v8+
- **npm** v6+
- **MySQL** v5.6+

## Installation

for **Frontend**:

1. Clone this repository and enter the `frontend` directory
2. Change `BASE_URL` in `/app/utils/api.js` if you want to use localhost (defaults set is a official server)
3. Install the dependencies by running `npm install`
4. Start the project by running `npm start`

for **Backend**:

1. Clone this repository and enter the `backend` directory
2. Create 2 MySQL databases. (One for testing & other as main database)
3. Copy the `env.example` and create a new `.env` file from it.
4. Set the configuration parameters there (App port, app host, database host, port, username, password etc)
5. Install the dependencies by running `npm install`
6. Start the project by running `npm start`

## License

This project is licensed under the MIT license. Copyright (c) 2019 Adrian Pietrzak.
