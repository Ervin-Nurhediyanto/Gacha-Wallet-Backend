# Gache-Wallet-BackEnd

Application to CRUD database with node js, Express, and MySql.
This application use JWT to authentication and authorization,
and socket.io to real-time chat.

## Table of Contents

- [Gache-Wallet-BackEnd](#gache-wallet-backend)
  - [Table of Contents](#table-of-contents)
  - [Built With](#built-with)
  - [Requirements](#requirements)
  - [Setup](#setup)
  - [Setup .env example](#setup-env-example)
  - [Run the app](#run-the-app)
  - [REST API](#rest-api)
  
## Built With
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)

## Requirements
* [Node.js](https://nodejs.org/en/)
* [Postman](https://www.getpostman.com/) for testing
* [Database](database-example.sql)
	
## Setup
To run this project, install it locally using npm:

```
$ npm install
```

## Setup .env example

Create .env file in your root project folder.

```env
DB_HOST = localhost
DB_USER = root
DB_PASSWORD = your_password
DB_DATABASE = your_database
PORT = 4000
BASE_URL = http://localhost:4000/
SECRET_KEY = your-secret
```
## Run the app

Development mode

```bash
$ npm run dev
```

Deploy mode

```bash
$ npm start
```

## REST API

You can view my Postman collection [here](https://web.postman.co/collections/11550213-00688915-5173-4f96-a840-505dd275e8bb?version=latest&workspace=cc285d8c-f27d-4761-8b8b-c86eda82d08f)
or </br>

[![run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/11550213/TVKFzFhc)
